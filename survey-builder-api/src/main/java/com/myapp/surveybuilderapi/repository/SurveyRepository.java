package com.myapp.surveybuilderapi.repository;

import com.myapp.surveybuilderapi.entity.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, String> {

}
