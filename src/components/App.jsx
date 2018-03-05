import React from 'react';

import SearchBar from './SearchBar.jsx';
import WeatherResult from './WeatherResult.jsx';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <SearchBar />
        <WeatherResult />
      </div>
    );
  }
}
