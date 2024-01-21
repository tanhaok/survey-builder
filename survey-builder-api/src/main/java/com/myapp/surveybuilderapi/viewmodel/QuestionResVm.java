package com.myapp.surveybuilderapi.viewmodel;

import com.myapp.surveybuilderapi.entity.Question;
import com.nimbusds.jose.shaded.gson.Gson;
import java.util.LinkedHashMap;

public record QuestionResVm<T, K> (String id, String question, String description, boolean isRequire,
                            int type, LinkedHashMap<T, K> answerChoice) {

    public static QuestionResVm fromModel(Question question) {
        Gson gson = new Gson();
        return new QuestionResVm<>(question.getId(), question.getContent(), question.getDescription(), question.isRequire(),
            question.getType().ordinal(), gson.fromJson(question.getAnswerChoice(), LinkedHashMap.class));
    }

}
