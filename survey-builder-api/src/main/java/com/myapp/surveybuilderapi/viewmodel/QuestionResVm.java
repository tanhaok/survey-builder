package com.myapp.surveybuilderapi.viewmodel;

import com.myapp.surveybuilderapi.entity.Question;
import com.nimbusds.jose.shaded.gson.Gson;

public record QuestionResVm(String id, String question, String description, boolean isRequire,
                            int type, Object answerChoice) {

    public static QuestionResVm fromModel(Question question) {
        Gson gson = new Gson();
        return new QuestionResVm(question.getId(), question.getContent(), question.getDescription(),
            question.isRequire(), question.getType().ordinal(),
            gson.fromJson(question.getAnswerChoice(), Object.class));
    }

}
