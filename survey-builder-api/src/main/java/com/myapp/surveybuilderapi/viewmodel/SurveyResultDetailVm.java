package com.myapp.surveybuilderapi.viewmodel;

import java.util.List;

public record SurveyResultDetailVm(List<String> questions, List<List<Object>> answers,
                                   String surveyName) {

}
