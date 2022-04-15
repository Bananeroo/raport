import React, { useEffect } from "react";

import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { Grid } from "@mui/material";
import Select from "react-select";
import customElseIf from "./customElseIf";
import fetchGetAllData from "./fetchGetAllData";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "75%",
  height: "60%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  overflow: "scroll",

  pt: 2,
  px: 4,
  pb: 3,
};

function ModalWindow(props) {
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
  } = props;

  const [selectedProgram, setSelectedProgram] = React.useState(null);

  const [programListError, setProgramListError] = React.useState(null);
  const [programListIsLoaded, setProgramListIsLoaded] = React.useState(false);
  const [programList, setProgramList] = React.useState([]);

  const changeSelectedProgram = (e) => {
    setSelectedProgram({ value: e.value, label: e.label });
    setProgramId(e.value);
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
    <Modal
      open={true}
      onClose={handleClose}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box sx={{ ...style }}>
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
          </Grid>
          <Grid item xs={9}>
            <TextField
              id="date"
              label="Data Wykonania"
              type="date"
              defaultValue={date}
              onChange={handleDateChange}
            />
          </Grid>

          <Grid item xs={9}>
            {needlistOfPrograms === true
              ? customElseIf(
                  programListError,
                  programListIsLoaded,
                  <Select
                    label="Program"
                    value={selectedProgram}
                    onChange={changeSelectedProgram}
                    options={option}
                  />
                )
              : null}
          </Grid>

          <Grid item xs={3}>
            <Button sx={{ float: "right" }} onClick={handleSendSubmit}>
              {buttonText}
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
}

export default ModalWindow;
