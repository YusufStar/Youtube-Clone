import { configureStore } from '@reduxjs/toolkit';
import AuthReducer from "../app/AuthReducer"

const store = configureStore({
  reducer: {
    auth: AuthReducer,
  },
});

export default store