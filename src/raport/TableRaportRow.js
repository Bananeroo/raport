import * as React from "react";
import Box from "@mui/material/Box";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import { Grid } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function TableRaportRow(props) {
  const { row, handleOpen, handleOpenDelete } = props;
  const [open, setOpen] = React.useState(false);

  return (
    <React.Fragment>
      <TableRow>
        <TableCell>
          <IconButton size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell>{row.id}</TableCell>
        <TableCell>{row.program.name}</TableCell>
        <TableCell>
          {row.programmer.name + " " + row.programmer.surname}
        </TableCell>
        <TableCell>{row.title}</TableCell>
        <TableCell>{row.date}</TableCell>
        <TableCell>
          <Grid item xs={12}>
            <IconButton
              size="small"
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
              <EditIcon />
            </IconButton>
          </Grid>
          <Grid item xs={12}>
            <IconButton
              size="small"
              onClick={() => handleOpenDelete(row.id, row.title)}
            >
              <DeleteIcon />
            </IconButton>
          </Grid>
        </TableCell>
      </TableRow>
      <TableRow sx={{ "& td": { border: 0 } }}>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={7}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Box sx={{ margin: 1, width: "95%" }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Opis</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>{row.description}</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}
