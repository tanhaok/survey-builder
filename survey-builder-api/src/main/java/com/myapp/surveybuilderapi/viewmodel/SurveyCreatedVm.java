package com.myapp.surveybuilderapi.viewmodel;

import java.util.List;

public record SurveyCreatedVm(String name, String description, String endDate, String startDate,
                              List<QuestionReq> questions, boolean isRequire) {

}
