import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers';

// Optional: preloadedState if you have initial state to load
const preloadedState = {};

// Create store using configureStore from Redux Toolkit
const store = configureStore({
  reducer: rootReducer,
  preloadedState, // This can be omitted if you have no preloadedState
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(/* otherMiddleware if any */),
  // Enable Redux DevTools with custom configurations if needed
  devTools: process.env.NODE_ENV !== 'production', // Enable DevTools only in development
});

export type RootState = ReturnType<typeof rootReducer>;

export default store;