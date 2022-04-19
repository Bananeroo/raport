import React, { useState, useEffect } from "react";
import customElseIf from "./customElseIf";
import DialogWindow from "./DialogWindow";
import TableRaport from "./TableRaport";
import fetchGetAllData from "./fetchGetAllData";
import DialogRequestStatus from "./DialogRequestStatus";
function Raport(props) {
  const { setHeadTitle, openAddRaportModal, setOpenAddRaportModal } = props;

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
    var url = new URL("http://localhost:8080/raport/update");
    var body = {
      ...raport,
      program: program,
      programmer: programmer,
    };
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        setOpen(false);
        handleOpenDialogRequest("Raport zmodyfikowany pomyślnie");
        resetNewRaportValue();

        setNeedRefresh(true);
      } else {
        handleOpenDialogRequest("Nie udało się zmodyfikować raportu");
      }
    } catch (error) {
      handleOpenDialogRequest("Nie udało się zmodyfikować raportu");
    }
  };
  const handleSendSubmitCreate = async () => {
    const url = new URL("http://localhost:8080/raport/create");

    const body = {
      title: title,
      description: description,
      date: date,
      programmerId: 1,
      programId: programId,
    };
    setProgramId(null);
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (response.ok) {
        setOpenAddRaportModal(false);
        handleOpenDialogRequest("Nowy raport dodany");
        resetNewRaportValue();
        setNeedRefresh(true);
      } else {
        handleOpenDialogRequest("Nie udało się dodać raportu");
      }
    } catch (error) {
      handleOpenDialogRequest("Nie udało się dodać raportu");
    }
  };

  useEffect(() => {
    if (needRefresh === false) return;
    fetchGetAllData("raport/getAll", setIsLoaded, setItems, setError);

    setHeadTitle("Raports");
    setNeedRefresh(false);
  }, [needRefresh, setHeadTitle]);

  return (
    <React.Fragment>
      {customElseIf(
        error,
        isLoaded,
        <React.Fragment>
          <TableRaport items={items} handleOpen={handleOpen} />
          {open === true && (
            <DialogWindow
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
            ></DialogWindow>
          )}

          {openAddRaportModal === true && (
            <DialogWindow
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
            ></DialogWindow>
          )}
          {dialogRequestOpen === true && (
            <DialogRequestStatus
              open={dialogRequestOpen}
              setOpen={setDialogRequestOpen}
              title={dialogRequestTitle}
            ></DialogRequestStatus>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Raport;
