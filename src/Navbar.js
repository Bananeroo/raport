import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PeopleIcon from "@mui/icons-material/People";
import BarChartIcon from "@mui/icons-material/BarChart";
import ListItem from "@mui/material/ListItem";
import TerminalIcon from "@mui/icons-material/Terminal";
import React from "react";

export default function Navbar() {
  return (
    <React.Fragment>
      <ListItemButton component="a" href="/program">
        <ListItemIcon>
          <TerminalIcon />
        </ListItemIcon>
        <ListItem>
          <ListItemText primary="Programy" />
        </ListItem>
      </ListItemButton>
      <ListItemButton component="a" href="/programmer">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItem>
          <ListItemText primary="Programiści" />
        </ListItem>
      </ListItemButton>
      <ListItemButton component="a" href="/">
        <ListItemIcon>
          <BarChartIcon />
        </ListItemIcon>
        <ListItem>
          <ListItemText primary="Raporty" />
        </ListItem>
      </ListItemButton>
    </React.Fragment>
  );
}
