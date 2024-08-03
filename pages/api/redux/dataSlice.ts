import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataState {
  currentSymbol: string;
  entries: string[]; // Added entries property
}

const initialState: DataState = {
  currentSymbol: '',
  entries: [], // Initialize entries as an empty array
};

export const dataSlice = createSlice({
  name: 'data',
  initialState,
  reducers: {
    setCurrentSymbol: (state, action: PayloadAction<string>) => {
      state.currentSymbol = action.payload;
    },
    setEntries: (state, action: PayloadAction<string[]>) => { // Added setEntries reducer
      state.entries = action.payload;
    },
  },
});

export const { setCurrentSymbol, setEntries } = dataSlice.actions; // Export setEntries

export default dataSlice.reducer;