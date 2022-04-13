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

function Program() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  const [open, setOpen] = React.useState(false);
  const [idProgram, setIdProgram] = React.useState(0);
  const [description, setDescription] = React.useState("");
  const [date, setDate] = React.useState(null);
  const [title, setTitle] = React.useState("");

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
  const handleOpen = (e) => {
    setOpen(true);
    setIdProgram(e);
    setTitle("Sprawozdanie z programu numer: " + e);
    setDescription("Opis");
    setDate("2022-04-08");
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleTextFieldChange = (e) => {
    setDescription(e.target.value);
  };
  const handleTitleFieldChange = (e) => {
    setTitle(e.target.value);
  };
  const handleDateChange = (e) => {
    setDate(e.target.value);
  };
  const handleSendSubmit = () => {
    var url = new URL("http://localhost:8080/raport/create");
    var raport = {
      id: 1,
      title: title,
      description: description,
      date: date,
      programmerId: 1,
      programId: idProgram,
    };

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(raport),
    }).then((response) => {
      if (!response.ok) {
        alert("Nie udało się dodać Sprawozdania");
      } else {
        alert("Sprawozdanie dodane");
        handleClose();
      }
    });
  };

  useEffect(() => {
    fetch("http://localhost:8080/program/getAll")
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
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <React.Fragment>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow key={0}>
                <TableCell>Id Programisty</TableCell>
                <TableCell>Nazwa Programu</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((row) => (
                <TableRow
                  key={row.id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  onClick={() => handleOpen(row.id)}
                >
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.name}</TableCell>
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
                  defaultValue={title}
                />
                <TextField
                  id="filled-textarea"
                  label="Opis"
                  multiline
                  variant="filled"
                  style={{ width: 1000 }}
                  onChange={handleTextFieldChange}
                />
                <TextField
                  id="date"
                  label="Data Wykonania"
                  type="date"
                  defaultValue="2022-04-08"
                  sx={{ float: "left", width: 220, bottom: -10 }}
                  onChange={handleDateChange}
                />
                <Button style={{ float: "right" }} onClick={handleSendSubmit}>
                  Wyślij Sprawozdanie
                </Button>
              </Box>
            </Modal>
          </div>
        )}
      </React.Fragment>
    );
  }
}

export default Program;
