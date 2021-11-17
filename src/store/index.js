// import { createStore } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import localforage from "localforage";

import authReducer from "./auth";
import bankReducer from "./bank";

const persistConfig = {
  key: "bankDetails",
  version: 1,
  storage: localforage,
};

const authPersist = {
  key: "auth",
  version: 1,
  storage,
};

const persistedReducer = persistReducer(persistConfig, bankReducer);
const persistedAuth = persistReducer(authPersist, authReducer);

const store = configureStore({
  reducer: {
    auth: persistedAuth,
    bankDetails: persistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

export default store;
