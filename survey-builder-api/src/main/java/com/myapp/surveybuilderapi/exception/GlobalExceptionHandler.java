package com.myapp.surveybuilderapi.exception;

import com.myapp.surveybuilderapi.viewmodel.Res;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;

@RestControllerAdvice
public class GlobalExceptionHandler {

    private static final Logger LOGGER = LoggerFactory.getLogger(GlobalExceptionHandler.class);

    @ExceptionHandler({NotFoundException.class})
    public ResponseEntity<Res<Object>> notFoundExceptionHandler(NotFoundException e,
        WebRequest webRequest) {
        String errMsg = e.getMessage();
        LOGGER.error(errMsg);
        Res<Object> res = new Res<>(HttpStatus.NOT_FOUND.value(), errMsg, null);
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(res);
    }

    @ExceptionHandler({BadRequestException.class})
    public ResponseEntity<Res<Object>> badRequestExceptionHandler(NotFoundException e,
        WebRequest webRequest) {
        String errMsg = e.getMessage();
        LOGGER.error(errMsg);
        Res<Object> res = new Res<>(HttpStatus.BAD_REQUEST.value(), errMsg, null);
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(res);
    }
}
