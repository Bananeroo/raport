import { configureStore } from "@reduxjs/toolkit";
import programReducer from "./program/programSlice";
import programmerReducer from "./programmer/programmerSlice";
import raportReducer from "./raport/raportSlice";

export const store = configureStore({
  reducer: {
    program: programReducer,
    programmer: programmerReducer,
    raport: raportReducer,
  },
});
