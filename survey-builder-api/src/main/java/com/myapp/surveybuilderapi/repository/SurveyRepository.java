package com.myapp.surveybuilderapi.repository;

import com.myapp.surveybuilderapi.entity.Survey;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SurveyRepository extends JpaRepository<Survey, String> {

    List<Survey> findAllByIsDel(boolean isDel);
}
