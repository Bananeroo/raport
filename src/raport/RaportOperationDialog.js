import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, Grid, MenuItem } from "@mui/material";

import ConditionalContentDisplay from "../ConditionalContentDisplay";
import fetchGetAllData from "../fetchGetAllData";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import ListItemText from "@mui/material/ListItemText";

export default function RaportOperationDialog(props) {
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

  const [selectedProgram, setSelectedProgram] = React.useState("");

  const [programListError, setProgramListError] = React.useState(null);
  const [programListIsLoaded, setProgramListIsLoaded] = React.useState(false);
  const [programList, setProgramList] = React.useState([]);

  const [requestedProgramError, setRequestedProgramError] =
    React.useState(false);
  const [requestedDateError, setRequestedDateError] = React.useState(false);
  const [requestedTitleError, setRequestedTitleError] = React.useState(false);
  const [requestedDescError, setRequestedDescError] = React.useState(false);

  const changeSelectedProgram = (e) => {
    setSelectedProgram(e.target.value);
    setProgramId(e.target.value);
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
      if (selectedProgram === "") {
        setRequestedProgramError(true);
        return;
      }
      setRequestedProgramError(false);
    }

    handleSendSubmit();
  };

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
      <IconButton
        onClick={handleClose}
        sx={{
          position: "absolute",
          right: 8,
          top: 8,
          color: (theme) => theme.palette.grey[500],
        }}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent>
        <FormControl>
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
                <FormHelperText error={true}>
                  Tytuł jest wymagany!
                </FormHelperText>
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
                <FormHelperText error={true}>
                  Opis jest wymagany!
                </FormHelperText>
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
                <FormHelperText error={true}>
                  Data jest wymagana!
                </FormHelperText>
              )}
            </Grid>

            <Grid item xs={12}>
              {needlistOfPrograms === true && (
                <ConditionalContentDisplay
                  error={programListError}
                  isLoaded={programListIsLoaded}
                  content={
                    <React.Fragment>
                      <TextField
                        sx={{ width: "100%" }}
                        select
                        value={selectedProgram}
                        label="Program"
                        onChange={changeSelectedProgram}
                      >
                        {programList.map((row) => {
                          return (
                            <MenuItem key={row.id} value={row.id}>
                              <ListItemText primary={row.name} />
                            </MenuItem>
                          );
                        })}
                      </TextField>
                      {requestedProgramError && (
                        <FormHelperText error={true}>
                          Program jest wymagany!
                        </FormHelperText>
                      )}
                    </React.Fragment>
                  }
                />
              )}
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="outlined" onClick={handleSend}>
          {buttonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
