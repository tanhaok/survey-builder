import { Question } from "./Question";

export type Survey = {
  id: String;
  name: String;
  description: String;
  startDate: String;
  endDate: String;
  remainingDate: number;
  count: number;
};

export type SurveyList = {
  surveys: Survey[];
  total: number;
};

export type SurveyCreate = {
  name: String;
  description: String;
  startDate: String;
  endDate: String;
  questions: Question[];
};
