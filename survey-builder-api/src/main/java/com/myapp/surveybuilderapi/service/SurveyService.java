package com.myapp.surveybuilderapi.service;

import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;

public interface SurveyService {

    Res<String> createNewSurvey(SurveyVm data);

    Res<SurveyResVm> getSurvey(String surveyId);
}
