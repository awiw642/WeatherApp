import { combineReducers } from 'redux';
import { UPDATE_LOCATION } from './actions';

const location = (state = '', action) => {
  if (action.type === UPDATE_LOCATION) {
    return action.value;
  }
  return state;
};

const reducer = combineReducers({
  location,
});

export default reducer;

