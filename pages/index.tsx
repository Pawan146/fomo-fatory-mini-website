import React from 'react';
import { Provider } from 'react-redux';
import store from '../redux/store'; // Double-check this path is correct
import App from './App';

// Ensure the store is correctly imported by logging it
console.log(store.getState());

const HomePage = () => (
  <Provider store={store}>
    <App />
  </Provider>
);

export default HomePage;