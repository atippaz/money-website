// stateManager.js
const createStateManager = () => {
  let state = "aaaaa";

  return {
    setState(value: string) {
      state = value;
    },
    getState() {
      return state;
    },
  };
};

const stateManager = createStateManager();
export default stateManager;
