import React, { useEffect } from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, Grid, MenuItem } from "@mui/material";

import ConditionalContentDisplay from "../ConditionalContentDisplay";
import { useSelector, useDispatch } from "react-redux";
import { programSelector, fetchAllPrograms } from "../program/programSlice";

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
    open,
    handleDateChange,
    handleSendSubmit,
    handleClose,
    title,
    handleTitleFieldChange,
    handleTextFieldChange,
    date,
    description,
    needlistOfPrograms,
    setProgramId,
  } = props;

  const { status, list } = useSelector(programSelector);
  const [selectedProgram, setSelectedProgram] = React.useState("");
  const [requestedProgramError, setRequestedProgramError] =
    React.useState(false);
  const [requestedDateError, setRequestedDateError] = React.useState(false);
  const [requestedTitleError, setRequestedTitleError] = React.useState(false);
  const [requestedDescError, setRequestedDescError] = React.useState(false);

  const dispatch = useDispatch();

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
      dispatch(fetchAllPrograms());
    }
  }, [needlistOfPrograms, dispatch]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        {needlistOfPrograms === true
          ? "Dodawanie Raportu"
          : "Edytowanie Raportu"}
      </DialogTitle>
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
                <ConditionalContentDisplay status={status}>
                  <TextField
                    sx={{ width: "100%" }}
                    select
                    value={selectedProgram}
                    label="Program"
                    onChange={changeSelectedProgram}
                  >
                    {list.map((row) => (
                      <MenuItem key={row.id} value={row.id}>
                        <ListItemText primary={row.name} />
                      </MenuItem>
                    ))}
                  </TextField>
                  {requestedProgramError && (
                    <FormHelperText error={true}>
                      Program jest wymagany!
                    </FormHelperText>
                  )}
                </ConditionalContentDisplay>
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
          {needlistOfPrograms === true ? "Dodaj Raport" : "Edytuj Raport"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
