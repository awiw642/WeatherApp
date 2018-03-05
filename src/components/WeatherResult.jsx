import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateLocationValue, getWeather, getWeatherForecast } from '../actionCreators';

const WeatherResultWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 1em;
  justify-items: center;
`;
class WeatherResult extends React.Component {
  constructor(props) {
    super(props);
    this.initialiseLocationWeather = this.initialiseLocationWeather.bind(this);
  }
  componentDidMount() {
    this.initialiseLocationWeather();
  }

  initialiseLocationWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const geolocation = { lat: latitude, long: longitude };
      this.props.updateLocation(geolocation)
      this.props.getWeatherOnLocation(geolocation);
      this.props.getWeatherForecastOnLocation(geolocation);
    });
  }

  render() {
    return (
      <WeatherResultWrapper>
        <h1>test</h1>
        
      </WeatherResultWrapper>
    );
  }
}

const mapStateToProps = state => ({
  currentWeather: state.currentWeather,
});

const mapDispatchToProps = dispatch => ({
  updateLocation(geolocation) {
    dispatch(updateLocationValue(geolocation));
  },
  getWeatherOnLocation(geolocation) {
    dispatch(getWeather(geolocation));
  },
  getWeatherForecastOnLocation(geolocation) {
    dispatch(getWeatherForecast(geolocation));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(WeatherResult);
