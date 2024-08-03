import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSymbol, AppAction } from '../redux/actions/dataActions'; // Added AppAction import

// Step 1: Define the props type
type ChangeSymbolModalProps = {
  onClose: () => void;
};

const ChangeSymbolModal = ({ onClose }: ChangeSymbolModalProps) => {
  const [symbol, setSymbol] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(updateSymbol(symbol) as AppAction); // Added casting to AppAction
    onClose(); // Close modal after dispatch
  };

  return (
    <div className="modal">
      <form onSubmit={handleSubmit}>
        <input type="text" value={symbol} onChange={handleChange} placeholder="Enter Symbol" />
        <button type="submit">Change Symbol</button>
      </form>
      <button onClick={onClose}>Close</button>
    </div>
  );
};