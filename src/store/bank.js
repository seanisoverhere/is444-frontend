import { createSlice } from "@reduxjs/toolkit";

import axios from "axios";

export const initialState = {
  loading: true,
  hasErrors: false,
  transactions: [],
  products: [],
  loans: {},
  balance: 0,
};

const bankSlice = createSlice({
  name: "banking",
  initialState,
  reducers: {
    getBankingDetails: (state) => {
      state.loading = true;
    },
    getLoansSuccess: (state, { payload }) => {
      state.loans = payload;
      state.hasErrors = false;
    },
    getTransactionsSuccess: (state, { payload }) => {
      state.transactions = payload.transactions;
      state.hasErrors = false;
    },
    getProductsSuccess: (state, { payload }) => {
      state.products = payload.productInterestRates;
      state.hasErrors = false;
    },
    getBalanceSuccess: (state, { payload }) => {
      state.balance = payload.accounts;
      state.hasErrors = false;
    },
    getBankingDetailsFailure: (state) => {
      state.hasErrors = true;
    },
    finishLoading: (state) => {
      state.loading = false;
    }
  },
});

// Actions generated from slice
export const {
  getBankingDetails,
  getLoansSuccess,
  getTransactionsSuccess,
  getProductsSuccess,
  getBalanceSuccess,
  getBankingDetailsFailure,
  finishLoading
} = bankSlice.actions;

// Selector
export const bankingSelector = (state) => state.bankDetails;

// Reducer
export default bankSlice.reducer;

// Async Thunk
export const fetchDetails = () => {
  return async (dispatch) => {
    dispatch(getBankingDetails());

    const { activity } = JSON.parse(localStorage.getItem("persist:auth"));
    axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

    const userID = activity.replace(/"/g, "");

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_LOAN + "/myLoans",
        {
          userID,
        }
      );

      dispatch(getLoansSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getBankingDetailsFailure());
    }

    // Get transaction history

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_PORTFOLIO + "/accounts",
        {
          userID,
        }
      );

      dispatch(getBalanceSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getBankingDetailsFailure());
    }

    try {
      const { data } = await axios.post(
        process.env.REACT_APP_PORTFOLIO + "/transactions",
        {
          userID,
        }
      );

      dispatch(getTransactionsSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getBankingDetailsFailure());
    }

    // Get products

    try {
      const { data } = await axios.get(process.env.REACT_APP_PRODUCT + "/");
      dispatch(getProductsSuccess(data));
    } catch (err) {
      console.log(err);
      dispatch(getBankingDetailsFailure());
    }

    dispatch(finishLoading());

  };
};
