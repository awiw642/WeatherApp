import { combineReducers } from 'redux';
import { UPDATE_LOCATION, UPDATE_SEARCH_LOCATION, UPDATE_CURRENT_WEATHER, UPDATE_WEATHER_FORECAST } from './actions';

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

const currentWeather = (state = { weather: {}, main: {}, name: '' }, action) => {
  if (action.type === UPDATE_CURRENT_WEATHER) {
    return action.currentWeather;
  }
  return state;
};

const weatherForecast = (state = {}, action) => {
  if (action.type === UPDATE_WEATHER_FORECAST) {
    return action.weatherForecast;
  }
  return state;
};

const reducer = combineReducers({
  location,
  searchLocation,
  currentWeather,
  weatherForecast,
});

export default reducer;
