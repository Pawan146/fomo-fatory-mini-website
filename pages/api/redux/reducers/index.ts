import { combineReducers } from 'redux';
// Import your individual reducers
import userReducer from './userReducer';
import dataReducer from './datareducer';
// Add more reducers as needed

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  data: dataReducer,
  // Add more reducers here
});

export default rootReducer;