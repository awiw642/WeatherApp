import React from 'react';
import { connect } from 'react-redux';
import Chart from 'chart.js';
import styled from 'styled-components';

const CanvasContainer = styled.div`
  grid-column: 2/4;
  margin-top: 1em;
  justify-items: center;
  width: 90%;
  height: 10%;
`;

class TemperatureGraph extends React.Component {
  constructor(props) {
    super(props);
    this.renderGraph = this.renderGraph.bind(this);
  }

  componentDidMount() {
    this.renderGraph();
  }

  componentDidUpdate() {
    this.renderGraph();
  }

  renderGraph() {
    const ctx = document.getElementById('myChart');
    const labelData = Object.keys(this.props.temperatureForecast);
    const temperatureData = labelData.map(day => this.props.temperatureForecast[day]);

    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labelData,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperatureData,
            backgroundColor: 'rgba(255, 0, 0, 0.5)',
            borderColor: 'rgba(255, 0, 0, 0.5)',
            borderWidth: 1,
            fill: false,
          },
        ],
      },
      options: {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    });
  }

  render() {
    return (
      <CanvasContainer>
        <canvas id="myChart" width="90" height="70" responsive="true" />
      </CanvasContainer>
    );
  }
}

const mapStateToProps = state => ({
  temperatureForecast: state.temperatureForecast,
});

export default connect(mapStateToProps)(TemperatureGraph);
