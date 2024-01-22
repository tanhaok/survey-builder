package com.myapp.surveybuilderapi.viewmodel;

public record Res<T>(int code, String message, T data) {

    public Res(int code, T data) {
        this(code, (code / 100) == 2 ? "Success" : "Failed", data);
    }

}
