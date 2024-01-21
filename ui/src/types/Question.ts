export enum QuestionType {
  SHORT_ANSWER,
  PARAGRAPH,
  MULTIPLE_CHOICE,
  CHECK_BOX,
  DROP_DOWN,
  LINEAR_SCALE,
  DATE,
  CHECKBOX_GRID,
  MULTIPLE_CHOICE_GRID,
}

export enum QuestionMode {
  EDIT,
  CREATE,
  DONE,
}

export type Question = {
  question: string;
  description?: String;
  isRequire: boolean;
  type: QuestionType;
  answerChoice?: any;
  gridData?: any;
};
