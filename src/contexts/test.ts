// stateManager.js
const createStateManager = () => {
  let state: string | null = "aaaaa";

  return {
    setState(value: string | null) {
      state = value;
    },
    getState() {
      return state;
    },
  };
};

const stateManager = createStateManager();
export default stateManager;
