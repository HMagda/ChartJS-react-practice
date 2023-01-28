import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const BarChart = ({formattedBarChartData}) => {
  return (
    <div className='bar-chart-container'>
      <Bar 
        data={formattedBarChartData} 
        options={{maintainAspectRatio: false}} 
      />
    </div>
  );
};

export default BarChart;
