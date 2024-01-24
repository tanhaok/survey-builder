import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";

interface props {
  idx: number;
  data: string[];
  onUpdateAnswer: any;
  answer: any;
}

// QuestionType.DROP_DOWN
const DropDown = ({ idx, data, onUpdateAnswer, answer }: props) => {
  return (
    <FormControl fullWidth>
      <InputLabel id="demo-simple-select-label">Select</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        label="Select"
        value={answer[idx] ? answer[idx].answer : ""}
        onChange={(e) => onUpdateAnswer(idx, e.target.value)}
      >
        <MenuItem key={""} value={""}>
          {""}
        </MenuItem>
        {data.map((item) => (
          <MenuItem key={item} value={item}>
            {item}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default DropDown;
