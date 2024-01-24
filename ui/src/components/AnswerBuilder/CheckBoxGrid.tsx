"use client";
import {
  Paper,
  Radio,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

interface props {
  idx: number;
  cols: string[];
  rows: string[];
  onUpdateAnswer: any;
  answer: any;
}

// QuestionType.CHECKBOX_GRID
const CheckBoxGrid = ({ idx, cols, rows, onUpdateAnswer, answer }: props) => {
  const [selectedData, setSelectedData] = useState<string>("");

  const onChangeHandler = (_row: string, _col: string) => {
    const newAns = answer[idx].answer;
    const preAnw = newAns[_row];
    newAns[_row] = _col;

    setSelectedData((pre) => pre.replace(preAnw, "").concat(_col));

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
                  <Radio
                    onChange={() => onChangeHandler(row, col)}
                    checked={
                      answer[idx] ? answer[idx].answer[row] === col : false
                    }
                    disabled={
                      answer[idx]
                        ? selectedData.includes(col) &&
                          answer[idx].answer[row] !== col
                        : false
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

export default CheckBoxGrid;
