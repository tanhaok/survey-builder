// "use client"
import { Answer } from "@/types/Answer";
import { QuestionData } from "@/types/Question";
import {
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./index.module.css";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import Paragraph from "./Paragraph";
import MultipleChoice from "./MultipleChoice";
import CheckBox from "./CheckBox";
import DropDown from "./DropDown";
import LinearScale from "./LinearScale";
import MultipleChoiceGrid from "./MultipleChoiceGrid";

interface Props {
  idx: number;
  question: QuestionData;
  answer: Answer[];
  onUpdateAnswer: any;
  styleClass: any;
}

const AnswerBuilder = ({
  idx,
  question,
  answer,
  onUpdateAnswer,
  styleClass,
}: Props) => {
  const getAnswerForm = (type: number) => {
    switch (type) {
      case 0: {
        return (
          <Paragraph
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            isMultipleLine={false}
          />
        );
      }
      case 1: {
        return (
          <Paragraph
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            isMultipleLine={true}
          />
        );
      }
      case 2: {
        // QuestionType.MULTIPLE_CHOICE
        const choices = [...question.answerChoice];
        return (
          <MultipleChoice
            data={choices}
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
          />
        );
      }
      case 3: {
        // QuestionType.CHECK_BOX
        const choices = [...question.answerChoice];
        return (
          <CheckBox
            data={choices}
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            answer={answer}
          />
        );
      }
      case 4: {
        // QuestionType.DROP_DOWN
        const choices = [...question.answerChoice];
        return (
          <DropDown
            data={choices}
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            answer={answer}
          />
        );
      }
      case 5: {
        // QuestionType.LINEAR_SCALE
        const choices = [...question.answerChoice];
        return (
          <LinearScale
            data={choices}
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            answer={answer}
          />
        );
      }
      case 6: {
        // QuestionType.DATE
        return (
          <div className={styles.answer_form}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField"]}>
                <DateField label="Your answer" />
              </DemoContainer>
            </LocalizationProvider>
          </div>
        );
      }
      case 7: {
        // QuestionType.CHECKBOX_GRID
        const rows = [...question.answerChoice["rows"]];
        const cols = [...question.answerChoice["columns"]];
        return (
          <MultipleChoiceGrid
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            rows={rows}
            cols={cols}
            answer={answer}
            isMultiple={false}
          />
        );
      }
      case 8: {
        // QuestionType.MULTIPLE_CHOICE_GRID
        const rows = [...question.answerChoice["rows"]];
        const cols = [...question.answerChoice["columns"]];
        return (
          <MultipleChoiceGrid
            idx={idx}
            onUpdateAnswer={onUpdateAnswer}
            rows={rows}
            cols={cols}
            answer={answer}
            isMultiple={true}
          />
        );
      }
      default: {
        return "Nope";
      }
    }
  };

  if (question && answer) {
    return (
      <div className={styleClass}>
        <Typography variant="subtitle1" color="primary">
          {question.question}
          {question.isRequire ? "*" : ""}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {question.description}
        </Typography>
        <div className={styles.answer_form}>{getAnswerForm(question.type)}</div>
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default AnswerBuilder;
