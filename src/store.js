export default function store () {
  let state = {};
  return {
    assign (newState) {
      const copy = Object.assign({}, state, newState);
      Object.assign(state, copy);
      return copy;
    }
  };
}

