import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function TableRaport(props) {
  const { items, handleOpen } = props;

  return (
    <TableContainer>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Id Raportu</TableCell>
            <TableCell>Nazwa Programu</TableCell>
            <TableCell>Programista</TableCell>
            <TableCell>Tytuł</TableCell>
            <TableCell>Opis</TableCell>
            <TableCell>Data</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((row) => (
            <TableRow
              key={row.id}
              sx={{
                "&:nth-of-type(odd)": { backgroundColor: " #BDC3C7" },
                "&:hover": {
                  backgroundColor: "#49bb7b",
                },
              }}
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
                sx={{
                  whiteSpace: "normal",
                  wordWrap: "break-word",
                }}
              >
                {row.description}
              </TableCell>
              <TableCell
                sx={{
                  width: 150,
                }}
              >
                {row.date}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableRaport;
