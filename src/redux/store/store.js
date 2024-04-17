// import { configureStore } from '@reduxjs/toolkit';
// import rootReducer from '../reducers';
// import { persistReducer } from 'redux-persist';

// const store = configureStore({
//   reducer: rootReducer,
// });
// const persistor = persistReducer;
// // export default store;
// export { store, persistor };

import { configureStore } from '@reduxjs/toolkit';
import { persistStore } from 'redux-persist';
import persistedReducer from '../reducers/index';

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});
const persistor = persistStore(store);

export { store, persistor };
