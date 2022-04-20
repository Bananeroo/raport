import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

function TableProgrammer(props) {
  const { items } = props;

  return (
    <React.Fragment>
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id Programisty</TableCell>
              <TableCell>Imię i Nazwisko</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Wiek</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {items.map((row) => (
              <TableRow
                key={row.id}
                sx={{
                  "&:nth-of-type(odd)": { backgroundColor: " #BDC3C7" },
                }}
              >
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name + " " + row.surname}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </React.Fragment>
  );
}

export default TableProgrammer;
