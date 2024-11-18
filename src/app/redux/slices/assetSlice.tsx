/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";
import moment from "moment";

interface InitialState {
  assetMenu: number;
  reportDate: string;
}

const initialState: InitialState = {
  assetMenu: 0,
  reportDate: moment().format("YYYY-MM-DD"),
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAssetMenu: (state, action) => {
      state.assetMenu = action.payload;
    },
    setReportDate: (state, action) => {
      state.reportDate = action.payload;
    },
  },
});
export const { setAssetMenu, setReportDate } = assetSlice.actions;

export const selectAssetMenu = (state: RootState) => state.asset.assetMenu;
export const selectReportDate = (state: RootState) => state.asset.reportDate;

export default assetSlice.reducer;
