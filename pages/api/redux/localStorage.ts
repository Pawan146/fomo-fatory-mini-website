const LOCAL_STORAGE_KEY = 'reduxState';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
};

const saveState = <T>(state: T) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem(LOCAL_STORAGE_KEY, serializedState);
    } catch {
      // Ignore write errors
    }
  };

  const localStorageMiddleware = (store: any) => (next: (action: any) => any) => (action: any) => {
    const result = next(action);
    saveState(store.getState());
    return result;
  };

const persistedState = loadState();

export default localStorageMiddleware;
export { persistedState };