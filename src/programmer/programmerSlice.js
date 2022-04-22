import { createSlice } from "@reduxjs/toolkit";
import fetchGetAllData from "../fetchGetAllData";
import { fetchPost } from "../fetchPost";

export const fetchAllProgrammers = () => async (dispatch) => {
  try {
    dispatch(
      fetchAllProgrammersSaveList({ listOfProgrammers: [], state: "loading" })
    );
    const programmers = await fetchGetAllData("programmer/getAll");
    dispatch(
      fetchAllProgrammersSaveList({
        listOfProgrammers: programmers,
        state: "success",
      })
    );
  } catch (err) {
    dispatch(
      fetchAllProgrammersSaveList({ listOfProgrammers: [], state: "failed" })
    );
  }
};
export const fetchCreateProgrammer = (body) => async (dispatch) => {
  try {
    dispatch(
      fetchCreateProgrammerSaveResponseStatus({
        state: "loading",
      })
    );
    const status = await fetchPost("programmer/create", body);
    if (status === true) {
      dispatch(
        fetchCreateProgrammerSaveResponseStatus({
          state: "success",
        })
      );
    } else {
      dispatch(
        fetchCreateProgrammerSaveResponseStatus({
          state: "failed",
        })
      );
    }
  } catch (err) {
    dispatch(
      fetchCreateProgrammerSaveResponseStatus({
        state: "failed",
      })
    );
  }
};
const programmerSlice = createSlice({
  name: "programmer",
  initialState: {
    list: [],
    status: "idle",
    createStatus: "idle",
  },
  reducers: {
    fetchAllProgrammersSaveList: (state, action) => {
      state.list = action.payload.listOfProgrammers;
      state.status = action.payload.state;
    },
    fetchCreateProgrammerSaveResponseStatus: (state, action) => {
      state.createStatus = action.payload.state;
    },
  },
});

export const programmerSelector = (state) => state.programmer;
const { fetchAllProgrammersSaveList, fetchCreateProgrammerSaveResponseStatus } =
  programmerSlice.actions;

export default programmerSlice.reducer;
