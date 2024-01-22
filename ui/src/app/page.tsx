"use client";
import styles from "./page.module.css";
import { useState, useEffect } from "react";
import { Survey } from "@/types/Survey";
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
import CreateSurveyDialog from "@/components/SurveyDialog";
import axios from "axios";

interface ColumnData {
  dataKey: keyof Survey;
  label: string;
  numeric?: boolean;
  width: number;
}

const columns: ColumnData[] = [
  {
    width: 120,
    label: "Name",
    dataKey: "name",
  },
  {
    width: 200,
    label: "Description",
    dataKey: "description",
  },
  {
    width: 80,
    label: "Start Date",
    dataKey: "startDate",
  },
  {
    width: 80,
    label: "End Date",
    dataKey: "endDate",
    numeric: true,
  },
  {
    width: 80,
    label: "Remaining Date",
    dataKey: "remainingDate",
    numeric: true,
  },
  {
    width: 80,
    label: "Count",
    dataKey: "count",
    numeric: true,
  },
  {
    width: 80,
    label: "Is Alow Anonymous",
    dataKey: "isAllowAnonymous",
  },
];

export default function Home() {
  const [surveyData, setSurveyData] = useState<Survey[]>();
  const [originSurveyData, setOriginSurveyData] = useState<Survey[]>();
  const [textSearch, setTextSearch] = useState<String>();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const getSurveyData = () => {
    axios
      .get("http://localhost:8081/api/surveys/all")
      .then((res) => {
        setSurveyData(res.data.data);
        setOriginSurveyData(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSurveyData();
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

  const handleOpenDialog = () => {
    setIsOpen(true);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
    getSurveyData();
  };

  const onTextSearchHandler = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const text = e.target.value;
    setTextSearch(text);
    if (text) {
      const newArr = originSurveyData?.filter(
        (data) =>
          data.name.toLowerCase().indexOf(text.toLocaleLowerCase()) > 0 ||
          data.description.toLowerCase().indexOf(text.toLocaleLowerCase()) > 0
      );
      setSurveyData(newArr);
    } else setSurveyData(originSurveyData);
  };

  return (
    <main className={styles.main}>
      <div className={styles.table_header}>
        <div>You have {surveyData?.length} surveys</div>
        <div className={styles.table_utils}>
          <Fab color="primary" onClick={handleOpenDialog}>
            <AddIcon />
          </Fab>
          <CreateSurveyDialog isOpen={isOpen} onClose={handleCloseDialog} />
          <TextField
            id="input-with-icon-textfield"
            label="Search by name or description"
            sx={{ m: 1, width: "40ch", height: "5ch" }}
            value={textSearch}
            onChange={(e) => onTextSearchHandler(e)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
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
            data={surveyData}
            components={VirtuosoTableComponents}
            fixedHeaderContent={fixedHeaderContent}
            itemContent={rowContent}
          />
        </Paper>
      </div>
    </main>
  );
}
