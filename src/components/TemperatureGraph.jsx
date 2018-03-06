import React from 'react';
import { connect } from 'react-redux';

class TemperatureGraph extends React.Component {
  render() {
    return (
      <div>j</div>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
};

export default connect(mapStateToProps)(TemperatureGraph);
