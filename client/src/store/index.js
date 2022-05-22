import { configureStore } from "@reduxjs/toolkit";
import machinesReducer from "./slices/machines.slice";

export default configureStore({
  reducer: {
    machines: machinesReducer,
  },
});
