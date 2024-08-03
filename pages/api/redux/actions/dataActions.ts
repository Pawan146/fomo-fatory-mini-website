import { Dispatch } from 'redux'; // Import Dispatch type from redux
import { ThunkAction } from 'redux-thunk'; // Import ThunkAction for async actions
import { RootState, store } from '../store'; // Import RootState and store

// Export the AppAction type
export type AppAction = { type: 'UPDATE_SYMBOL'; payload: string } | { type: 'FETCH_DATA_SUCCESS'; payload: any } | { type: 'UNKNOWN_ACTION' };

export const updateSymbol = (symbol: string): ThunkAction<void, RootState, unknown, AppAction> => (dispatch: Dispatch<AppAction>) => {
  dispatch({ type: 'UPDATE_SYMBOL', payload: symbol });
  const currentState = store.getState();
  localStorage.setItem('appState', JSON.stringify(currentState));
};

export const fetchData = (symbol: string): ThunkAction<void, RootState, unknown, AppAction> => async (dispatch: Dispatch<AppAction>) => {
  const response = await fetch(`/api/data?symbol=${symbol}`);
  const data = await response.json();
  dispatch({ type: 'FETCH_DATA_SUCCESS', payload: data });
  const currentState = store.getState();
  localStorage.setItem('appState', JSON.stringify(currentState));
};