package com.myapp.surveybuilderapi.controller;

import com.myapp.surveybuilderapi.viewmodel.Res;
import jakarta.validation.constraints.NotBlank;
import java.util.LinkedHashMap;
import java.util.List;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/surveys")
public class SurveyBuilderApiController {

    @GetMapping("/{surveyId}")
    public ResponseEntity<Res<List<?>>> getSurvey(@PathVariable String surveyId) {
        return null;
    }

    @GetMapping("/all")
    public ResponseEntity<Res<?>> getAllSurvey() {
        return null;
    }

    @GetMapping("/result/{surveyId}")
    public ResponseEntity<Res<?>> getSurveyResult(@PathVariable String surveyId) {
        return null;
    }

    @PostMapping()
    public <T, K> ResponseEntity<Res<String>> createSurvey(@RequestBody LinkedHashMap<T, K> req) {
        return null;
    }

    @PostMapping("/submit/{surveyId}")
    public <T, K> ResponseEntity<Res<String>> submitSurvey(@RequestBody LinkedHashMap<T, K> req,
        @PathVariable String surveyId) {
        return null;
    }

    @PutMapping("/edit/{surveyId}")
    public <T, K> ResponseEntity<Res<?>> editSurvey(@NotBlank @PathVariable String surveyId,
        @RequestBody LinkedHashMap<T, K> req) {
        return null;
    }

    @PatchMapping("/stop/{surveyId}")
    public ResponseEntity<Res<?>> stopSurvey(@NotBlank @PathVariable String surveyId) {
        return null;
    }

}
