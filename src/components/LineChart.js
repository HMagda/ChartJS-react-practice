import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const LineChart = ({barChartData}) => {
  return (
    <div className='line-chart-container'>
      <Line 
        data={barChartData} 
        options={{maintainAspectRatio: false}} 
      />
    </div>
  );
};

export default LineChart;
