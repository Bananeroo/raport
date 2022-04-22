import React, { useEffect } from "react";
import TableProgram from "./TableProgram";
import ConditionalContentDisplay from "../ConditionalContentDisplay";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import ProgramAddDialog from "./ProgramAddDialog";
import DialogRequestStatus from "../DialogRequestStatus";

import { useSelector, useDispatch } from "react-redux";
import {
  programSelector,
  fetchAllPrograms,
  fetchCreateProgram,
} from "./programSlice";

function Program(props) {
  const { setHeadTitle } = props;
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [dialogRequestOpen, setDialogRequestOpen] = React.useState(false);
  const [dialogRequestTitle, setDialogRequestTitle] = React.useState("");
  const [needRefresh, setNeedRefresh] = React.useState(true);

  const { status, createStatus } = useSelector(programSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (needRefresh === false) {
      return;
    }
    dispatch(fetchAllPrograms());
    setNeedRefresh(false);
  }, [dispatch, needRefresh]);

  useEffect(() => {
    if (createStatus === "success") {
      setOpen(false);
      handleOpenDialogRequest("Program dodany");
      setNeedRefresh(true);
      setTitle("");
    } else if (createStatus === "failed") {
      handleOpenDialogRequest("Nie udało się dodać programu");
    }
  }, [createStatus]);

  useEffect(() => {
    setHeadTitle("Programy");
  }, [setHeadTitle]);

  const handleOpenDialogRequest = (title) => {
    setDialogRequestTitle(title);
    setDialogRequestOpen(true);
  };

  const handleSendSubmit = async () => {
    var body = {
      name: title,
    };
    dispatch(fetchCreateProgram(body));
  };

  const handleTitleFieldChange = (e) => {
    setTitle(e.target.value);
  };

  const handleClose = () => {
    setTitle("");
    setOpen(false);
  };

  return (
    <ConditionalContentDisplay status={status}>
      <Grid item xs={12} display="flex" justifyContent="right">
        <Button
          onClick={() => setOpen(true)}
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Dodaj Program
        </Button>
      </Grid>

      <TableProgram />

      <ProgramAddDialog
        open={open}
        title={title}
        handleClose={handleClose}
        handleTitleFieldChange={handleTitleFieldChange}
        handleSendSubmit={handleSendSubmit}
      />

      <DialogRequestStatus
        open={dialogRequestOpen}
        setOpen={setDialogRequestOpen}
        title={dialogRequestTitle}
      />
    </ConditionalContentDisplay>
  );
}

export default Program;
