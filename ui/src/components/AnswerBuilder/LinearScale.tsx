import { FormControl, Radio, RadioGroup, Typography } from "@mui/material";
interface props {
  idx: number;
  data: any;
  onUpdateAnswer: any;
  answer: any;
}

// QuestionType.LINEAR_SCALE
const LinearScale = ({ idx, data, onUpdateAnswer, answer }: props) => {
  return (
    <>
      <Typography variant="subtitle1" color="primary">
        {data[0].label}
      </Typography>
      <FormControl>
        <RadioGroup
          aria-labelledby="demo-radio-buttons-group-label"
          name="radio-buttons-group"
          sx={{ display: "flex", flexDirection: "row" }}
        >
          {Array.from(
            Array(Number(data[1].value) - Number(data[0].value)).keys()
          ).map((i) => (
            <Radio
              checked={answer[idx] && answer[idx].answer === i + 1}
              onChange={() => onUpdateAnswer(idx, i + 1)}
              value={i + 1}
              name="radio-buttons"
              inputProps={{ "aria-label": "A" }}
              key={i.toString()}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Typography variant="subtitle1" color="primary">
        {data[1].label}
      </Typography>
    </>
  );
};

export default LinearScale;
