import React from "react";

import Button from "@mui/material/Button";
import { Dialog } from "@mui/material";

import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import { Typography } from "@mui/material";

export default function RaportOperationDialog(props) {
  const { open, handleSendSubmit, handleClose, raport } = props;

  const handleSend = () => {
    handleSendSubmit();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        <Typography>
          Czy na pewno chcesz usunąć raport : {raport.id}. {raport.title}
        </Typography>
      </DialogTitle>

      <DialogActions>
        <Button variant="outlined" onClick={handleClose}>
          Anuluj
        </Button>
        <Button variant="outlined" onClick={handleSend}>
          Usuń Raport
        </Button>
      </DialogActions>
    </Dialog>
  );
}
