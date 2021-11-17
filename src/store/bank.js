import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const initialState = {
  loading: true,
  hasErrors: false,
  details: []
};

const bankSlice = createSlice({
  name: "banking",
  initialState,
  reducers: {
    getBankingDetails: (state) => {
      state.loading = true;
    },
    getBankingDetailsSuccess: (state, { payload }) => {
      state.details = payload;
      state.loading = false;
      state.hasErrors = false;
    },
    getBankingDetailsFailure: (state) => {
      state.hasErrors = true;
    },
  },
});

// Actions generated from slice
export const { getBankingDetails, getBankingDetailsSuccess, getBankingDetailsFailure } = bankSlice.actions;

// Selector
export const bankingSelector = (state) => state.details;

// Reducer
export default bankSlice.reducer;

// Async Thunk
export const fetchDetails = () => {
  return async (dispatch) => {
    dispatch(getBankingDetails());

    try {
      axios.defaults.baseURL = process.env.REACT_APP_BASE_URL
      const { data } = await axios.get(process.env.REACT_APP_MODULE);


      dispatch(getBankingDetailsSuccess(data));
    } catch (error) {
      dispatch(getBankingDetailsFailure());
    }
  };
};
