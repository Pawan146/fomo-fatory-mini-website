const initialState = {
    entries: [],
    currentSymbol: 'AAPL', // Default symbol
  };

  interface Action {
    type: string;
    payload: any; // Consider using a more specific type if possible
  }
  
  export default function dataReducer(state = initialState, action: Action) {
    switch (action.type) {
      case 'FETCH_DATA_SUCCESS':
        return { ...state, entries: action.payload };
      case 'UPDATE_SYMBOL':
        return { ...state, currentSymbol: action.payload };
      default:
        return state;
    }
  }