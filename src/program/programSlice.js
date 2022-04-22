import { createSlice } from "@reduxjs/toolkit";
import fetchGetAllData from "../fetchGetAllData";
import { fetchPost } from "../fetchPost";

export const fetchAllPrograms = () => async (dispatch) => {
  try {
    dispatch(
      fetchAllProgramsSaveList({ listOfPrograms: [], state: "loading" })
    );
    const programs = await fetchGetAllData("program/getAll");
    dispatch(
      fetchAllProgramsSaveList({ listOfPrograms: programs, state: "success" })
    );
  } catch (err) {
    dispatch(fetchAllProgramsSaveList({ listOfPrograms: [], state: "failed" }));
  }
};
export const fetchCreateProgram = (body) => async (dispatch) => {
  try {
    dispatch(
      fetchCreateProgramSaveResponseStatus({
        state: "loading",
      })
    );
    const status = await fetchPost("program/create", body);
    if (status === true) {
      dispatch(
        fetchCreateProgramSaveResponseStatus({
          state: "success",
        })
      );
    } else {
      dispatch(
        fetchCreateProgramSaveResponseStatus({
          state: "failed",
        })
      );
    }
  } catch (err) {
    dispatch(
      fetchCreateProgramSaveResponseStatus({
        state: "failed",
      })
    );
  }
};

const programSlice = createSlice({
  name: "program",
  initialState: {
    list: [],
    status: "idle",
    createStatus: "idle",
  },
  reducers: {
    fetchAllProgramsSaveList: (state, action) => {
      state.list = action.payload.listOfPrograms;
      state.status = action.payload.state;
    },
    fetchCreateProgramSaveResponseStatus: (state, action) => {
      state.createStatus = action.payload.state;
    },
  },
});

export const programSelector = (state) => state.program;
const { fetchAllProgramsSaveList, fetchCreateProgramSaveResponseStatus } =
  programSlice.actions;

export default programSlice.reducer;
