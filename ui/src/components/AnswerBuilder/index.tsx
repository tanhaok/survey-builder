// "use client"
import { Answer } from "@/types/Answer";
import { QuestionData } from "@/types/Question";
import {
  Checkbox,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styles from "./index.module.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateField } from "@mui/x-date-pickers/DateField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

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
  const onCheckBoxChangeHandler = (e: any) => {
    const temp = answer[idx].answer;
    const checkedValue = e.target.value;
    if (temp) {
      if (temp.includes(checkedValue)) {
        const filterTemp = temp.filter((i: any) => i !== checkedValue);
        onUpdateAnswer(question.id, [...filterTemp]);
      } else {
        onUpdateAnswer(question.id, [...temp, checkedValue]);
      }
    } else {
      onUpdateAnswer(question.id, [checkedValue]);
    }
  };

  const getAnswerForm = (type: number) => {
    switch (type) {
      case 0: {
        // QuestionType.SHORT_ANSWER
        return (
          <div className={styles.answer_form}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Your answer:"
              variant="standard"
              onBlur={(e) => onUpdateAnswer(question.id, e.target.value)}
            />
          </div>
        );
      }
      case 1: {
        // QuestionType.PARAGRAPH
        return (
          <div className={styles.answer_form}>
            <TextField
              fullWidth
              multiline
              rows={3}
              id="standard-basic"
              label="Your answer:"
              variant="standard"
              onBlur={(e) => onUpdateAnswer(question.id, e.target.value)}
            />
          </div>
        );
      }
      case 2: {
        // QuestionType.MULTIPLE_CHOICE
        const choices = [...question.answerChoice];
        return (
          <div className={styles.answer_form}>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                onChange={(e) => onUpdateAnswer(question.id, e.target.value)}
              >
                {choices.map((item) => (
                  <FormControlLabel
                    value={item}
                    control={<Radio />}
                    label={item}
                    key={item}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        );
      }
      case 3: {
        // QuestionType.CHECK_BOX
        const choices = [...question.answerChoice];
        return (
          <div className={styles.answer_form}>
            <FormControl>
              {choices.map((item) => (
                <FormControlLabel
                  value={item}
                  control={<Checkbox />}
                  label={item}
                  key={item}
                  onChange={onCheckBoxChangeHandler}
                />
              ))}
            </FormControl>
          </div>
        );
      }
      case 4: {
        // QuestionType.DROP_DOWN
        const choices = [...question.answerChoice];
        return (
          <div className={styles.answer_form}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Select</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="Select"
                value={answer[idx] ? answer[idx].answer : ""}
                onChange={(e) => onUpdateAnswer(question.id, e.target.value)}
              >
                <MenuItem key={""} value={""}>
                  {""}
                </MenuItem>
                {choices.map((item) => (
                  <MenuItem key={item} value={item}>
                    {item}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        );
      }
      case 5: {
        // QuestionType.LINEAR_SCALE
        const choices = [...question.answerChoice];
        return (
          <div className={styles.answer_form}>
            <Typography variant="subtitle1" color="primary">
              {choices[0].label}
            </Typography>
            <FormControl>
              <RadioGroup
                aria-labelledby="demo-radio-buttons-group-label"
                name="radio-buttons-group"
                sx={{ display: "flex", flexDirection: "row" }}
              >
                {Array.from(
                  Array(
                    Number(choices[1].value) - Number(choices[0].value)
                  ).keys()
                ).map((i) => (
                  <Radio
                    checked={answer[idx] && answer[idx].answer === i + 1}
                    onChange={() => onUpdateAnswer(question.id, i + 1)}
                    value={i + 1}
                    name="radio-buttons"
                    inputProps={{ "aria-label": "A" }}
                    key={i.toString()}
                  />
                ))}
              </RadioGroup>
            </FormControl>
            <Typography variant="subtitle1" color="primary">
              {choices[1].label}
            </Typography>
          </div>
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
          <div className={styles.answer_form}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {cols.map((col) => (
                      <TableCell align="right" key={col}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                      {cols.map((col) => (
                        <TableCell align="right" key={col}>
                          <Radio />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        );
      }
      case 8: {
        // QuestionType.MULTIPLE_CHOICE_GRID
        const rows = [...question.answerChoice["rows"]];
        const cols = [...question.answerChoice["columns"]];
        return (
          <div className={styles.answer_form}>
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell></TableCell>
                    {cols.map((col) => (
                      <TableCell align="right" key={col}>
                        {col}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row}
                      </TableCell>
                      {cols.map((col) => (
                        <TableCell align="right" key={col}>
                          <Checkbox />
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
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
        {getAnswerForm(question.type)}
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default AnswerBuilder;
