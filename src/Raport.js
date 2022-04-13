import React, { useState, useEffect } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

function Raport() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [raport, setRaport] = React.useState(null);
  const [program, setProgram] = React.useState(null);
  const [programmer, setProgrammer] = React.useState(null);

  const [needRefresh, setNeedRefresh] = React.useState(true);

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
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
    setOpen(false);
  };
  const handleTitleFieldChange = (e) => {
    setRaport((raport) => ({
      ...raport,
      title: e.target.value,
    }));
  };
  const handleDescriptionFieldChange = (e) => {
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
  const handleSendSubmit = () => {
    var url = new URL("http://localhost:8080/raport/update");
    var body = {
      ...raport,
      program: program,
      programmer: programmer,
    };

    console.log(body);
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    }).then((response) => {
      if (!response.ok) {
        alert("Nie udało się zmodyfikować Sprawozdania");
      } else {
        alert("Sprawozdanie zmienione");
        setNeedRefresh(true);
        handleClose();
      }
    });
  };
  useEffect(() => {
    if (needRefresh === false) return;

    fetch("http://localhost:8080/raport/getAll")
      .then((res) => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setItems(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
    setNeedRefresh(false);
  }, [needRefresh]);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table
            sx={{ minWidth: 650, maxHeight: 1000 }}
            aria-label="simple table"
          >
            <TableHead>
              <TableRow key={0}>
                <TableCell>Id Raportu</TableCell>
                <TableCell>Nazwa Programu</TableCell>
                <TableCell>Programista</TableCell>
                <TableCell>Tytuł</TableCell>
                <TableCell sx={{ minWidth: "500px" }}>Opis</TableCell>
                <TableCell sx={{ minWidth: "80px" }}>Data</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() =>
                    handleOpen(
                      row.id,
                      row.program,
                      row.programmer,
                      row.title,
                      row.description,
                      row.date
                    )
                  }
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.program.name}</TableCell>
                  <TableCell>
                    {row.programmer.name + " " + row.programmer.surname}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell
                    style={{
                      width: 200,
                      whiteSpace: "normal",
                      wordWrap: "break-word",
                    }}
                  >
                    {row.description}
                  </TableCell>
                  <TableCell>{row.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {open === true && (
          <div>
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="parent-modal-title"
              aria-describedby="parent-modal-description"
            >
              <Box sx={{ ...style, width: 1000 }}>
                <TextField
                  id="filled-textarea"
                  label="Tytuł Sprawozdania"
                  multiline
                  variant="filled"
                  style={{ width: 500 }}
                  onChange={handleTitleFieldChange}
                  defaultValue={raport.title}
                />
                <TextField
                  id="filled-textarea"
                  label="Opis"
                  multiline
                  defaultValue={raport.description}
                  variant="filled"
                  style={{ width: 1000 }}
                  onChange={handleDescriptionFieldChange}
                />
                <TextField
                  id="date"
                  label="Data Wykonania"
                  type="date"
                  defaultValue={raport.date}
                  sx={{ float: "left", width: 220, bottom: -10 }}
                  onChange={handleDateChange}
                />
                <Button style={{ float: "right" }} onClick={handleSendSubmit}>
                  Edytuj Sprawozdanie
                </Button>
              </Box>
            </Modal>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Raport;
