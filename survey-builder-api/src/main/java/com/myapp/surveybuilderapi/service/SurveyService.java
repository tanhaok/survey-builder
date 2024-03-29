package com.myapp.surveybuilderapi.service;

import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SubmitAnswerVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyCreatedVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResultDetailVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;
import java.util.List;

public interface SurveyService {

    Res<String> createNewSurvey(SurveyCreatedVm data);

    Res<SurveyResVm> getSurvey(String surveyId);

    Res<List<SurveyVm>> getAllSurvey();

    Res<Object> stopSurvey(String id);

    Res<String> submitSurvey(String surveyId, SubmitAnswerVm ans);

    Res<SurveyResultDetailVm> getSurveyResult(String surveyId);
}
