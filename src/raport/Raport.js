import React, { useState, useEffect } from "react";

import TableRaport from "./TableRaport";
import fetchGetAllData from "../fetchGetAllData";
import DialogRequestStatus from "../DialogRequestStatus";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";
import CustomElseIf from "../ConditionalContentDisplay";
import RaportOperationDialog from "./RaportOperationDialog";
import fetchPost from "../fetchPost";
function Raport(props) {
  const { setHeadTitle } = props;

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);
  const [open, setOpen] = React.useState(false);

  const [raport, setRaport] = React.useState(null);
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

  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const [openAddRaportModal, setOpenAddRaportModal] = React.useState(false);

  const [numberOfRows, setNumberOfRows] = React.useState(0);

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
  const handleClose = () => {
    setRaport(null);
    resetNewRaportValue();
    setOpen(false);
    setOpenAddRaportModal(false);
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
    const success = await fetchPost("raport/update", body);

    if (success) {
      setOpen(false);
      handleOpenDialogRequest("Raport zmodyfikowany pomyślnie");
      resetNewRaportValue();

      setNeedRefresh(true);
    } else {
      handleOpenDialogRequest("Nie udało się zmodyfikować raportu");
    }
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
    const success = await fetchPost("raport/create", body);

    if (success) {
      setOpenAddRaportModal(false);
      handleOpenDialogRequest("Nowy raport dodany");
      resetNewRaportValue();
      setNeedRefresh(true);
    } else {
      handleOpenDialogRequest("Nie udało się dodać raportu");
    }
  };

  useEffect(() => {
    if (needRefresh === false) return;
    fetchGetAllData(
      "raport/getAllPageable?page=" + page + "&size=" + rowsPerPage,
      setIsLoaded,
      setItems,
      setError
    );
    fetchGetAllData(
      "raport/getNumberOfRows",
      setIsLoaded,
      setNumberOfRows,
      setError
    );

    setHeadTitle("Raporty");
    setNeedRefresh(false);
  }, [needRefresh, setHeadTitle, page, rowsPerPage]);
  return (
    <CustomElseIf
      error={error}
      isLoaded={isLoaded}
      content={
        <React.Fragment>
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
            numberOfRows={numberOfRows}
            items={items}
            handleOpen={handleOpen}
            page={page}
            setPage={setPage}
            rowsPerPage={rowsPerPage}
            setRowsPerPage={setRowsPerPage}
            setNeedRefresh={setNeedRefresh}
          />
          {open === true && (
            <RaportOperationDialog
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
          )}

          {openAddRaportModal === true && (
            <RaportOperationDialog
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

export default Raport;
