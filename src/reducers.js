import { combineReducers } from 'redux';
import { UPDATE_LOCATION, UPDATE_SEARCH_LOCATION } from './actions';


const location = (state = { long: '', lat: '' }, action) => {
  if (action.type === UPDATE_LOCATION) {
    return action.location;
  }
  return state;
};

const searchLocation = (state = { value: '', long: '', lat: '' }, action) => {
  if (action.type === UPDATE_SEARCH_LOCATION) {
    return action.location;
  }
  return state;
};

const reducer = combineReducers({
  location,
  searchLocation,
});

export default reducer;

