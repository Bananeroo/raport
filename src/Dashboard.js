import * as React from "react";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import MuiDrawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Programmer from "./Programmer";
import Raport from "./Raport";
import Program from "./Program";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { menuListItems } from "./menuListItems";
import Paper from "@mui/material/Paper";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { Grid } from "@mui/material";

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));

const mdTheme = createTheme();

function DashboardContent() {
  const [title, setTitle] = React.useState(null);
  const [open, setOpen] = React.useState(false);

  const [openAddRaportModal, setOpenAddRaportModal] = React.useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <ThemeProvider theme={mdTheme}>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: "24px",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="open drawer"
              onClick={toggleDrawer}
              sx={{
                marginRight: "36px",
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              <Grid container spacing={2}>
                <Grid item xs={9}>
                  {title}
                </Grid>
                <Grid item xs={3}>
                  {title === "Raports" && (
                    <Button
                      onClick={() => setOpenAddRaportModal(true)}
                      color="secondary"
                      variant="contained"
                      startIcon={<AddIcon />}
                    >
                      Dodaj Raport
                    </Button>
                  )}
                </Grid>
              </Grid>
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer variant="permanent" open={open}>
          <Toolbar
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
          <Divider />
          <List component="nav">
            {menuListItems}
            <Divider sx={{ my: 1 }} />
          </List>
        </Drawer>
        <Box
          component="main"
          sx={{
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? theme.palette.grey[100]
                : theme.palette.grey[900],
            flexGrow: 1,
            height: "100vh",
            overflow: "auto",
          }}
        >
          <Toolbar />
          <Container>
            <Paper
              sx={{
                p: 2,
                display: "flex",
                flexDirection: "column",
                height: 800,
              }}
            >
              <Router>
                <Routes>
                  <Route
                    exact
                    path="/programmer"
                    element={<Programmer setHeadTitle={setTitle} />}
                  />
                  <Route
                    exact
                    path="/raport"
                    element={
                      <Raport
                        openAddRaportModal={openAddRaportModal}
                        setOpenAddRaportModal={setOpenAddRaportModal}
                        setHeadTitle={setTitle}
                      />
                    }
                  />
                  <Route
                    exact
                    path="/program"
                    element={<Program setHeadTitle={setTitle} />}
                  />
                </Routes>
              </Router>
            </Paper>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default DashboardContent;