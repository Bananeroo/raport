import React, { useState, useEffect } from "react";
import customElseIf from "./customElseIf";
import ModalWindow from "./ModalWindow";
import TableRaport from "./TableRaport";
import fetchGetAllData from "./fetchGetAllData";
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
    setOpen(false);
  };

  const handleTitleFieldChange = (e) => {
    setRaport((raport) => ({
      ...raport,
      title: e.target.value,
    }));
  };
  const handleTextFieldChange = (e) => {
    setRaport((raport) => ({
      ...raport,
      description: e.target.value,
    }));
  };
  const handleDateChange = (e) => {
    setRaport((raport) => ({
      ...raport,
      date: e.target.value,
    }));
  };
  const handleSendSubmitModify = async (e) => {
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
        alert("Sprawozdanie zaktualizowane");
        setOpen(false);
        setNeedRefresh(true);
      } else {
        alert("Nie udało się zaktualizować Sprawozdania");
      }
    } catch (error) {
      alert("Nie udało się zaktualizować Sprawozdania");
    }
  };
  const handleSendSubmitCreate = async () => {
    const url = new URL("http://localhost:8080/raport/create");

    var title = "Nowe Sprawozdanie";
    var description = "Opis Sprawozdania";
    var date = currentDate;
    if (raport !== null) {
      title = raport.title;
      description = raport.description;
      date = raport.date;
    }
    const body = {
      title: title,
      description: description,
      date: date,
      programmerId: 1,
      programId: programId,
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
        alert("Sprawozdanie dodane");
        setOpenAddRaportModal(false);
        setNeedRefresh(true);
      } else {
        alert("Nie udało się dodać Sprawozdania");
      }
    } catch (error) {
      alert("Nie udało się dodać Sprawozdania");
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
            <ModalWindow
              handleClose={handleClose}
              handleTitleFieldChange={handleTitleFieldChange}
              title={raport.title}
              handleTextFieldChange={handleTextFieldChange}
              date={raport.date}
              handleDateChange={handleDateChange}
              handleSendSubmit={handleSendSubmitModify}
              description={raport.description}
              buttonText="Edytuj Sprawozdanie"
            ></ModalWindow>
          )}

          {openAddRaportModal === true && (
            <ModalWindow
              handleClose={() => setOpenAddRaportModal(false)}
              handleTitleFieldChange={handleTitleFieldChange}
              title={"Nowe Sprawozdanie"}
              handleTextFieldChange={handleTextFieldChange}
              date={currentDate}
              handleDateChange={handleDateChange}
              handleSendSubmit={handleSendSubmitCreate}
              description={"Opis Sprawozdania"}
              buttonText="Dodaj Sprawozdanie"
              setProgramId={setProgramId}
              needlistOfPrograms={true}
            ></ModalWindow>
          )}
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Raport;
