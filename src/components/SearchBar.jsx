import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { updateSearchLocationValue, updateLocationValue, getWeather, getWeatherForecast } from '../actionCreators';

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 1em;
  justify-items: center;
`;

const Title = styled.h1`
  grid-column: 1/5;
  font-family: 'Source Code Pro', monospace;
  color: #884f20;
  font-size: 4em;
`;

const SubTitle = styled.p`
  grid-column: 1/5;
  font-family: 'Roboto Condensed', sans-serif;
  color: #884f20;
  font-size: 1em;
`;

const SearchInputContainer = styled.div`
  grid-column: 1/5;
  margin-top: 0.5em;
`;

const SearchInput = styled.input`
  border: 1px solid #52b9e6;
  height: 1.7em;
  width: 20em;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.locationChange = this.locationChange.bind(this);
    this.locationAutoComplete = this.locationAutoComplete.bind(this);
    this.submitLocationWeather = this.submitLocationWeather.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.initialiseLocationWeather = this.initialiseLocationWeather.bind(this);
  }

  componentDidMount() {
    this.initialiseLocationWeather();
  }

  handleKeyPress(e) {
    if (e.key === 'Enter') {
      this.submitLocationWeather();
    }
  }

  initialiseLocationWeather() {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const geolocation = { lat: latitude, long: longitude };
      this.props.updateLocation(geolocation);
      this.props.getWeatherOnLocation(geolocation);
      this.props.getWeatherForecastOnLocation(geolocation);
    });
  }

  submitLocationWeather() {
    const { long, lat } = this.props.searchLocation;
    const geolocation = { long, lat };
    this.props.updateLocation(geolocation);
    this.props.getWeatherOnLocation(geolocation);
    this.props.getWeatherForecastOnLocation(geolocation);
    this.props.updateSearchLocation({ value: '', long: '', lat: '' });
  }

  locationChange(event) {
    const location = { value: event.target.value, long: '', lat: '' };
    this.props.updateSearchLocation(location);
    this.locationAutoComplete(event);
  }

  locationAutoComplete(event) {
    const input = event.target;
    if (!input) return;
    const suggestion = new google.maps.places.Autocomplete(input);

    suggestion.addListener('place_changed', () => {
      const place = suggestion.getPlace();
      const long = place.geometry.location.lng();
      const lat = place.geometry.location.lat();
      const value = place.formatted_address;
      this.props.updateSearchLocation({
        value,
        long,
        lat,
      });
    });
  }

  render() {
    return (
      <SearchWrapper>
        <Title>WEATHER APP</Title>
        <SubTitle>Where are you located?</SubTitle>
        <SearchInputContainer>
          <SearchInput type="text" value={this.props.searchLocation.value} onChange={this.locationChange} onKeyPress={this.handleKeyPress} />
          <Link className="submit-link" to={{ pathname: '/result' }} onClick={this.submitLocationWeather}>Submit</Link>
        </SearchInputContainer>
      </SearchWrapper>
    );
  }
}

const mapStateToProps = state => ({
  searchLocation: state.searchLocation,
});

const mapDispatchToProps = dispatch => ({
  updateSearchLocation(location) {
    dispatch(updateSearchLocationValue(location));
  },
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

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
