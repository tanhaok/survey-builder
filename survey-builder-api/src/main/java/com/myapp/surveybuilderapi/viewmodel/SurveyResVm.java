package com.myapp.surveybuilderapi.viewmodel;

import java.util.Set;

public record SurveyResVm(String id, String name, String description, String endDate,
                          String startDate, Integer count, Integer remainingDate,
                          Set<QuestionResVm> questions) {

}
