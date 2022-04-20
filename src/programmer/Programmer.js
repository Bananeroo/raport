import React, { useState, useEffect } from "react";
import ConditionalContentDisplay from "../ConditionalContentDisplay";
import TableProgrammer from "./TableProgrammer";
import fetchGetAllData from "../fetchGetAllData";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import ProgrammerAddDialog from "./ProgrammerAddDialog";
import DialogRequestStatus from "../DialogRequestStatus";
import fetchPost from "../fetchPost";

function Programmer(props) {
  const { setHeadTitle } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [title, setTtile] = React.useState("Nowy Program");

  const [dialogRequestOpen, setDialogRequestOpen] = React.useState(false);
  const [dialogRequestTitle, setDialogRequestTitle] = React.useState("");
  const [needRefresh, setNeedRefresh] = React.useState(true);

  const [programmerName, setProgrammerName] = React.useState("");
  const [programmerSurname, setProgrammerSurname] = React.useState("");
  const [programmerEmail, setProgrammerEmail] = React.useState("");
  const [programmerAge, setProgrammerAge] = React.useState(0);
  const [programmerPassword, setProgrammerPassword] = React.useState("");

  useEffect(() => {
    if (needRefresh === false) {
      return;
    }
    fetchGetAllData("programmer/getAll", setIsLoaded, setItems, setError);
    setHeadTitle("Programiści");
    setNeedRefresh(false);
  }, [setHeadTitle, needRefresh]);
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpenDialogRequest = (title) => {
    setDialogRequestTitle(title);
    setDialogRequestOpen(true);
  };

  const handleSendSubmit = async () => {
    var body = {
      name: programmerName,
      surname: programmerSurname,
      email: programmerEmail,
      age: programmerAge,
      password: programmerPassword,
    };
    const success = await fetchPost("programmer/create", body);

    if (success) {
      setOpen(false);
      handleOpenDialogRequest("Programista dodany");
      setNeedRefresh(true);
    } else {
      handleOpenDialogRequest("Nie udało się dodać Programisty");
    }
  };
  const handleTitleFieldChange = (e) => {
    setTtile(e.target.value);
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
              Dodaj Programiste
            </Button>
          </Grid>

          <TableProgrammer items={items} />
          {open === true && (
            <ProgrammerAddDialog
              title={title}
              handleTitleFieldChange={handleTitleFieldChange}
              handleClose={handleClose}
              handleSendSubmit={handleSendSubmit}
              programmerName={programmerName}
              setProgrammerName={setProgrammerName}
              programmerSurname={programmerSurname}
              setProgrammerSurname={setProgrammerSurname}
              programmerEmail={programmerEmail}
              setProgrammerEmail={setProgrammerEmail}
              programmerAge={programmerAge}
              setProgrammerAge={setProgrammerAge}
              programmerPassword={programmerPassword}
              setProgrammerPassword={setProgrammerPassword}
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

export default Programmer;
