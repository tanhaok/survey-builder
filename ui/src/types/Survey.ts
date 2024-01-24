import { Question, QuestionData } from "./Question";

export type Survey = {
  id: string;
  name: string;
  description: string;
  startDate: string;
  endDate: string;
  remainingDate: number;
  count: number;
  isAllowAnonymous: boolean;
};

export type SurveyList = {
  surveys: Survey[];
  total: number;
};

export type SurveyCreate = {
  name: string;
  description: string;
  startDate?: string;
  endDate?: string;
  questions: Question[];
};

export type SurveyData = {
  id: string;
  name: string;
  description: string;
  questions: QuestionData[];
};
