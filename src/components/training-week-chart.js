import React from 'react';
import { HorizontalBar } from 'react-chartjs-2';
import 'chartjs-plugin-datalabels';

const TrainingWeekChart = ({ cycleDist, runDist, kayakDist, removeMax = false }) => {
  return (
    <HorizontalBar
      width={100}
      height={20}
      legend={{
        display: false,
      }}
      data={{
        labels: ['Cycle', 'Run', 'Kayak'],
        datasets: [{
          label: 'Distance (kms)',
          backgroundColor: '#FCB614',
          barThickness: 20,
          data: [cycleDist, runDist, kayakDist],
        }],
      }}
      options={{
        tooltips: {
          enabled: false,
        },
        plugins: {
          datalabels: {
            display: true,
            anchor: 'end',
            align: 'end',
            formatter: value => `${value} kms`
          },
        },
        scales: {
          xAxes: [{
            ticks: {
              fontFamily: 'Libre Baskerville, Georgia, serif',
              display: false,
              beginAtZero: true,
              max: removeMax ? Math.max(cycleDist, runDist, kayakDist) + 7  : 150,
            },
            gridLines: {
              display: false,
              color: 'white',
              tickMarkLength: false,
              drawBorder: false,
            },
          }],
          yAxes: [{
            ticks: {
              padding: 10,
            },
            gridLines: {
              display: false,
              color: 'white',
              tickMarkLength: false,
              drawBorder: false,
            },
          }],
        }
      }}
    />
  );
};

export default TrainingWeekChart;
