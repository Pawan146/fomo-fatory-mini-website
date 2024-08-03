import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, AppAction } from '../redux/actions/dataActions';
import ChangeSymbolModal  from './ChangeSymbolModal';
import { ThunkAction } from 'redux-thunk';

// Assuming the structure of your Redux state
// interface RootState {
//   data: {
//     entries: any[]; // Replace 'any' with a more specific type if possible
//     currentSymbol: string;
//   };
// }
// const DataTable = () => {
//   const [isModalOpen, setModalOpen] = useState(false);
//   const dispatch = useDispatch();
//   const entries = useSelector((state: RootState) => state.data.entries);
//   const currentSymbol = useSelector((state: RootState) => state.data.currentSymbol);

//   useEffect(() => {
//     dispatch(fetchData(currentSymbol) as unknown as AppAction);
//     const intervalId = setInterval(() => dispatch(fetchData(currentSymbol) as unknown as AppAction), 5000);
//     return () => clearInterval(intervalId);
//   }, [dispatch, currentSymbol]);

//   const toggleModal = () => setModalOpen(!isModalOpen);

//   return (
//     <>
//       <table>
//         {/* Render table headers and rows based on entries */}
//       </table>
//       <button onClick={toggleModal}>Change Symbol</button>
//       {isModalOpen && <ChangeSymbolModal onClose={toggleModal} />}
//     </>
//   );
// };

// export default DataTable;


// Define a more specific type for data entries
interface DataEntry {
  id: string;
  symbol: string;
  price: number;
  timestamp: Date;
}

interface RootState {
  data: {
    entries: DataEntry[];
    currentSymbol: string;
  };
}

const DataTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const entries = useSelector((state: RootState) => state.data.entries);
  const currentSymbol = useSelector((state: RootState) => state.data.currentSymbol);

  useEffect(() => {
    // Fetch initial data
    dispatch(fetchData(currentSymbol) as unknown as AppAction);
    // Set up interval for real-time updates
    const intervalId = setInterval(() => dispatch(fetchData(currentSymbol) as unknown as AppAction), 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, currentSymbol]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <>
      <table>
        <thead>
          <tr>
            <th>Symbol</th>
            <th>Price</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
              <td>{entry.symbol}</td>
              <td>{entry.price}</td>
              <td>{entry.timestamp.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={toggleModal}>Change Symbol</button>
      {isModalOpen && <ChangeSymbolModal onClose={toggleModal} />}
    </>
  );
};

// In ../components/DataTable.tsx or .jsx
export default  DataTable;