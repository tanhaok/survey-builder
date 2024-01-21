"use client";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import ListItemButton from "@mui/material/ListItemButton";
import List from "@mui/material/List";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import CloseIcon from "@mui/icons-material/Close";
import Slide from "@mui/material/Slide";
import { TransitionProps } from "@mui/material/transitions";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import styles from "./index.module.css";
import { Question, QuestionMode, QuestionType } from "@/types/Question";
import QuestionBuilder from "../QuestionBuilder";
import { ListItem, TextField } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { SurveyCreate } from "@/types/Survey";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

interface props {
  isOpen: boolean;
  onClose: any;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="left" ref={ref} {...props} />;
});

const CreateSurveyDialog = ({ isOpen, onClose }: props) => {
  const [listQuestion, setListQuestion] = useState<Question[]>([]);
  const [survey, setSurvey] = useState<SurveyCreate>({
    description: "",
    endDate: "",
    name: "",
    questions: listQuestion,
    startDate: "",
  });

  const defaultNewQuestion: Question = {
    question: "Question",
    type: QuestionType.SHORT_ANSWER,
    isRequire: true,
    description: "",
    answerChoice: undefined
  };

  const addNewQuestionHandler = () => {
    defaultNewQuestion.question = "Question " + listQuestion.length;
    setListQuestion([...listQuestion, defaultNewQuestion]);
  };

  const onUpdateQuestionHandler = (idx: number, newQuestion: Question) => {
    const old = [...listQuestion];
    old[idx] = newQuestion;
    setListQuestion([...old]);
  };

  const onDeleteQuestionHandler = (question: string) => {
    const filterList = listQuestion.filter((i) => i.question !== question);
    setListQuestion([...filterList]);
  };

  const onSaveHandler = () => {
    setSurvey({ ...survey, questions: [...listQuestion] });
    console.log(listQuestion);
  };

  return (
    <div>
      <Dialog
        fullScreen
        open={isOpen}
        onClose={onClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: "relative" }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={onClose}
              aria-label="close"
            >
              <CloseIcon />
            </IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Create new survey
            </Typography>
            <Button autoFocus color="inherit" onClick={onSaveHandler}>
              save
            </Button>
          </Toolbar>
        </AppBar>

        <Accordion defaultExpanded sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Summary</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <TextField
              fullWidth
              label="Survey Name"
              id="fullWidth"
              value={survey.name}
              onChange={(e) => setSurvey({ ...survey, name: e.target.value })}
            />

            <TextField
              fullWidth
              id="standard-multiline-flexible"
              label="Survey Description"
              multiline
              maxRows={4}
              sx={{ my: 1 }}
              value={survey.description}
              onChange={(e) =>
                setSurvey({ ...survey, description: e.target.value })
              }
            />
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DateField", "DateField"]}>
                <DateField
                  label="Start Date"
                  value={survey.startDate}
                  onChange={(newValue) =>
                    setSurvey({ ...survey, startDate: newValue?.toString() })
                  }
                />
                <DateField
                  label="End Date"
                  value={survey.endDate}
                  onChange={(newValue) =>
                    setSurvey({ ...survey, endDate: newValue?.toString() })
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </AccordionDetails>
        </Accordion>

        <Accordion sx={{ width: "100%" }}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <Typography>Question</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <div className={styles.survey}>
              <List sx={{ width: "75%" }}>
                {listQuestion.map((item, index) => (
                  <div key={index.toString()}>
                    <ListItem>
                      <QuestionBuilder
                        mode={QuestionMode.EDIT}
                        idx={index}
                        onUpdateHandler={onUpdateQuestionHandler}
                        onDeleteHandler={() =>
                          onDeleteQuestionHandler(item.question)
                        }
                        data={item}
                      />
                    </ListItem>
                  </div>
                ))}

                <ListItemButton
                  sx={{ textAlign: "center", display: "block" }}
                  onClick={addNewQuestionHandler}
                >
                  <AddIcon />
                </ListItemButton>
              </List>
            </div>
          </AccordionDetails>
        </Accordion>
      </Dialog>
    </div>
  );
};

export default CreateSurveyDialog;
