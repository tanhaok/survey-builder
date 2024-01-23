"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import styles from "./page.module.css";
import { SurveyData } from "@/types/Survey";
import { Button, Typography } from "@mui/material";
import AnswerBuilder from "@/components/AnswerBuilder";
import { Answer } from "@/types/Answer";

const SubmitSurvey = () => {
  const router = useSearchParams();
  const [data, setData] = useState<SurveyData>();
  const [answers, setAnswers] = useState<Answer[]>([]);

  useEffect(() => {
    const surveyId = router.get("id");
    if (surveyId) {
      axios
        .get(`http://localhost:8081/api/surveys/${surveyId}`)
        .then((res) => res.data.data)
        .then((data) => {
          console.log(data);
          setData(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [router]);

  if (!data) {
    return (
      <div className={styles.forms}>
        <div className={styles.forms_inner}>Welcome</div>
      </div>
    );
  }
  return (
    <div className={styles.forms}>
      <div className={styles.forms_inner}>
        <div className={styles.form_question}>
          <Typography variant="h5" color="secondary">
            {data.name}
          </Typography>
          <Typography variant="subtitle1" display="inline">
            {data.description}
          </Typography>
        </div>

        {(data.questions || []).map((q) => (
          <AnswerBuilder
            key={q.id}
            question={q}
            answer={answers}
            onSubmit={null}
            onUpdateAnswer={null}
            styleClass={styles.form_question}
          />
        ))}

        <div className={styles.form_question_btn}>
          <Button variant="contained" color="secondary">
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SubmitSurvey;
