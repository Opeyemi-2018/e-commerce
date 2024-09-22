import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';
import quantityReducer from './countSlice'; // Import the quantityReducer
// import cartLengthReducer from './cartLength'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Combine the reducers
let rootReducer = combineReducers({
  user: userReducer,
  // cartlength: cartLengthReducer,
  quantity: quantityReducer, // Add the quantityReducer here
});

// Configure persistence
let persistConfig = { key: 'root', storage, version: 1,
};

// Create the persisted reducer
let persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Export the persistor
export let persistor = persistStore(store);
