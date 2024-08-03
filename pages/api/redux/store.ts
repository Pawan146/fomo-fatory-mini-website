import { createStore, applyMiddleware, Middleware, MiddlewareAPI, Action } from 'redux'; // Import Action from 'redux'
import thunk, { ThunkMiddleware, ThunkAction } from 'redux-thunk';
import rootReducer from './reducers';

const initialState = {};

// Middleware to load state from localStorage
const persistedState = localStorage.getItem('appState') ? JSON.parse(localStorage.getItem('appState')!) : initialState;

// Correctly applying middleware to the store
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware<ThunkMiddleware<any, Action>>(thunk as unknown as ThunkMiddleware<any, Action>) // Use Action from 'redux'
);

export type RootState = ReturnType<typeof store.getState>;

// Export the store
export { store };