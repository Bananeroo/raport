import React, { useState, useEffect } from "react";
import customElseIf from "./customElseIf";
import TableProgrammer from "./TableProgrammer";
import fetchGetAllData from "./fetchGetAllData";

function Programmer(props) {
  const { setHeadTitle } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  // Note: the empty deps array [] means
  // this useEffect will run once
  // similar to componentDidMount()
  useEffect(() => {
    fetchGetAllData("programmer/getAll", setIsLoaded, setItems, setError);
    setHeadTitle("Programmers");
  }, [setHeadTitle]);

  return (
    <React.Fragment>
      {customElseIf(error, isLoaded, <TableProgrammer items={items} />)}
    </React.Fragment>
  );
}

export default Programmer;
