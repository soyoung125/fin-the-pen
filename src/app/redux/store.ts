import { configureStore } from '@reduxjs/toolkit';

// import storage from 'redux-persist/lib/storage'; // for local storage
import storage from 'redux-persist/lib/storage/session'; // for session storage

import { Action, combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import thunk, { ThunkAction } from 'redux-thunk';
import userReducer from './slices/userSlice';
import scheduleReducer from './slices/scheduleSlice';
import commonReducer from './slices/commonSlice';
import settingReducer from './slices/settingSlice';
import assetReducer from './slices/assetSlice';

const reducers = combineReducers({
  common: commonReducer,
  user: userReducer,
  schedule: scheduleReducer,
  setting: settingReducer,
  asset: assetReducer,
  // 리듀서 추가를 여기에 해주삼 ㅇㅇ
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
