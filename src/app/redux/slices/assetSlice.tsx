/* eslint-disable no-param-reassign */
import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

interface InitialState {
  assetMenu: number;
}

const initialState: InitialState = {
  assetMenu: 0,
};

export const assetSlice = createSlice({
  name: "asset",
  initialState,
  reducers: {
    setAssetMenu: (state, action) => {
      state.assetMenu = action.payload;
    },
  },
});
export const { setAssetMenu } = assetSlice.actions;

export const selectAssetMenu = (state: RootState) => state.asset.assetMenu;

export default assetSlice.reducer;
