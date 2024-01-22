package com.myapp.surveybuilderapi.entity;

import com.myapp.surveybuilderapi.constant.QuestionType;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@Entity
@AllArgsConstructor
@NoArgsConstructor
@Table(name = "questions")
public class Question extends AbstractAuditEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private String id;
    private boolean isRequire;
    private QuestionType type;
    private String content;
    private String description;
    private String answerChoice;

    @OneToMany(mappedBy = "question", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Answer> answers;

    @ManyToOne
    @JoinColumn(name = "survey_id", referencedColumnName = "id")
    private Survey survey;

}
