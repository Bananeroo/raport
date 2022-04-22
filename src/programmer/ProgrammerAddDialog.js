import React from "react";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Dialog, Grid } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";

export default function ProgrammerAddDialog(props) {
  const {
    open,
    setOpen,
    handleSendSubmit,
    programmerName,
    setProgrammerName,
    programmerSurname,
    setProgrammerSurname,
    programmerEmail,
    setProgrammerEmail,
    programmerAge,
    setProgrammerAge,
    programmerPassword,
    setProgrammerPassword,
  } = props;

  const [requestedNameError, setRequestedNameError] = React.useState(false);
  const [requestedSurnameError, setRequestedSurnameError] =
    React.useState(false);
  const [requestedEmailError, setRequestedEmailError] = React.useState(false);
  const [requestedAgeError, setRequestedAgeError] = React.useState(false);
  const [requestedPasswordError, setRequestedPasswordError] =
    React.useState(false);

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };
  function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
  }
  const handleSend = () => {
    if (isEmptyOrSpaces(programmerName)) {
      setRequestedNameError(true);
      return;
    }
    setRequestedNameError(false);
    if (isEmptyOrSpaces(programmerSurname)) {
      setRequestedSurnameError(true);
      return;
    }

    setRequestedSurnameError(false);
    if (isEmptyOrSpaces(programmerEmail)) {
      setRequestedEmailError(true);
      return;
    }
    var emailPattern = new RegExp(
      /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i
    );
    if (!emailPattern.test(programmerEmail)) {
      setRequestedEmailError(true);
      return;
    }
    setRequestedEmailError(false);
    if (!isNumeric(programmerAge)) {
      setRequestedAgeError(true);
      return;
    }
    setRequestedAgeError(false);
    if (isEmptyOrSpaces(programmerPassword)) {
      setRequestedPasswordError(true);
      return;
    }
    setRequestedPasswordError(false);

    handleSendSubmit();
  };

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>{"Dodawanie Programisty"}</DialogTitle>
      <IconButton
        onClick={() => setOpen(false)}
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
                label="Imię"
                multiline
                variant="filled"
                onChange={(e) => setProgrammerName(e.target.value)}
                sx={{ width: "100%" }}
                inputProps={{ maxLength: 2000 }}
              />
              {requestedNameError && (
                <FormHelperText error={true}>
                  Imię jest wymagane!
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Nazwisko"
                multiline
                variant="filled"
                onChange={(e) => setProgrammerSurname(e.target.value)}
                sx={{ width: "100%" }}
              />
              {requestedSurnameError && (
                <FormHelperText error={true}>
                  Nazwisko jest wymagane!
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="E-mail"
                multiline
                variant="filled"
                onChange={(e) => setProgrammerEmail(e.target.value)}
                sx={{ width: "100%" }}
              />
              {requestedEmailError && (
                <FormHelperText error={true}>
                  Poprawny email jest wymagany!
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="filled"
                label="Wiek"
                onChange={(e) => setProgrammerAge(e.target.value)}
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              />
              {requestedAgeError && (
                <FormHelperText error={true}>
                  Prawidłowy wiek jest wymagany!
                </FormHelperText>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                id="filled-textarea"
                label="Hasło"
                variant="filled"
                type="password"
                onChange={(e) => setProgrammerPassword(e.target.value)}
                sx={{ width: "100%" }}
              />
              {requestedPasswordError && (
                <FormHelperText error={true}>
                  Hasło jest wymagane!
                </FormHelperText>
              )}
            </Grid>
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setOpen(false)}>
          Anuluj
        </Button>
        <Button variant="outlined" onClick={handleSend}>
          {"Dodaj Programiste"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
