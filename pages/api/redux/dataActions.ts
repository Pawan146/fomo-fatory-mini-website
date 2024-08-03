// import { AppThunk } from './store';
// import { setEntries } from './dataSlice';

// export const fetchData = (stockOrCrypto: string): AppThunk => async dispatch => {
//   try {
//     const res = await fetch(`/api/data?stockOrCrypto=${stockOrCrypto}`);
//     const data = await res.json();
//     dispatch(setEntries(data.entries));
//   } catch (error) {
//     console.error('Failed to fetch data:', error);
//   }
// };