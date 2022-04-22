import React, { useEffect } from "react";

import TableRaport from "./TableRaport";
import DialogRequestStatus from "../DialogRequestStatus";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import ConditionalContentDisplay from "../ConditionalContentDisplay";
import RaportOperationDialog from "./RaportOperationDialog";
import { useSelector, useDispatch } from "react-redux";
import {
  raportSelector,
  fetchAllRaport,
  fetchCreateRaport,
  fetchModifyRaport,
  fetchDeleteRaport,
} from "./raportSlice";
import RaportDeleteDialog from "./RaportDeleteDialog";

function Raport(props) {
  const { setHeadTitle } = props;

  const [open, setOpen] = React.useState(false);
  const [openDelete, setOpenDelete] = React.useState(false);

  const [raport, setRaport] = React.useState({
    id: 0,
    title: "title",
    description: "description",
    date: "date",
  });
  const [program, setProgram] = React.useState(null);
  const [programmer, setProgrammer] = React.useState(null);

  const [programId, setProgramId] = React.useState(null);

  const [needRefresh, setNeedRefresh] = React.useState(true);

  const currentDate = new Date().toLocaleDateString("en-CA");
  const [dialogRequestOpen, setDialogRequestOpen] = React.useState(false);
  const [dialogRequestTitle, setDialogRequestTitle] = React.useState("");

  const [date, setDate] = React.useState(currentDate);
  const [description, setDescription] = React.useState("Opis Sprawozdania");
  const [title, setTitle] = React.useState("Nowe Sprawozdanie");

  const [openAddRaportModal, setOpenAddRaportModal] = React.useState(false);

  const { createStatus, modifyStatus, status, deleteStatus } =
    useSelector(raportSelector);
  const dispatch = useDispatch();

  useEffect(() => {
    if (createStatus === "success") {
      setOpenAddRaportModal(false);
      handleOpenDialogRequest("Nowy raport dodany");
      resetNewRaportValue();
      setNeedRefresh(true);
    } else if (createStatus === "failed") {
      handleOpenDialogRequest("Nie udało się dodać raportu");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createStatus]);

  useEffect(() => {
    if (modifyStatus === "success") {
      setOpen(false);
      handleOpenDialogRequest("Raport zmodyfikowany pomyślnie");
      resetNewRaportValue();
      setNeedRefresh(true);
    } else if (modifyStatus === "failed") {
      handleOpenDialogRequest("Nie udało się zmodyfikować raportu");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [modifyStatus]);

  useEffect(() => {
    if (deleteStatus === "success") {
      setOpenDelete(false);
      handleOpenDialogRequest("Raport usunięty pomyślnie");
      resetNewRaportValue();
      setNeedRefresh(true);
    } else if (deleteStatus === "failed") {
      handleOpenDialogRequest("Nie udało się usunąć raportu");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deleteStatus]);

  useEffect(() => {
    if (needRefresh === false) {
      return;
    }
    dispatch(fetchAllRaport());
    setNeedRefresh(false);
  }, [dispatch, needRefresh]);

  const handleOpenDialogRequest = (title) => {
    setDialogRequestTitle(title);
    setDialogRequestOpen(true);
  };

  const resetNewRaportValue = () => {
    setTitle("Nowe Sprawozdanie");
    setDescription("Opis Sprawozdania");
    setDate(currentDate);
  };

  const handleOpen = (id, program, programmer, title, description, date) => {
    const raport = {
      id: id,
      title: title,
      description: description,
      date: date,
    };
    setRaport(raport);
    setProgram(program);
    setProgrammer(programmer);
    setOpen(true);
  };

  const handleOpenDelete = (id, title) => {
    const raport = {
      id: id,
      title: title,
    };
    setRaport(raport);
    setOpenDelete(true);
  };

  const handleClose = () => {
    setRaport({
      id: 0,
      title: "title",
      description: "description",
      date: "date",
    });
    resetNewRaportValue();
    setOpen(false);
    setOpenAddRaportModal(false);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleTitleFieldChange = (e) => {
    setTitle(e.target.value);
    setRaport((raport) => ({
      ...raport,
      title: e.target.value,
    }));
  };
  const handleTextFieldChange = (e) => {
    setDescription(e.target.value);
    setRaport((raport) => ({
      ...raport,
      description: e.target.value,
    }));
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
    setRaport((raport) => ({
      ...raport,
      date: e.target.value,
    }));
  };
  const handleSendSubmitModify = async () => {
    const body = {
      ...raport,
      program: program,
      programmer: programmer,
    };
    dispatch(fetchModifyRaport(body));
  };
  const handleSendSubmitCreate = async () => {
    const body = {
      title: title,
      description: description,
      date: date,
      programmerId: 1,
      programId: programId,
    };
    setProgramId(null);
    dispatch(fetchCreateRaport(body));
  };
  const handleSendSubmitDelete = async () => {
    const body = {
      id: raport.id,
    };
    console.log(raport.id);
    dispatch(fetchDeleteRaport(body, raport.id));
  };

  useEffect(() => {
    setHeadTitle("Raporty");
  }, [setHeadTitle]);
  return (
    <ConditionalContentDisplay status={status}>
      <Grid item xs={12} display="flex" justifyContent="right">
        <Button
          onClick={() => setOpenAddRaportModal(true)}
          color="secondary"
          variant="contained"
          startIcon={<AddIcon />}
        >
          Dodaj Raport
        </Button>
      </Grid>

      <TableRaport
        handleOpen={handleOpen}
        handleOpenDelete={handleOpenDelete}
      />

      <RaportOperationDialog
        open={open}
        dialogTitle="Edytowanie Raportu"
        handleClose={handleClose}
        handleTitleFieldChange={handleTitleFieldChange}
        title={raport.title}
        handleTextFieldChange={handleTextFieldChange}
        date={raport.date}
        handleDateChange={handleDateChange}
        handleSendSubmit={handleSendSubmitModify}
        description={raport.description}
        buttonText="Edytuj Sprawozdanie"
      />

      <RaportOperationDialog
        open={openAddRaportModal}
        dialogTitle="Dodawanie Nowego Raportu"
        handleClose={handleClose}
        handleTitleFieldChange={handleTitleFieldChange}
        title={title}
        handleTextFieldChange={handleTextFieldChange}
        date={date}
        handleDateChange={handleDateChange}
        handleSendSubmit={handleSendSubmitCreate}
        description={description}
        buttonText="Dodaj Sprawozdanie"
        setProgramId={setProgramId}
        needlistOfPrograms={true}
      />
      <RaportDeleteDialog
        open={openDelete}
        raport={raport}
        handleSendSubmit={handleSendSubmitDelete}
        handleClose={handleCloseDelete}
      ></RaportDeleteDialog>

      <DialogRequestStatus
        open={dialogRequestOpen}
        setOpen={setDialogRequestOpen}
        title={dialogRequestTitle}
      />
    </ConditionalContentDisplay>
  );
}

export default Raport;
