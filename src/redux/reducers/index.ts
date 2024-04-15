import auth from '@/redux/slices/auth';
import { combineReducers } from '@reduxjs/toolkit';
import { ITSApi } from '../createApi';
const rootReducer = combineReducers({
  auth,
  [ITSApi.reducerPath]: ITSApi.reducer,
});

export default rootReducer;
