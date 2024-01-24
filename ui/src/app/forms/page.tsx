"use client";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState } from "react";
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

  useEffect(() => {
    if (data) {
      const questions = [...data.questions];
      const anws: Answer[] = [];

      const defaultAnswer = ["", "", [], "", "", -1, "", {}, {}];
      questions.forEach((q) => {
        anws.push({
          qId: q.id,
          isRequire: q.isRequire,
          answer: defaultAnswer[q.type],
        });
      });

      setAnswers([...anws]);
    }
  }, [data]);

  const onSubmitHandler = () => {
    console.log("submitted");
    console.log(answers);
    const filterCheck = answers.filter(
      (ele) => ele.isRequire && ele.answer == undefined
    );

    if (filterCheck.length > 0) {
      console.log("con field chua co data");
    }
  };

  const onUpdateAnswerHandler = (idx: number, newAnswer: any) => {
    const tempArr = [...answers];
    tempArr[idx].answer = newAnswer;
    setAnswers([...tempArr]);
  };

  if (!data) {
    return (
      <div className={styles.forms}>
        <div className={styles.forms_inner}>Welcome</div>
      </div>
    );
  }
  return (
    <Suspense fallback={<p>Loading...</p>}>
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

          {(data.questions || []).map((q, index) => (
            <AnswerBuilder
              idx={index}
              key={q.id}
              question={q}
              answer={answers}
              onUpdateAnswer={onUpdateAnswerHandler}
              styleClass={styles.form_question}
            />
          ))}

          <div className={styles.form_question_btn}>
            <Button
              variant="contained"
              color="secondary"
              onClick={onSubmitHandler}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </Suspense>
  );
};

export default SubmitSurvey;
