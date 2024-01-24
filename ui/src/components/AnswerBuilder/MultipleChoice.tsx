import {
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";

interface props {
  idx: number;
  data: string[];
  onUpdateAnswer: any;
}

// QuestionType.MULTIPLE_CHOICE
const MultipleChoice = ({ idx, data, onUpdateAnswer }: props) => {
  return (
    <FormControl>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
        onChange={(e) => onUpdateAnswer(idx, e.target.value)}
      >
        {data.map((item: string) => (
          <FormControlLabel
            value={item}
            control={<Radio />}
            label={item}
            key={item}
          />
        ))}
      </RadioGroup>
    </FormControl>
  );
};

export default MultipleChoice;
