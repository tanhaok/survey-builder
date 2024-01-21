package com.myapp.surveybuilderapi.viewmodel;

import java.util.List;

public record SurveyVm<T, K>(String name, String description, String endDate, String startDate, List<QuestionReq> questions) {

}
