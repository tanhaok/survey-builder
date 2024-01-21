package com.myapp.surveybuilderapi.service;

import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;

public interface SurveyService {
    <T, K> Res<String> createNewSurvey(SurveyVm<T, K> data);

    Res<SurveyResVm> getSurvey(String surveyId);
}
