import React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import TablePaginationActions from "./TablePaginationActions.js";

function TableRaport(props) {
  const {
    numberOfRows,
    items,
    handleOpen,
    page,
    setPage,
    rowsPerPage,
    setRowsPerPage,
    setNeedRefresh,
  } = props;

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    setNeedRefresh(true);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
    setNeedRefresh(true);
  };

  TablePaginationActions.propTypes = {};

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
        <TableFooter
          sx={{
            position: "absolute",
            bottom: 0,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[1, 2, 5, 10, 25]}
              count={numberOfRows}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </TableContainer>
  );
}

export default TableRaport;
