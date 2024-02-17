import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "@/redux/reducers";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

// makeStore function returns a new store for each request
export const makeStore = () => configureStore({
  reducer: rootReducer,
});

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch']

// pre-typed versions of the React-Redux hooks.
// Use throughout the app instead of plain `useDispatch` and`useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
