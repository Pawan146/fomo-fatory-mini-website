// Import necessary actions
import { Action } from 'redux';

// Define specific action types
export enum ActionTypes {
  FETCH_DATA = 'FETCH_DATA',
  UPDATE_DATA = 'UPDATE_DATA',
  CHANGE_STOCK_CRYPTO = 'CHANGE_STOCK_CRYPTO',
}

// Define action interfaces
interface FetchDataAction extends Action {
  type: ActionTypes.FETCH_DATA;
  payload: { symbol: string };
}

interface UpdateDataAction extends Action {
  type: ActionTypes.UPDATE_DATA;
  payload: { newData: any[] };
}

interface ChangeStockCryptoAction extends Action {
  type: ActionTypes.CHANGE_STOCK_CRYPTO;
  payload: { newSymbol: string };
}

// Combine action types
export type AppAction = FetchDataAction | UpdateDataAction | ChangeStockCryptoAction;