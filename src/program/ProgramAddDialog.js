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

export default function ProgramAddDialog(props) {
  const { handleSendSubmit, handleClose, title, handleTitleFieldChange } =
    props;

  const [requestedTitleError, setRequestedTitleError] = React.useState(false);

  const isEmptyOrSpaces = (str) => {
    return str === null || str.match(/^ *$/) !== null;
  };

  const handleSend = () => {
    if (isEmptyOrSpaces(title)) {
      setRequestedTitleError(true);
      return;
    }
    setRequestedTitleError(false);

    handleSendSubmit();
  };

  return (
    <Dialog open={true} onClose={handleClose}>
      <DialogTitle>{"Dodawanie Programu"}</DialogTitle>
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
          <Grid item xs={12}>
            <TextField
              id="filled-textarea"
              label="Nazwa Programu"
              multiline
              variant="filled"
              onChange={handleTitleFieldChange}
              sx={{ width: "100%" }}
              defaultValue={title}
            />
            {requestedTitleError && (
              <FormHelperText error={true}>Nazwa jest wymagana!</FormHelperText>
            )}
          </Grid>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="outlined" onClick={handleSend}>
          {"Dodaj Program"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
