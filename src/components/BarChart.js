import React from 'react';
import {Bar} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const BarChart = ({barChartData}) => {
  return (
    <div className='bar-chart-container'>
      <Bar 
        data={barChartData} 
        options={{maintainAspectRatio: false}} 
      />
    </div>
  );
};

export default BarChart;
