import React from 'react';
import styled from 'styled-components';

const SearchWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 25%);
  margin-top: 1em;
  justify-items: center;
`;

const Title = styled.h1`
  grid-column: 1/5;
  font-family: 'Source Code Pro', monospace;
  color: #884F20;
  font-size: 4em;
`;

const SubTitle = styled.p`
  grid-column: 1/5;
  font-family: 'Roboto Condensed', sans-serif;
  color: #884F20;
  font-size: 1em;
`;

const SearchInputContainer = styled.div`
  grid-column: 1/5;
  margin-top: 0.5em;
`;

const SearchInput = styled.input`
  border: 1px solid #52B9E6;
  height: 1.7em;
  width: 20em;
  font-family: 'Roboto Condensed', sans-serif;
  font-size: 1em;

  &:focus {
    outline: none;
  }
`;

const SearchButton = styled.button`
  border: 1px solid #52B9E6;
  background: #52B9E6;
  color: #FFFFFF;
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

export default class SearchBar extends React.Component {
  render() {
    return (
      <SearchWrapper>
        <Title>WEATHER APP</Title>
        <SubTitle>What's your weather?</SubTitle>
        <SearchInputContainer>
          <SearchInput type="text" />
          <SearchButton>Submit</SearchButton>
        </SearchInputContainer>
      </SearchWrapper>
    );
  }
}
