package com.myapp.surveybuilderapi.service.impl;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.google.gson.JsonObject;
import com.myapp.surveybuilderapi.constant.QuestionType;
import com.myapp.surveybuilderapi.entity.Answer;
import com.myapp.surveybuilderapi.entity.Question;
import com.myapp.surveybuilderapi.entity.Survey;
import com.myapp.surveybuilderapi.exception.NotFoundException;
import com.myapp.surveybuilderapi.repository.AnswerRepository;
import com.myapp.surveybuilderapi.repository.QuestionRepository;
import com.myapp.surveybuilderapi.repository.SurveyRepository;
import com.myapp.surveybuilderapi.service.SurveyService;
import com.myapp.surveybuilderapi.viewmodel.QuestionReq;
import com.myapp.surveybuilderapi.viewmodel.QuestionResVm;
import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SubmitAnswerVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyCreatedVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResultDetailVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;
import java.util.Map.Entry;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

@Service
public class SurveyServiceImpl implements SurveyService {

    private static final Logger LOG = LoggerFactory.getLogger(SurveyServiceImpl.class);
    private final SurveyRepository surveyRepository;
    private final QuestionRepository questionRepository;
    private final AnswerRepository answerRepository;

    @Autowired
    public SurveyServiceImpl(SurveyRepository surveyRepository,
        QuestionRepository questionRepository, AnswerRepository answerRepository) {
        this.surveyRepository = surveyRepository;
        this.questionRepository = questionRepository;
        this.answerRepository = answerRepository;
    }

    protected Instant convertDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE, d MMM yyyy HH:mm:ss z");
        LocalDate dateTime = LocalDate.parse(date, formatter);
        return dateTime.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    private Survey getSurveyById(String surveyId) {
        return this.surveyRepository.findById(surveyId)
            .orElseThrow(() -> new NotFoundException("Survey %s not found.".formatted(surveyId)));
    }

    @Override
    public Res<String> createNewSurvey(SurveyCreatedVm data) {
        LOG.info(
            "Receive request to create new survey: %s. Start creating...".formatted(data.name()));

        Survey survey = Survey.builder().isAllowAnonymous(true).description(data.description())
            .name(data.name()).organization("").isSpecificUser(false).isDel(false).count(0)
            .startDate(convertDate(data.startDate())).endDate(convertDate(data.endDate())).build();

        survey = this.surveyRepository.save(survey);
        Gson gson = new Gson();
        for (QuestionReq questionReq : data.questions()) {
            String jsonData = gson.toJson(questionReq.answerChoice());
            Question question = Question.builder().survey(survey).answerChoice(jsonData)
                .content(questionReq.question()).description(questionReq.description())
                .isRequire(questionReq.isRequire()).type(QuestionType.values()[questionReq.type()])
                .build();

            question = questionRepository.save(question);

            LOG.debug("Create new question: " + question.getId());
        }

        LOG.info("Create new survey {} done", data.name());

        return new Res<>(HttpStatus.CREATED.value(), "Create new survey success", null);
    }

    @Override
    public Res<SurveyResVm> getSurvey(String surveyId) {
        // TODO: need to check expire time.
        Survey survey = getSurveyById(surveyId);

        if (survey.isDel()) {
            new Res<>(HttpStatus.OK.value(), "This survey is deleted!", null);
        }

        Set<QuestionResVm> questions = survey.getQuestions().stream().map(QuestionResVm::fromModel)
            .collect(Collectors.toSet());

        Long endDateSecond = survey.getEndDate().getEpochSecond();
        Long startDateSecond = survey.getStartDate().getEpochSecond();
        Integer remainingDate = (int) (endDateSecond - startDateSecond) / (60 * 60 * 24);

        SurveyResVm resVm = new SurveyResVm(survey.getId(), survey.getName(),
            survey.getDescription(), survey.getEndDate().toString(),
            survey.getStartDate().toString(), survey.getAnswers().size(), remainingDate, questions);

        return new Res<>(HttpStatus.OK.value(), resVm);
    }

    @Override
    public Res<List<SurveyVm>> getAllSurvey() {
        List<Survey> surveys = this.surveyRepository.findAllByIsDel(false);

        List<SurveyVm> surveyVms = surveys.stream().map(survey -> {
            Integer count = survey.getCount();
            Integer remainingDate =
                (int) (survey.getEndDate().getEpochSecond() - Instant.now().getEpochSecond()) / (60
                    * 60 * 24);
            DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd, MMM yyyy")
                .withZone(ZoneId.of("UTC"));

            remainingDate = remainingDate <= 0 ? 0 : remainingDate;
            String isAllow = survey.isAllowAnonymous() ? "YES" : "NO";

            return new SurveyVm(survey.getId(), survey.getName(), survey.getDescription(),
                dateTimeFormatter.format(survey.getStartDate()),
                dateTimeFormatter.format(survey.getEndDate()), remainingDate, count, isAllow);
        }).toList();
        return new Res<>(HttpStatus.OK.value(), surveyVms);
    }

