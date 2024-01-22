package com.myapp.surveybuilderapi.viewmodel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;

public record QuestionReq(String question, String description, boolean isRequire,
                          @Min(0) @Max(9) int type, Object answerChoice) {

}
