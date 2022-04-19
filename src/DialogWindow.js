import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, Grid } from "@mui/material";
import Select from "react-select";
import customElseIf from "./customElseIf";
import fetchGetAllData from "./fetchGetAllData";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";

function DialogWindow(props) {
  const {
    handleDateChange,
    handleSendSubmit,
    handleClose,
    title,
    handleTitleFieldChange,
    handleTextFieldChange,
    date,
    description,
    buttonText,
    needlistOfPrograms,
    setProgramId,
    dialogTitle,
  } = props;

  const [selectedProgram, setSelectedProgram] = React.useState(null);

  const [programListError, setProgramListError] = React.useState(null);
  const [programListIsLoaded, setProgramListIsLoaded] = React.useState(false);
  const [programList, setProgramList] = React.useState([]);

  const [requestedProgramError, setRequestedProgramError] =
    React.useState(false);
  const [requestedDateError, setRequestedDateError] = React.useState(false);
  const [requestedTitleError, setRequestedTitleError] = React.useState(false);
  const [requestedDescError, setRequestedDescError] = React.useState(false);

  const changeSelectedProgram = (e) => {
    setSelectedProgram({ value: e.value, label: e.label });
    setProgramId(e.value);
  };
  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleSend = () => {
    if (isEmptyOrSpaces(title)) {
      setRequestedTitleError(true);
      return;
    }
    setRequestedTitleError(false);
    if (description === null || isEmptyOrSpaces(description)) {
      setRequestedDescError(true);
      return;
    }
    setRequestedDescError(false);
    if (date === null || date === "") {
      setRequestedDateError(true);
      return;
    }
    setRequestedDateError(false);
    if (needlistOfPrograms) {
      if (selectedProgram === null) {
        setRequestedProgramError(true);
        return;
      }
      setRequestedProgramError(false);
    }

    handleSendSubmit();
  };

  var option;
  if (programListIsLoaded) {
    option = programList.map((row) => {
      return { value: row.id, label: row.name };
    });
  }

  useEffect(() => {
    if (needlistOfPrograms) {
      fetchGetAllData(
        "program/getAll",
        setProgramListIsLoaded,
        setProgramList,
        setProgramListError
      );
    }
  }, [needlistOfPrograms]);
  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{dialogTitle}</DialogTitle>
      <DialogContent>
        <FormControl error={true}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Tytuł Sprawozdania"
                multiline
                variant="filled"
                onChange={handleTitleFieldChange}
                sx={{ width: "100%" }}
                defaultValue={title}
              />
              {requestedTitleError && (
                <FormHelperText>Tytuł jest wymagany!</FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Opis"
                multiline
                variant="filled"
                onChange={handleTextFieldChange}
                defaultValue={description}
                sx={{ width: "100%" }}
                inputProps={{ maxLength: 2000 }}
              />
              {requestedDescError && (
                <FormHelperText>Opis jest wymagany!</FormHelperText>
              )}
            </Grid>
            <Grid item xs={9}>
              <TextField
                id="date"
                label="Data Wykonania"
                type="date"
                defaultValue={date}
                onChange={handleDateChange}
              />
              {requestedDateError && (
                <FormHelperText>Data jest wymagana!</FormHelperText>
              )}
            </Grid>

            <Grid item xs={9}>
              {needlistOfPrograms === true
                ? customElseIf(
                    programListError,
                    programListIsLoaded,
                    <React.Fragment>
                      <Select
                        label="Program"
                        value={selectedProgram}
                        onChange={changeSelectedProgram}
                        options={option}
                      />
                      {requestedProgramError && (
                        <FormHelperText>
                          Pole program jest wymagane!
                        </FormHelperText>
                      )}
                    </React.Fragment>
                  )
                : null}
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleSend}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DialogWindow;
