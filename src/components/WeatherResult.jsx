import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import TemperatureGraph from './TemperatureGraph.jsx';

import { updateLocationValue, getWeather, getWeatherForecast } from '../actionCreators';

const WeatherResultWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 1em;
  justify-items: center;
`;

const WeatherSubtitle = styled.p`
  font-size: 1em;
  padding-top: 1em;
`;

const WeatherTitleContainer = styled.div`
  grid-column: 1/5;
  font-family: 'Source Code Pro', monospace;
  color: #884f20;
  text-transform: uppercase;
  display: inline-flex;
`;

const WeatherTitle = styled.h1`
  grid-column: 1/5;
  font-family: 'Roboto Condensed', sans-serif;
  color: #884f20;
  font-size: 4em;
`;

const WeatherDetails = styled.div`
  grid-column: 1/5;
  margin-top: 0.5em;

  @media (max-width: 805px) {
    margin-top: 1.5em;
  }
`;

const DetailContainer = styled.div`
  display: inline-flex;
  margin: 5em;

  @media (max-width: 1370px) {
    margin: 3em;
  }

  @media (max-width: 930px) {
    margin: 2em;
  }

  @media (max-width: 805px) {
    margin: 0.8em;
  }
`;

const Icon = styled.img`
  height: 4em;

  @media (max-width: 1370px) {
    height: 2em;
  }
`;

const IconHolder = styled.span`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  color: #52b9e6;

  @media (max-width: 1370px) {
    margin-right: 1em;
  }

  @media (max-width: 645px) {
    margin-right: 0.3em;
  }
`;

const ValueHolder = styled.span`
  text-align: center;
  font-family: 'Roboto Condensed', sans-serif;
  color: #52b9e6;
`;

const Value = styled.p`
  font-size: 4.3em;
  color: #884f20;

  @media (max-width: 1370px) {
    font-size: 2.3em;
  }
`;

class WeatherResult extends React.Component {
  render() {
    const { weather, main, name, wind } = this.props.currentWeather;
    return (
      <WeatherResultWrapper>
        <WeatherTitle>{name}</WeatherTitle>
        <WeatherTitleContainer>
          <img src={weather.icon} alt="weatherIcon" />
          <WeatherSubtitle>{weather.description}</WeatherSubtitle>
        </WeatherTitleContainer>
        <TemperatureGraph />
        <WeatherDetails>
          <DetailContainer>
            <IconHolder>
              <Icon src="https://image.ibb.co/drAOiS/if_weather_43_2682808.png" alt="if_weather_43_2682808" border="0" />
              <p>Temp</p>
            </IconHolder>
            <ValueHolder>
              <Value>{main.temp}°</Value>
              <p>Celcius</p>
            </ValueHolder>
          </DetailContainer>
          <DetailContainer>
            <IconHolder>
              <Icon src="https://image.ibb.co/m6mJHn/gauge.png" alt="if_weather_43_2682808" border="0"/>
              <p>Pressure</p>
            </IconHolder>
            <ValueHolder>
              <Value>{main.pressure}</Value>
              <p>Hectopascals</p>
            </ValueHolder>
          </DetailContainer>
          <DetailContainer>
            <IconHolder>
              <Icon src="https://image.ibb.co/k5puq7/if_weather_44_2682807.png" alt="if_weather_43_2682808" border="0"/>
              <p>Humidity</p>
            </IconHolder>
            <ValueHolder>
              <Value>{main.humidity}</Value>
              <p>Percent</p>
            </ValueHolder>
          </DetailContainer>
          <DetailContainer>
            <IconHolder>
              <Icon src="https://image.ibb.co/f5caDS/if_weather_9_2682842.png" alt="if_weather_43_2682808" border="0"/>
              <p>Km/Hour</p>
            </IconHolder>
            <ValueHolder>
              <Value>{wind.speed} {wind.deg}</Value>
              <p>Km</p>
            </ValueHolder>
          </DetailContainer>
        </WeatherDetails>
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