    @Override
    public Res<Object> stopSurvey(String id) {
        Survey survey = getSurveyById(id);
        survey.setDel(true);
        this.surveyRepository.save(survey);

        return new Res<>(HttpStatus.OK.value(), null);
    }

    @Override
    public Res<String> submitSurvey(String surveyId, SubmitAnswerVm answer) {
        LOG.info("Receive request submit form for survey id: {}", surveyId);
        Survey survey = getSurveyById(surveyId);

        Gson gson = new Gson();

        List<Answer> answerList = new ArrayList<>();
        UUID hash = UUID.randomUUID();

        survey.getQuestions().forEach(question -> {
            for (var ans : answer.answers()) {
                if (ans.qId().equals(question.getId())) {
                    var ansData = gson.toJson(ans.answer());
                    Answer newAnswer = Answer.builder().survey(survey).question(question)
                        .hash(hash.toString())
                        .answer(ansData).build();

                    answerList.add(newAnswer);
                }
            }
        });

        this.answerRepository.saveAll(answerList);

        int count = survey.getCount() + 1;
        survey.setCount(count);
        this.surveyRepository.save(survey);

        LOG.info("Submit form done!");
        return new Res<>(HttpStatus.CREATED.value(), null);
    }

    private int sortedQuestion(Question q1, Question q2) {
        int num1 = q1.getContent().charAt(9);
        int num2 = q2.getContent().charAt(9);
        return Integer.compare(num1, num2);
    }

    @Override
    public Res<SurveyResultDetailVm> getSurveyResult(String surveyId) {
        final Gson gson = new Gson();
        Survey survey = this.getSurveyById(surveyId);
        List<Answer> answers = this.answerRepository.getAnswerBySurvey(survey);

        Set<String> hashs = answers.stream().map(Answer::getHash).collect(Collectors.toSet());
        List<Question> sortedQuestion = survey.getQuestions().stream().sorted(this::sortedQuestion)
            .toList();

        int numberQuestions = sortedQuestion.size();
        List<List<Object>> resultData = new ArrayList<>();

        for (String hash : hashs) {
            List<Answer> ansWithSameHash = answers.stream().filter(a -> a.getHash().equals(hash))
                .toList();
            List<Object> record = new ArrayList<>();
            for (int i = 0; i < numberQuestions; i++) {
                Question currentQ = sortedQuestion.get(i);
                Answer childAns = ansWithSameHash.stream()
                    .filter(a -> a.getQuestion().getId().equals(currentQ.getId())).toList()
                    .getFirst();

                if (currentQ.getType().equals(QuestionType.MULTIPLE_CHOICE_GRID)
                    || currentQ.getType().equals(QuestionType.CHECKBOX_GRID)) {
                    JsonObject object = gson.fromJson(childAns.getAnswer(), JsonObject.class);

                    Set<Entry<String, JsonElement>> entries = object.entrySet();
                    for (var entry : entries) {
                        record.add(entry.getValue().getAsString());
                    }
                } else {
                    record.add(gson.fromJson(childAns.getAnswer(), Object.class));
                }

            }

            resultData.add(record);
        }

        List<String> questions = new ArrayList<>(numberQuestions);
        for (int i = 0; i < numberQuestions; i++) {
            int finalI = i;
            Question question = survey.getQuestions().stream().filter(q -> q.getId().equals(
                sortedQuestion.get(finalI).getId())).toList().getFirst();

            if (question.getType().equals(QuestionType.MULTIPLE_CHOICE_GRID) || question.getType()
                .equals(QuestionType.CHECKBOX_GRID)) {
                JsonObject object = gson.fromJson(question.getAnswerChoice(), JsonObject.class);
                JsonArray jsonArray = object.getAsJsonArray("rows");

                for (var entry : jsonArray) {
                    questions.add(
                        String.format("%s [ %s ]", question.getContent(), entry.getAsString()));
                }
            } else {
                questions.add(question.getContent());
            }

        }

        SurveyResultDetailVm surveyResultDetailVm = new SurveyResultDetailVm(questions, resultData,
            survey.getName());

        return new Res<>(HttpStatus.OK.value(), surveyResultDetailVm);
    }
}
