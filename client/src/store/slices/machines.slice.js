import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchMachineDetail, fetchMachines } from "../../services/machines";

/**
 * 获取machine详情 Action
 */
export const fetchDetailAction = createAsyncThunk(
  "machines/fetchDetail",
  async (id) => {
    let data = await fetchMachineDetail(id);

    return data;
  }
);

/**
 * 获取machines列表 Action
 */
export const fetchListlAction = createAsyncThunk(
  "machines/fetchList",
  async (id) => {
    let data = await fetchMachines();

    return data;
  }
);

/**
 * machine slice
 */
const machinesSlice = createSlice({
  name: "machines",
  initialState: {
    detail: null,
    list: [],
  },
  reducers: {
    /**
     * 修改state.detail
     * @param {*} state
     * @param {*} action
     */
    updateDetail(state, action) {
      const { machine_id, status, timestamp } = action.payload;
      if (state.detail && state.detail.id === machine_id) {
        state.detail.status = status;
        state.detail.events.unshift({ status, timestamp });
      }
    },
    /**
     * 修改state.list
     * @param {*} state
     * @param {*} action
     */
    updateList(state, action) {
      if (state.list && state.list.length > 0) {
        const { machine_id, status } = action.payload;
        const i = state.list.findIndex((item) => item.id === machine_id);
        state.list[i].status = status;
      }
    },
  },
  extraReducers: {
    [fetchDetailAction.fulfilled](state, action) {
      console.log(action);
      state.detail = action.payload;
    },
    [fetchListlAction.fulfilled](state, action) {
      console.log(action);
      state.list = action.payload;
    },
  },
});

const { actions, reducer } = machinesSlice;

export const { updateDetail, updateList } = actions;

export const selectMachineDetail = (state) => state?.machines?.detail;
export const selectMachines = (state) => state?.machines?.list;

export default reducer;
