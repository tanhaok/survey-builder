package com.myapp.surveybuilderapi.viewmodel;

public record SurveyVm(String id, String name, String description, String startDate, String endDate,
                       Integer remainingDate, Integer count, String isAllowAnonymous) {

}
