package com.myapp.surveybuilderapi.service.impl;

import com.google.gson.Gson;
import com.myapp.surveybuilderapi.constant.QuestionType;
import com.myapp.surveybuilderapi.entity.Question;
import com.myapp.surveybuilderapi.entity.Survey;
import com.myapp.surveybuilderapi.exception.NotFoundException;
import com.myapp.surveybuilderapi.repository.QuestionRepository;
import com.myapp.surveybuilderapi.repository.SurveyRepository;
import com.myapp.surveybuilderapi.service.SurveyService;
import com.myapp.surveybuilderapi.viewmodel.QuestionReq;
import com.myapp.surveybuilderapi.viewmodel.QuestionResVm;
import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SurveyCreatedVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Set;
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

    @Autowired
    public SurveyServiceImpl(SurveyRepository surveyRepository,
        QuestionRepository questionRepository) {
        this.surveyRepository = surveyRepository;
        this.questionRepository = questionRepository;
    }

    protected Instant convertDate(String date) {
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("EEE, d MMM yyyy HH:mm:ss z");
        LocalDate dateTime = LocalDate.parse(date, formatter);
        return dateTime.atStartOfDay(ZoneId.systemDefault()).toInstant();
    }

    @Override
    public Res<String> createNewSurvey(SurveyCreatedVm data) {
        LOG.info(
            "Receive request to create new survey: %s. Start creating...".formatted(data.name()));

        Survey survey = Survey.builder().isAllowAnonymous(true).description(data.description())
            .name(data.name()).organization("").isSpecificUser(false).isDel(false)
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

        LOG.info("Create new survey %s done".formatted(data.name()));

        return new Res<>(HttpStatus.CREATED.value(), "Create new survey success", null);
    }

    @Override
    public Res<SurveyResVm> getSurvey(String surveyId) {
        // TODO: need to check expire time.
        Survey survey = this.surveyRepository.findById(surveyId)
            .orElseThrow(() -> new NotFoundException("Survey %s not found."));

        if (survey.isDel()){
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
            Integer count = survey.getAnswers().size();
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
        Survey survey = this.surveyRepository.findById(id)
            .orElseThrow(() -> new NotFoundException("Survey %s not found."));
        survey.setDel(true);
        this.surveyRepository.save(survey);

        return new Res<>(HttpStatus.OK.value(), null);
    }
}
