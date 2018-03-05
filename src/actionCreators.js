import axios from 'axios';

import { UPDATE_SEARCH_LOCATION, UPDATE_LOCATION, UPDATE_CURRENT_WEATHER, UPDATE_WEATHER_FORECAST } from './actions';

const API_KEY = '90415b948fc6530a6dfd7223ee64dfe5';

export const updateSearchLocationValue = location => ({
  type: UPDATE_SEARCH_LOCATION,
  location,
});

export const updateLocationValue = location => ({
  type: UPDATE_LOCATION,
  location,
});

export const getWeather = (geolocation) => {
  const { lat, long } = geolocation;
  return (dispatch) => {
    axios({
      method: 'get',
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`,
    })
      .then((data) => {
        const { main, name } = data.data;
        const weather = data.data.weather[0];

        const currentWeather = { weather, main, name };
        dispatch({
          type: UPDATE_CURRENT_WEATHER,
          currentWeather,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};

export const getWeatherForecast = (geolocation) => {
  const { lat, long } = geolocation;
  return (dispatch) => {
    axios({
      method: 'get',
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=${API_KEY}`,
    })
      .then((data) => {
        dispatch({
          type: UPDATE_WEATHER_FORECAST,
          weatherForecast: data.data,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
