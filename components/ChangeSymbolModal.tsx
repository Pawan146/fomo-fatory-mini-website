import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSymbol, fetchData, AppAction } from '../redux/actions/dataActions'; // Import fetchData

interface ChangeSymbolModalProps {
  onClose: () => void;
}

const ChangeSymbolModal: React.FC<ChangeSymbolModalProps> = ({ onClose }) => {
  const [symbol, setSymbol] = useState('');
  const [isClearVisible, setIsClearVisible] = useState(false); // State for "Clear" button visibility
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const action = updateSymbol(symbol) as unknown as AppAction;
    dispatch(action);
    setIsClearVisible(true); // Show "Clear" button after submit
    onClose(); // Close modal after dispatch
  };

  const handleClear = () => {
    dispatch(fetchData(symbol) as unknown as AppAction); // Call fetchData on "Clear" button click
    setIsClearVisible(false); // Optionally hide the "Clear" button after clicking
    onClose(); // Optionally close the modal
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="text" value={symbol} onChange={handleChange} placeholder="Enter Symbol" />
        <button type="submit">Submit</button>
      </form>
      {isClearVisible && <button onClick={handleClear}>Clear</button>} {/* Conditional rendering of "Clear" button */}
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default ChangeSymbolModal;