import { combineReducers } from 'redux';
import { UPDATE_LOCATION, UPDATE_SEARCH_LOCATION, UPDATE_CURRENT_WEATHER, UPDATE_TEMPERATURE_FORECAST } from './actions';

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

const currentWeather = (
  state = {
    weather: {},
    main: {},
    name: '',
    wind: '',
  },
  action,
) => {
  if (action.type === UPDATE_CURRENT_WEATHER) {
    return action.currentWeather;
  }
  return state;
};

const temperatureForecast = (state = {}, action) => {
  if (action.type === UPDATE_TEMPERATURE_FORECAST) {
    return action.temperatureForecast;
  }
  return state;
};

const reducer = combineReducers({
  location,
  searchLocation,
  currentWeather,
  temperatureForecast,
});

export default reducer;
