import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchData } from '../redux/actions/dataActions';
import ChangeSymbolModal from './ChangeSymbolModal';

const DataTable = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const dispatch = useDispatch();
  const entries = useSelector((state) => state.data.entries);
  const currentSymbol = useSelector((state) => state.data.currentSymbol);

  useEffect(() => {
    dispatch(fetchData(currentSymbol));
    const intervalId = setInterval(() => dispatch(fetchData(currentSymbol)), 5000);
    return () => clearInterval(intervalId);
  }, [dispatch, currentSymbol]);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <>
      <table>
        {/* Render table headers and rows based on entries */}
      </table>
      <button onClick={toggleModal}>Change Symbol</button>
      {isModalOpen && <ChangeSymbolModal onClose={toggleModal} />}
    </>
  );
};

