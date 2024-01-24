package com.myapp.surveybuilderapi.repository;

import com.myapp.surveybuilderapi.entity.Answer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AnswerRepository extends JpaRepository<Answer, String> {

}
