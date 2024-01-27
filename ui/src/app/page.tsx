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
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Header from "@/components/Header";
import GetAppOutlinedIcon from "@mui/icons-material/GetAppOutlined";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import ContentCopyOutlinedIcon from "@mui/icons-material/ContentCopyOutlined";

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
  const fileType =
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
  const fileExtension = ".xlsx";

  const [surveyData, setSurveyData] = useState<Survey[]>();
  const [originSurveyData, setOriginSurveyData] = useState<Survey[]>();
  const [textSearch, setTextSearch] = useState<string>();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [deleteStrId, setDeleteStrId] = useState<string>("");

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

  const onExportDataHandler = (id: string) => {
    axios
      .get(`http://localhost:8081/api/surveys/result/${id}`)
      .then((res) => res.data.data)
      .then((data) => {
        const ws = XLSX.utils.json_to_sheet(data["answers"]);
        XLSX.utils.sheet_add_aoa(ws, [[...data["questions"]]], {
          origin: "A1",
        });

        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const exportData = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(exportData, data["surveyName"] + fileExtension);
      })
      .catch((err) => console.log(err));
  };

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

  const onClickCopyLinkHandler = (id: string) => {
    const text = `http://localhost:3000/forms?id=${id}`;
    navigator.clipboard.writeText(text);
    alert("Copied");
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
            <IconButton
              color="secondary"
              onClick={() => onClickCopyLinkHandler(row.id)}
            >
              <ContentCopyOutlinedIcon />
            </IconButton>
            <IconButton
              color="success"
              onClick={() => onExportDataHandler(row.id)}
            >
              <GetAppOutlinedIcon />
            </IconButton>
            <IconButton color="primary" onClick={() => alert(row.id)}>
              <EditOutlinedIcon />
            </IconButton>
            <IconButton color="error" onClick={() => setDeleteStrId(row.id)}>
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

  const onDeleteSurvey = () => {
    const txtId = deleteStrId;
    if (txtId) {
      axios
        .patch(`http://localhost:8081/api/surveys/stop/${txtId}`)
        .then((res) => {
          getSurveyData();
        })
        .catch((e) => console.log(e));
    }
    setDeleteStrId("");
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
      <Header />

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

        {/* Delete confirm dialog */}
        <Dialog
          open={deleteStrId !== ""}
          onClose={() => setDeleteStrId("")}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">{"Confirmation"}</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Please confirm that you want to delete the selected survey.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDeleteStrId("")}>Disagree</Button>
            <Button onClick={onDeleteSurvey} autoFocus>
              Agree
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </main>
  );
}
