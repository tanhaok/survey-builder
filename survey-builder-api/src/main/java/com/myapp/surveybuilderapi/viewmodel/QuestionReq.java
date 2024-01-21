package com.myapp.surveybuilderapi.viewmodel;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Objects;

public record QuestionReq<T, K>(String question, String description, boolean isRequire,
                                @Min(0) @Max(9) int type, Object answerChoice) {

}
