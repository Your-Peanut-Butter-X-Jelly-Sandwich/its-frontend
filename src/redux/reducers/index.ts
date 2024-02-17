import auth from "@/redux/slices/auth";
import { combineReducers } from "@reduxjs/toolkit";

const rootReducer = combineReducers({
  auth,
});

export default rootReducer;
