import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import rootReducer from '@/redux/reducers';
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from 'react-redux';
import { ITSApi } from '@/redux/createApi';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['auth'], // Add reducer names you want to persist here
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

// makeStore function returns a new store for each request
export const makeStore = () => {
  const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }).concat(ITSApi.middleware),
  });
  const persistor = persistStore(store);
  return { store: store, persistor: persistor };
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>['store'];

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
// pre-typed versions of the React-Redux hooks.
// Use throughout the app instead of plain `useDispatch` and`useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;
