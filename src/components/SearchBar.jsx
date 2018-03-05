import React from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';

import { updateLocationValue } from '../actionCreators';

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

const SearchButton = styled.button`
  border: 1px solid #52b9e6;
  background: #52b9e6;
  color: #ffffff;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1em;
  height: 2em;
  width: 8em;
  margin-left: 1em;
  vertical-align: middle;

  &:focus {
    outline: none;
  }
`;

class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.locationChange = this.locationChange.bind(this);
    this.locationAutoComplete = this.locationAutoComplete.bind(this);
  }

  locationChange(event) {
    const location = event.target.value;
    this.props.updateLocation(location);
    this.locationAutoComplete(event);
  }

  locationAutoComplete(event) {

    const input = event.target;
    if (!input) return;
    const suggestion = new google.maps.places.Autocomplete(input);

    suggestion.addListener('place_changed', () => {
      const place = suggestion.getPlace();
      console.log(place);
      this.props.updateLocation(place.formatted_address);
    });
  }

  render() {
    return (
      <SearchWrapper>
        <Title>WEATHER APP</Title>
        <SubTitle>Where are you located?</SubTitle>
        <SearchInputContainer>
          <SearchInput type="text" value={this.props.location} onChange={this.locationChange} />
          <SearchButton>Submit</SearchButton>
        </SearchInputContainer>
      </SearchWrapper>
    );
  }
}

const mapStateToProps = state => ({
  location: state.location,
});

const mapDispatchToProps = dispatch => ({
  updateLocation(value) {
    dispatch(updateLocationValue(value));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchBar);
