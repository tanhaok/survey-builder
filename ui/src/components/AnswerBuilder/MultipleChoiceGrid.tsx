import {
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

interface props {
  idx: number;
  cols: string[];
  rows: string[];
  onUpdateAnswer: any;
  answer: any;
}

// QuestionType.MULTIPLE_CHOICE_GRID
const MultipleChoiceGrid = ({
  idx,
  cols,
  rows,
  onUpdateAnswer,
  answer,
}: props) => {
  const onChangeHandler = (_row: string, _col: string) => {
    console.log(_row + " " + _col);
    const newAns = answer[idx].answer;
    newAns[_row] = _col;

    onUpdateAnswer(idx, newAns);
  };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ border: 0 }}></TableCell>
            {cols.map((col) => (
              <TableCell align="right" key={col} sx={{ border: 0 }}>
                {col}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row" sx={{ border: 0 }}>
                {row}
              </TableCell>
              {cols.map((col) => (
                <TableCell align="right" key={col} sx={{ border: 0 }}>
                  <Checkbox
                    onChange={() => onChangeHandler(row, col)}
                    checked={
                      answer[idx] ? answer[idx].answer[row] === col : false
                    }
                  />
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default MultipleChoiceGrid;
