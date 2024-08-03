// pages/api/redux/reducers/userReducer.ts

interface UserState {
    // Define your state shape here
  }
  
  const initialState: UserState = {
    // Initialize your state
  };
  
  // Define an interface for the action
  interface Action {
    type: string;
    payload?: any; // Consider using a more specific type if possible
  }
  
  function userReducer(state = initialState, action: Action) {
    switch (action.type) {
      // Handle your actions here
      default:
        return state;
    }
  }
  
  export default userReducer;