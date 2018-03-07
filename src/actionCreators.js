import axios from 'axios';

import { UPDATE_SEARCH_LOCATION, UPDATE_LOCATION, UPDATE_CURRENT_WEATHER, UPDATE_TEMPERATURE_FORECAST } from './actions';

const API_KEY = '90415b948fc6530a6dfd7223ee64dfe5';

// Helper function
const transformIconToUrl = icon => `http://openweathermap.org/img/w/${icon}.png`;

const transformDegToCardinal = (deg) => {
  const directions = 8;

  const degree = 360 / directions;
  const angle = deg + (degree / 2);

  if (angle >= 0 * degree && angle < 1 * degree) {
    return 'N';
  }
  if (angle >= 1 * degree && angle < 2 * degree) {
    return 'NE';
  }
  if (angle >= 2 * degree && angle < 3 * degree) {
    return 'E';
  }
  if (angle >= 3 * degree && angle < 4 * degree) {
    return 'SE';
  }
  if (angle >= 4 * degree && angle < 5 * degree) {
    return 'S';
  }
  if (angle >= 5 * degree && angle < 6 * degree) {
    return 'SW';
  }
  if (angle >= 6 * degree && angle < 7 * degree) {
    return 'W';
  }
  if (angle >= 7 * degree && angle < 8 * degree) {
    return 'NW';
  }
  return 'N';
};

const transformEpochToLocal = (epochTime) => {
  const date = new Date(0);
  date.setUTCSeconds(epochTime);
  return date;
};

const transformMonth = (month) => {
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return monthNames[month];
};

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
      url: `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&&units=metric&appid=${API_KEY}`,
    })
      .then((data) => {
        const { main, name, wind } = data.data;
        const weather = data.data.weather[0];

        // Update icon & wind deg value
        weather.icon = transformIconToUrl(weather.icon);
        wind.deg = transformDegToCardinal(wind.deg);


        const currentWeather = {
          weather,
          main,
          name,
          wind,
        };

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
      url: `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&&units=metric&appid=${API_KEY}`,
    })
      .then((data) => {
        const temperatures = data.data.list.reduce((final, detailedWeather) => {
          const detail = Object.assign({}, detailedWeather);
          const date = transformEpochToLocal(detail.dt);
          detail.dt = `${date.getDate()} ${transformMonth(date.getMonth())}`;
          const { main: { temp }, dt } = detail;
          if (!final[dt]) {
            return Object.assign({}, final, { [dt]: temp });
          }

          const newTemp = Math.round((final[dt] + temp) / 2);
          return Object.assign({}, final, { [dt]: newTemp });
        }, {});
        dispatch({
          type: UPDATE_TEMPERATURE_FORECAST,
          temperatureForecast: temperatures,
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
};
