import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./Navbar";
import Programmer from "./Programmer";
import Raport from "./Raport";
import Program from "./Program";

function App() {
  return (
    <React.Fragment>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/programmer" element={<Programmer />} />
          <Route exact path="/raport" element={<Raport />} />
          <Route exact path="/program" element={<Program />} />
        </Routes>
      </Router>
    </React.Fragment>
  );
}

export default App;
