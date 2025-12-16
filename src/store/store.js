import authSlice from './authSlice'
import themeSlice from './themeSlice'
import uiSlice from './uiSlice'
import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth', 'theme', 'ui'],
}

const rootReducer = combineReducers({
  auth: authSlice,
  theme: themeSlice,
  ui: uiSlice
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
      immutableCheck: false, // Disable to improve performance with large state
    }),
});

export const persistor = persistStore(store)