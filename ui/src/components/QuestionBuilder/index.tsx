"use client";
import { Question, QuestionMode, QuestionType } from "@/types/Question";
import styles from "./index.module.css";
import {
  Divider,
  FormControl,
  InputLabel,
  ListItemIcon,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import { ChangeEvent, useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";

interface props {
  mode: QuestionMode;
  data: Question;
  idx: number;
  onUpdateHandler: any;
  onDeleteHandler: any;
}

const QuestionBuilder = ({
  mode,
  data,
  idx,
  onUpdateHandler,
  onDeleteHandler,
}: props) => {
  const onUpdateQuestionTypeHandler = (e: SelectChangeEvent<QuestionType>) => {
    const newQ = data;
    newQ.type = QuestionType[QuestionType[Number(e.target.value)]];
    if (newQ.type === QuestionType.LINEAR_SCALE) {
      newQ.answerChoice = [
        {
          value: 0,
          label: "Optional",
        },
        {
          value: 5,
          label: "Optional",
        },
      ];
    } else if (
      [QuestionType.CHECKBOX_GRID, QuestionType.MULTIPLE_CHOICE_GRID].includes(
        newQ.type
      )
    ) {
      newQ.answerChoice = {
        rows: [],
        columns: [],
      };
    } else {
      newQ.answerChoice = [];
    }
    onUpdateHandler(idx, newQ);
  };

  const onUpdateQuestionHandler = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof Question
  ) => {
    const newQ: Question = data;
    newQ[field] = e.target.value;
    onUpdateHandler(idx, newQ);
  };

  const onUpdateRequireHandler = () => {
    const newQ = data;
    newQ.isRequire = !data.isRequire;
    onUpdateHandler(idx, newQ);
  };

  const onAddNewAnswerChoice = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      const newQ = data;
      if (data.answerChoice) {
        newQ.answerChoice = [...data.answerChoice, e.target.value];
      } else {
        newQ.answerChoice = [e.target.value];
      }

      onUpdateHandler(idx, newQ);

      document.getElementById("standard-basic-input-option").value = "";
    }
  };

  const onDeleteAnswerChoice = (value: string) => {
    const filtered = data.answerChoice.filter((i: any) => i !== value);

    const newQ = data;
    newQ.answerChoice = filtered;

    onUpdateHandler(idx, newQ);
  };

  const onLinearScaleUpdateValueHandler = (
    index: number,
    e: SelectChangeEvent<Number>
  ) => {
    const newQ = data;
    newQ.answerChoice[index].value = e.target.value;
    onUpdateHandler(idx, newQ);
  };

  const onLinearScaleUpdateLabelHandler = (
    index: number,
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const newQ = data;
    newQ.answerChoice[index].label = e.target.value;
    onUpdateHandler(idx, newQ);
  };

  const onGridAddNewAnswerChoice = (
    e: KeyboardEvent<HTMLDivElement>,
    _type: string
  ) => {
    if (e.key === "Enter") {
      const newQ = data;
      newQ.answerChoice[_type] = [...data.answerChoice[_type], e.target.value];
      onUpdateHandler(idx, newQ);
      document.getElementById(`standard-basic-input-${_type}-option`).value =
        "";
    }
  };

  const onGridDelNewAnswerChoice = (value: string, _type: string) => {
    const newQ = data;
    newQ.answerChoice[_type] = data.answerChoice[_type].filter(
      (i: any) => i !== value
    );
    onUpdateHandler(idx, newQ);
  };

  const getAnswerChoice = (type: QuestionType) => {
    const option = [
      QuestionType.DROP_DOWN,
      QuestionType.CHECK_BOX,
      QuestionType.MULTIPLE_CHOICE,
    ];
    const grid = [
      QuestionType.CHECKBOX_GRID,
      QuestionType.MULTIPLE_CHOICE_GRID,
    ];
    if (option.includes(type)) {
      return (
        <div>
          <TextField
            id="standard-basic-input-option"
            label="Enter your option"
            variant="standard"
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            onKeyDown={(e) => onAddNewAnswerChoice(e)}
          />

          <List
            dense
            sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
          >
            {(data.answerChoice || []).map((value: any) => {
              const labelId = `checkbox-list-secondary-label-${value}`;
              return (
                <ListItem
                  key={value}
                  secondaryAction={
                    <IconButton
                      edge="end"
                      aria-label="Delete"
                      onClick={() => onDeleteAnswerChoice(value)}
                    >
                      <CloseIcon />
                    </IconButton>
                  }
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>
                      {type === QuestionType.CHECK_BOX ? (
                        <CheckBoxOutlineBlankIcon />
                      ) : type === QuestionType.MULTIPLE_CHOICE ? (
                        <RadioButtonUncheckedIcon />
                      ) : undefined}
                    </ListItemIcon>
                    <ListItemText id={labelId} primary={`${value}`} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </div>
      );
    } else if (grid.includes(type)) {
      return (
        <div className={styles.question_grid}>
          <div>
            <TextField
              id="standard-basic-input-rows-option"
              label="Enter new row"
              variant="standard"
              sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
              onKeyDown={(e) => onGridAddNewAnswerChoice(e, "rows")}
            />

            <List
              dense
              sx={{ width: "100%", maxWidth: 400, bgcolor: "background.paper" }}
            >
              {(data.answerChoice["rows"] || []).map((value: any) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={() => onGridDelNewAnswerChoice(value, "rows")}
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
          <div>
            <TextField
              id="standard-basic-input-columns-option"
              label="Enter new columns"
              variant="standard"
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
              onKeyDown={(e) => onGridAddNewAnswerChoice(e, "columns")}
            />

            <List
              dense
              sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
            >
              {(data.answerChoice["columns"] || []).map((value: any) => {
                const labelId = `checkbox-list-secondary-label-${value}`;
                return (
                  <ListItem
                    key={value}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        aria-label="Delete"
                        onClick={() =>
                          onGridDelNewAnswerChoice(value, "columns")
                        }
                      >
                        <CloseIcon />
                      </IconButton>
                    }
                    disablePadding
                  >
                    <ListItemButton>
                      <ListItemText id={labelId} primary={`${value}`} />
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </div>
        </div>
      );
    } else if (QuestionType.LINEAR_SCALE === type) {
      return (
        <div>
          <Divider sx={{ m: 2 }} />

          <FormControl sx={{ width: "10ch" }}>
            <InputLabel id="linear-min">From</InputLabel>
            <Select
              labelId="linear-min"
              id="demo-simple-select"
              value={data.answerChoice[0].value}
              label="From"
              onChange={(e) => onLinearScaleUpdateValueHandler(0, e)}
            >
              <MenuItem value={0}>0</MenuItem>
              <MenuItem value={1}>1</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{ width: "10ch", mx: 1 }}>
            <InputLabel id="linear-max">To</InputLabel>
            <Select
              labelId="linear-max"
              id="demo-simple-select"
              value={data.answerChoice[1].value}
              label="To"
              onChange={(e) => onLinearScaleUpdateValueHandler(1, e)}
            >
              {[5, 6, 7, 8, 9, 10].map((i) => (
                <MenuItem value={i} key={i.toString()}>
                  {i}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            sx={{ mx: 1 }}
            id="filled-basic"
            label={`Label for value ${data.answerChoice[0].value}`}
            variant="filled"
            value={data.answerChoice[0].label}
            onChange={(e) => onLinearScaleUpdateLabelHandler(0, e)}
          />
          <TextField
            sx={{ mx: 1 }}
            id="filled-basic"
            label={`Label for value ${data.answerChoice[1].value}`}
            variant="filled"
            value={data.answerChoice[1].label}
            onChange={(e) => onLinearScaleUpdateLabelHandler(1, e)}
          />
        </div>
      );
    }
  };

  return (
    <div className={styles.question_form}>
      <div className={styles.question_head}>
        <div className={styles.question_head_left}>
          <TextField
            label="Question"
            sx={{ width: "50%" }}
            value={data?.question}
            onChange={(e) => onUpdateQuestionHandler(e, "question")}
          />
          <FormControl sx={{ width: "30%", ml: 1 }}>
            <InputLabel id="demo-simple-select-label">Type</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={data?.type}
              label="Type"
              onChange={(e) => onUpdateQuestionTypeHandler(e)}
            >
              {Object.values(QuestionType)
                .filter((i) => typeof i === "string")
                .map((item, index) => (
                  <MenuItem value={index} key={item}>
                    {item.toString().replaceAll("_", " ")}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <IconButton aria-label="delete" onClick={onDeleteHandler}>
            <CloseIcon />
          </IconButton>
        </div>
      </div>
      <TextField
        fullWidth
        label="Description"
        sx={{ mt: 1 }}
        value={data?.description}
        onChange={(e) => onUpdateQuestionHandler(e, "description")}
      />
      <FormControlLabel
        checked={data.isRequire}
        control={<Switch />}
        label="Required"
        onChange={onUpdateRequireHandler}
      />
      {getAnswerChoice(data.type)}
    </div>
  );
};

export default QuestionBuilder;
