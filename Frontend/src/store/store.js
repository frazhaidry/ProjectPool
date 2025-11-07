import { configureStore } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist' // Single import for both
import { combineReducers } from 'redux'
import authReducer from './authSlice'
import projectReducer from './projectSlice'

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'], // persist only auth slice (add 'project' if you want to persist it)
}

const rootReducer = combineReducers({
  auth: authReducer,
  project: projectReducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // required for redux-persist
    }),
})

// Create persistor instance from the single imported persistStore
export const persistor = persistStore(store)




// import { configureStore } from '@reduxjs/toolkit'
// import authReducer from './authSlice'
// import projectReducer from './projectSlice'

// export const store = configureStore({
//   reducer: {
//     auth: authReducer,
//     project: projectReducer,
//   },
// })
