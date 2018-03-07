import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationList = styled.ul`
  padding: 0;
  display: flex;

  @media (max-width: 700px) {
    justify-content: center;
  }
`;

const NavigationListItem = styled.li`
  font-family: 'Source Code Pro', monospace;
  color: #884f20;
  list-style-type: none;
  margin: 2em;
  font-size: 1.2em;
`;

const Nav = () => (
  <NavigationList>
    <NavigationListItem>
      <NavLink exact className="nav" activeClassName="active" to="/">
        Search
      </NavLink>
    </NavigationListItem>
    <NavigationListItem>
      <NavLink className="nav" activeClassName="active" to="/result">
        Result
      </NavLink>
    </NavigationListItem>
  </NavigationList>
);

export default Nav;
