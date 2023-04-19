import { configureStore } from "@reduxjs/toolkit";
import api from "./apis/api";
import userSlice from "./slices/userSlice";
import toastSlice from "./slices/toastSlice";

const store = configureStore({
  reducer: {
    user: userSlice,
    toast: toastSlice,
    [api.reducerPath]: api.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
});

export default store;
