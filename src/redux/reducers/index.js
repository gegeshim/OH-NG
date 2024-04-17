import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import themeReducer from '../slices/themeSlice';
import languageReducer from '../slices/languageSlice';
import sidebarReducer from '../slices/sidebarSlice';
import explorerSlice from '../slices/explorerSlice';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['theme', 'language'], // 특정 리듀서에 대해서만 storage에 저장
};

const rootReducer = combineReducers({
  theme: themeReducer, //자동으로 themeSlice.reducer를 참조함
  language: languageReducer,
  sidebar: sidebarReducer,
  explorer: explorerSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default persistedReducer;
