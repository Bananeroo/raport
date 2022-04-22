import React, { useEffect } from "react";
import ConditionalContentDisplay from "../ConditionalContentDisplay";
import TableProgrammer from "./TableProgrammer";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import ProgrammerAddDialog from "./ProgrammerAddDialog";
import DialogRequestStatus from "../DialogRequestStatus";
import { useSelector, useDispatch } from "react-redux";
import {
  programmerSelector,
  fetchAllProgrammers,
  fetchCreateProgrammer,
} from "./programmerSlice";
function Programmer(props) {
  const { setHeadTitle } = props;

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

  const { status, createStatus } = useSelector(programmerSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (createStatus === "success") {
      setOpen(false);
      handleOpenDialogRequest("Programista dodany");
      setNeedRefresh(true);
    } else if (createStatus === "failed") {
      handleOpenDialogRequest("Nie udało się dodać Programisty");
    }
  }, [createStatus]);

  useEffect(() => {
    if (needRefresh === false) {
      return;
    }
    dispatch(fetchAllProgrammers());
    setNeedRefresh(false);
  }, [dispatch, needRefresh]);

  useEffect(() => {
    setHeadTitle("Programiści");
  }, [setHeadTitle]);

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
    dispatch(fetchCreateProgrammer(body));
  };
  const handleTitleFieldChange = (e) => {
    setTtile(e.target.value);
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
          Dodaj Programiste
        </Button>
      </Grid>

      <TableProgrammer />

      <ProgrammerAddDialog
        title={title}
        open={open}
        setOpen={setOpen}
        handleTitleFieldChange={handleTitleFieldChange}
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

      <DialogRequestStatus
        open={dialogRequestOpen}
        setOpen={setDialogRequestOpen}
        title={dialogRequestTitle}
      />
    </ConditionalContentDisplay>
  );
}

export default Programmer;
