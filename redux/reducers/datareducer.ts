const initialState = {
  entries: [],
  currentSymbol: "", // Default symbol
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
    case 'CLEAR_DATA_ENTRIES':
      return {
        ...state,
        entries: [], // Reset entries to an empty array
      };
    default:
      return state;

  }
}