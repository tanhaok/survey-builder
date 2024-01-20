"use client";
import Image from "next/image";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Survey, SurveyList } from "@/types/Survey";
import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso, TableComponents } from "react-virtuoso";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import DensitySmallOutlinedIcon from "@mui/icons-material/DensitySmallOutlined";
import ButtonGroup from "@mui/material/ButtonGroup";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const mockDataSurvey: Survey[] = [
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
  {
    count: 1,
    description: "this is description for 1",
    endDate: "03, May 2023",
    startDate: "03, April 2023",
    id: "xxx-111",
    name: "Survey for all user",
    remainingDate: 6,
  },
];

const mockData: SurveyList = {
  surveys: mockDataSurvey,
  total: 120,
};

interface ColumnData {
  dataKey: keyof Survey;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 200,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 120,
    label: "Description",
    dataKey: "description",
  },
  {
    width: 120,
    label: "Start Date",
    dataKey: "startDate",
  },
  {
    width: 120,
    label: "End Date",
    dataKey: "endDate",
    numeric: true,
  },
  {
    width: 120,
    label: "Remaining Date",
    dataKey: "remainingDate",
    numeric: true,
  },
  {
    width: 120,
    label: "Count",
    dataKey: "count",
    numeric: true,
  },
];

export default function Home() {
  const [surveyData, setSurveyData] = useState<SurveyList>();

  useEffect(() => {
    setSurveyData(mockData);
  }, []);

  const VirtuosoTableComponents: TableComponents<Survey> = {
    // eslint-disable-next-line react/display-name
    Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
      <TableContainer component={Paper} {...props} ref={ref} />
    )),
    Table: (props) => (
      <Table
        {...props}
        sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
      />
    ),
    TableHead,
    TableRow: ({ item: _item, ...props }) => <TableRow {...props} />,
    // eslint-disable-next-line react/display-name
    TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
      <TableBody {...props} ref={ref} />
    )),
  };

  const fixedHeaderContent = () => {
    return (
      <TableRow>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            variant="head"
            align={column.numeric || false ? "right" : "left"}
            style={{ width: column.width }}
            sx={{
              backgroundColor: "background.paper",
            }}
          >
            {column.label}
          </TableCell>
        ))}
        <TableCell
          variant="head"
          style={{ width: 120 }}
          sx={{
            backgroundColor: "background.paper",
          }}
          align="center"
        >
          Actions
        </TableCell>
      </TableRow>
    );
  };

  const rowContent = (_index: number, row: Survey) => {
    return (
      <React.Fragment>
        {columns.map((column) => (
          <TableCell
            key={column.dataKey}
            align={column.numeric || false ? "right" : "left"}
          >
            {row[column.dataKey]}
          </TableCell>
        ))}
        <TableCell align="center">
          <ButtonGroup>
            <IconButton color="success" onClick={() => alert(row.id)}>
              <DensitySmallOutlinedIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => alert(row.id)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={() => alert(row.id)}>
              <DeleteOutlineOutlinedIcon />
            </IconButton>
          </ButtonGroup>
        </TableCell>
      </React.Fragment>
    );
  };

  return (
    <main className={styles.main}>
      <div className={styles.table_header}>
        <div>You have {surveyData?.total} surveys</div>
        <div className={styles.table_utils}>
          <Fab color="primary">
            <AddIcon />
          </Fab>
          <TextField
            id="input-with-icon-textfield"
            label="Search by name or description"
            sx={{ m: 1, width: "40ch", height: "5ch" }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            variant="outlined"
          />
        </div>
      </div>
      <div className={styles.survey_table}>
        <Paper style={{ height: 600, width: "100%" }}>
          <TableVirtuoso
            data={surveyData?.surveys}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    </main>
  );
}
