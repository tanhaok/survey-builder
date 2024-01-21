package com.myapp.surveybuilderapi.service.impl;

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
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;
import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.time.format.DateTimeFormatter;
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
    public <T, K> Res<String> createNewSurvey(SurveyVm<T, K> data) {
        LOG.info(
            "Receive request to create new survey: %s. Start creating...".formatted(data.name()));

        Survey survey = Survey.builder().isAllowAnonymous(true).description(data.description())
            .name(data.name()).organization("").isSpecificUser(false)
            .startDate(convertDate(data.startDate())).endDate(convertDate(data.endDate())).build();

        survey = this.surveyRepository.save(survey);

        for (QuestionReq questionReq : data.questions()) {
            Question question = Question.builder().survey(survey)
                .answerChoice(questionReq.answerChoice().toString()).content(questionReq.question())
                .description(questionReq.description())
                .type(QuestionType.values()[questionReq.type()]).build();

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

        Set<QuestionResVm> questions = survey.getQuestions().stream().map(QuestionResVm::fromModel)
            .collect(Collectors.toSet());

        Long endDateSecond = survey.getEndDate().getEpochSecond();
        Long startDateSecond = survey.getStartDate().getEpochSecond();
        Integer remainingDate = (int) (endDateSecond -startDateSecond) / ( 60 * 60 * 24);

        SurveyResVm resVm = new SurveyResVm(survey.getId(), survey.getName(),
            survey.getDescription(), survey.getEndDate().toString(),
            survey.getStartDate().toString(), survey.getAnswers().size(), remainingDate, questions);

        return new Res<>(HttpStatus.OK.value(), "Success", resVm);
    }
}
