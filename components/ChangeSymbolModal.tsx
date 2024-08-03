import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateSymbol, AppAction } from '../redux/actions/dataActions'; // Keep the AppAction import

interface ChangeSymbolModalProps {
  onClose: () => void;
}

const ChangeSymbolModal: React.FC<ChangeSymbolModalProps> = ({ onClose }) => {
  const [symbol, setSymbol] = useState('');
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => setSymbol(e.target.value);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // First cast to unknown, then to AppAction
    const action = updateSymbol(symbol) as unknown as AppAction;
    dispatch(action);
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

export default ChangeSymbolModal;