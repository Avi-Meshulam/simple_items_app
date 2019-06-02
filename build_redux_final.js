// task 2: add subscribers
// store methods: getState, dispatch, subscribe
// actions: add item, clear, select, delete by index
'use strict';

// store creator - we can still provide initial state
function createStore(reducer, initState) {
  let state = initState;
  const listeners = [];

  function getState() {
    return state;
  }

  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach(listener => {
      listener(state, action);
    });
  }

  function subscribe(callbackFn) {
    listeners.push(callbackFn);
  }

  return {
    getState: getState,
    dispatch: dispatch,
    subscribe: subscribe
  };
}

// items initial state
const itemsInitState = {
  items: ['Tea cup', 'Coffee mug'],
  selected: -1
};

// our only reducer
function itemsReducer(state = itemsInitState, action) {
  let newState = state;
  switch (action.type) {
    case "ADD_ITEM":
      if (!action.payload)
        break;
      newState = Object.assign({}, state, {
        items: state.items.concat(action.payload)
      });
      break;
    case "CLEAR_ALL_ITEMS":
      newState = Object.assign({}, state, { items: [] });
      break;
    case "SELECT_ITEM":
      newState = Object.assign({}, state, { selected: action.payload });
      break;
    case "DELETE_SELECTED_ITEM":
      if (state.selected < 0)
        break;
      state.items.splice(state.selected, 1);
      newState = Object.assign({}, state, {
        selected: -1
      });
      break;
    default:
      break;
  }
  return newState;
}
