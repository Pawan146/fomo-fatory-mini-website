import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData, AppAction, clearData } from '../redux/actions/dataActions';
import ChangeSymbolModal  from './ChangeSymbolModal';
import { ThunkAction } from 'redux-thunk';

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
    dispatch(clearData());

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
          <th style={{ paddingRight: "100px" }}>CryptoName</th>
          <th style={{ paddingRight: "100px" }}>Price</th>
          <th>Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry) => (
            <tr key={entry.id}>
            <td style={{ paddingRight: "20px" }}>{entry.id}</td>
            <td style={{ paddingRight: "20px" }}>{entry.price}</td>
            <td>{entry.timestamp?.toLocaleString() ?? 'N/A'}</td>
        </tr>
  ))}
</tbody>
      </table>
      <button onClick={toggleModal}>Select Crypto</button>
      {isModalOpen && <ChangeSymbolModal onClose={toggleModal} />}
    </>
  );
};

// In ../components/DataTable.tsx or .jsx
export default  DataTable;