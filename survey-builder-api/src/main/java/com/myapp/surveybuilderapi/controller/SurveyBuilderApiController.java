package com.myapp.surveybuilderapi.controller;

import com.myapp.surveybuilderapi.service.SurveyService;
import com.myapp.surveybuilderapi.viewmodel.Res;
import com.myapp.surveybuilderapi.viewmodel.SubmitAnswerVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyCreatedVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyResultDetailVm;
import com.myapp.surveybuilderapi.viewmodel.SurveyVm;
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

    private final SurveyService surveyService;

    public SurveyBuilderApiController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }

    @GetMapping("/{surveyId}")
    public ResponseEntity<Res<SurveyResVm>> getSurvey(@PathVariable String surveyId) {
        var res = this.surveyService.getSurvey(surveyId);
        return ResponseEntity.ok(res);
    }

    @GetMapping("/all")
    public ResponseEntity<Res<List<SurveyVm>>> getAllSurvey() {
        var res = this.surveyService.getAllSurvey();
        return ResponseEntity.ok(res);
    }

    @GetMapping("/result/{surveyId}")
    public ResponseEntity<Res<SurveyResultDetailVm>> getSurveyResult(
        @PathVariable String surveyId) {
        var res = this.surveyService.getSurveyResult(surveyId);
        return ResponseEntity.ok(res);
    }

    @PostMapping()
    public ResponseEntity<Res<String>> createSurvey(@RequestBody SurveyCreatedVm req) {
        var res = this.surveyService.createNewSurvey(req);
        return ResponseEntity.ok(res);
    }

    @PostMapping("/submit/{surveyId}")
    public ResponseEntity<Res<String>> submitSurvey(@RequestBody SubmitAnswerVm ans,
        @PathVariable String surveyId) {
        var res = this.surveyService.submitSurvey(surveyId, ans);
        return ResponseEntity.ok(res);
    }

    @PutMapping("/edit/{surveyId}")
    public <T, K> ResponseEntity<Res<?>> editSurvey(@NotBlank @PathVariable String surveyId,
        @RequestBody LinkedHashMap<T, K> req) {
        return null;
    }

    @PatchMapping("/stop/{surveyId}")
    public ResponseEntity<Res<Object>> stopSurvey(@PathVariable String surveyId) {
        Res<Object> res = this.surveyService.stopSurvey(surveyId);
        return ResponseEntity.ok(res);
    }

}
