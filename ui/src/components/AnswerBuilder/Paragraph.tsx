import { TextField } from "@mui/material";

interface props {
  idx: number;
  onUpdateAnswer: any;
  isMultipleLine: boolean;
}


/**
 * Support for QuestionType.SHORT_ANSWER & QuestionType.PARAGRAPH
 * 
 * @param idx: index of question
 * @param onUpdateAnswer: func
 * @param isMultipleLine: if true then paragraph else one line
 * @tanhaok
 * @returns Component
 */
const Paragraph = ({ idx, onUpdateAnswer, isMultipleLine }: props) => {
  return (
    <TextField
      fullWidth
      multiline={isMultipleLine}
      rows={3}
      id="standard-basic"
      label="Your answer:"
      variant="standard"
      onBlur={(e) => onUpdateAnswer(idx, e.target.value)}
    />
  );
};

export default Paragraph;
