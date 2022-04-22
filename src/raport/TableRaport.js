import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useSelector } from "react-redux";
import { raportSelector } from "./raportSlice";
import TableRaportRow from "./TableRaportRow";
function TableRaport(props) {
  const { handleOpen, handleOpenDelete } = props;
  const { list } = useSelector(raportSelector);
  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Id Raportu</TableCell>
            <TableCell>Nazwa Programu</TableCell>
            <TableCell>Programista</TableCell>
            <TableCell>Tytuł</TableCell>
            <TableCell>Data</TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {list.map((row) => (
            <TableRaportRow
              key={row.id}
              row={row}
              handleOpen={handleOpen}
              handleOpenDelete={handleOpenDelete}
            />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TableRaport;
