import { createSlice } from "@reduxjs/toolkit";
import fetchGetAllData from "../fetchGetAllData";
import { fetchPost, fetchDelete } from "../fetchPost";
export const fetchAllRaport = () => async (dispatch) => {
  try {
    dispatch(fetchAllRaportsSaveList({ listOfRaport: [], state: "loading" }));
    const raports = await fetchGetAllData("raport/getAll");
    dispatch(
      fetchAllRaportsSaveList({
        listOfRaport: raports,
        state: "success",
      })
    );
  } catch (err) {
    dispatch(fetchAllRaportsSaveList({ listOfRaport: [], state: "failed" }));
  }
};
export const fetchCreateRaport = (body) => async (dispatch) => {
  try {
    dispatch(
      fetchCreateRaportSaveResponseStatus({
        state: "loading",
      })
    );
    const status = await fetchPost("raport/create", body);
    if (status === true) {
      dispatch(
        fetchCreateRaportSaveResponseStatus({
          state: "success",
        })
      );
    } else {
      dispatch(
        fetchCreateRaportSaveResponseStatus({
          state: "failed",
        })
      );
    }
  } catch (err) {
    dispatch(
      fetchCreateRaportSaveResponseStatus({
        state: "failed",
      })
    );
  }
};
export const fetchModifyRaport = (body) => async (dispatch) => {
  try {
    dispatch(
      fetchModifyRaportSaveResponseStatus({
        state: "loading",
      })
    );
    const status = await fetchPost("raport/update", body);
    if (status === true) {
      dispatch(
        fetchModifyRaportSaveResponseStatus({
          state: "success",
        })
      );
    } else {
      dispatch(
        fetchModifyRaportSaveResponseStatus({
          state: "failed",
        })
      );
    }
  } catch (err) {
    dispatch(
      fetchModifyRaportSaveResponseStatus({
        state: "failed",
      })
    );
  }
};

export const fetchDeleteRaport = (body, id) => async (dispatch) => {
  try {
    dispatch(
      fetchDeleteRaportSaveResponseStatus({
        state: "loading",
      })
    );
    const status = await fetchDelete("raport/delete?id=" + id, body);
    if (status === true) {
      dispatch(
        fetchDeleteRaportSaveResponseStatus({
          state: "success",
        })
      );
    } else {
      dispatch(
        fetchDeleteRaportSaveResponseStatus({
          state: "failed",
        })
      );
    }
  } catch (err) {
    dispatch(
      fetchDeleteRaportSaveResponseStatus({
        state: "failed",
      })
    );
  }
};

const raportSlice = createSlice({
  name: "raport",
  initialState: {
    list: [],
    status: "idle",
    createStatus: "idle",
    modifyStatus: "idle",
    deleteStatus: "idle",
  },
  reducers: {
    fetchAllRaportsSaveList: (state, action) => {
      state.list = action.payload.listOfRaport;
      state.status = action.payload.state;
    },
    fetchCreateRaportSaveResponseStatus: (state, action) => {
      state.createStatus = action.payload.state;
    },
    fetchModifyRaportSaveResponseStatus: (state, action) => {
      state.modifyStatus = action.payload.state;
    },
    fetchDeleteRaportSaveResponseStatus: (state, action) => {
      state.deleteStatus = action.payload.state;
    },
  },
});

export const raportSelector = (state) => state.raport;
const {
  fetchAllRaportsSaveList,
  fetchCreateRaportSaveResponseStatus,
  fetchModifyRaportSaveResponseStatus,
  fetchDeleteRaportSaveResponseStatus,
} = raportSlice.actions;

export default raportSlice.reducer;
