import React, { useState, useEffect } from "react";
import TableProgram from "./TableProgram";
import customElseIf from "./customElseIf";
import fetchGetAllData from "./fetchGetAllData";

function Program(props) {
  const { setHeadTitle } = props;
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetchGetAllData("program/getAll", setIsLoaded, setItems, setError);
    setHeadTitle("Programs");
  }, [setHeadTitle]);

  return (
    <React.Fragment>
      {customElseIf(
        error,
        isLoaded,
        <React.Fragment>
          <TableProgram items={items} />
        </React.Fragment>
      )}
    </React.Fragment>
  );
}

export default Program;
