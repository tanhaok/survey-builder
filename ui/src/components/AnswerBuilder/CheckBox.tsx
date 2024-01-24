import { Checkbox, FormControl, FormControlLabel } from "@mui/material";

interface props {
  idx: number;
  data: string[];
  onUpdateAnswer: any;
  answer: any;
}

// QuestionType.CHECK_BOX
const CheckBox = ({ idx, data, onUpdateAnswer, answer }: props) => {
  const onCheckBoxChangeHandler = (e: any) => {
    const temp = answer[idx].answer;
    const checkedValue = e.target.value;
    if (temp) {
      if (temp.includes(checkedValue)) {
        const filterTemp = temp.filter((i: any) => i !== checkedValue);
        onUpdateAnswer(idx, [...filterTemp]);
      } else {
        onUpdateAnswer(idx, [...temp, checkedValue]);
      }
    } else {
      onUpdateAnswer(idx, [checkedValue]);
    }
  };
  return (
    <FormControl>
      {data.map((item) => (
        <FormControlLabel
          value={item}
          control={<Checkbox />}
          label={item}
          key={item}
          onChange={onCheckBoxChangeHandler}
        />
      ))}
    </FormControl>
  );
};

export default CheckBox;
