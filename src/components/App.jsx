import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import SearchBar from './SearchBar.jsx';
import WeatherResult from './WeatherResult.jsx';
import Navigation from './Navigation.jsx';

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <div>
          <Navigation />
          <Switch>
            <Route exact path="/" component={SearchBar} />
            <Route path="/result" component={WeatherResult} />
            <Route path="/search" component={SearchBar} />
            <Route
              render={() => <p>Not Found</p>}
            />
          </Switch>
        </div>
      </Router>
    );
  }
}
