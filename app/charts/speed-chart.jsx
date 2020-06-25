import React, { useContext } from 'react';
import Plot from 'react-plotly.js';
import { HealthContext } from '../context/HealthContext';
import moment from 'moment';
/**
 * @desc Render Speed Chart
 * @param object props- passed from GraphsContainer
 * @return component - component for speed changes
 */

const SpeedChart = props => {
  const { healthData } = useContext(HealthContext);
  const { time } = healthData;
  const yAxis = healthData.cpuspeed;

  const createChart = () => {
    let timeArr;
    if (time === undefined) {
      // Do Nothing
    } else {
      // const xAxis = healthData.time;
      timeArr = time.map(el => moment(el).format('hh:ss A'));
    }
    return (
      <Plot
        data={[
          {
            name: 'mbps',
            x: timeArr,
            y: yAxis,
            type: 'scatter',
            mode: 'lines',
          },
          { label: 'mbps' },
        ]}
        layout={{
          title: 'Speed Chart',
          height: 400,
          width: 400,
          font: {
            color: 'black',
            size: 14,
            family: 'Nunito, san serif',
          },
          xaxis: {
            title: 'Time (PST)',
            tickmode: 'linear',
            // tick0: secondsArr[0],
            tickformat: '%d %B (%a)<br>%Y',
            // nticks: 5,
            range: [1, 10],
            rangemode: 'nonnegative',
            rangeslider: true,
          },
          yaxis: {
            title: 'Data Rates (MBPS)',
          },
          paper_bgcolor: 'white',
          showlegend: true,
          legend: {
            orientation: 'h',
            xanchor: 'center',
            x: 0.5,
            y: 5,
          },
        }}
      />
    );
  };

  return <div>{createChart()}</div>;
};

export default SpeedChart;
