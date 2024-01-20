package com.myapp.surveybuilderapi.exception;

public class NotFoundException extends RuntimeException {

    public NotFoundException() {
        super();
    }


    public NotFoundException(String msg) {
        super(msg);
    }

}
