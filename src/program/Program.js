import React, { useState, useEffect } from "react";
import TableProgram from "./TableProgram";
import ConditionalContentDisplay from "../ConditionalContentDisplay";
import fetchGetAllData from "../fetchGetAllData";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import ProgramAddDialog from "./ProgramAddDialog";
import DialogRequestStatus from "../DialogRequestStatus";
import fetchPost from "../fetchPost";

function Program(props) {
  const { setHeadTitle } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState("");

  const [dialogRequestOpen, setDialogRequestOpen] = React.useState(false);
  const [dialogRequestTitle, setDialogRequestTitle] = React.useState("");

  const [needRefresh, setNeedRefresh] = React.useState(true);

  useEffect(() => {
    if (needRefresh === false) {
      return;
    }
    fetchGetAllData("program/getAll", setIsLoaded, setItems, setError);
    setHeadTitle("Programy");

    setNeedRefresh(false);
  }, [setHeadTitle, needRefresh]);

  const handleOpenDialogRequest = (title) => {
    setDialogRequestTitle(title);
    setDialogRequestOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSendSubmit = async () => {
    var body = {
      name: title,
    };
    const success = await fetchPost("program/create", body);

    if (success) {
      setOpen(false);
      handleOpenDialogRequest("Program dodany");
      setNeedRefresh(true);
      setTitle("");
    } else {
      handleOpenDialogRequest("Nie udało się dodać programu");
    }
  };

  const handleTitleFieldChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <ConditionalContentDisplay
      error={error}
      isLoaded={isLoaded}
      content={
        <React.Fragment>
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

          <TableProgram items={items} />

          {open === true && (
            <ProgramAddDialog
              title={title}
              handleTitleFieldChange={handleTitleFieldChange}
              handleClose={handleClose}
              handleSendSubmit={handleSendSubmit}
            />
          )}
          {dialogRequestOpen === true && (
            <DialogRequestStatus
              open={dialogRequestOpen}
              setOpen={setDialogRequestOpen}
              title={dialogRequestTitle}
            />
          )}
        </React.Fragment>
      }
    />
  );
}

export default Program;
