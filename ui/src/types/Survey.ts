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
