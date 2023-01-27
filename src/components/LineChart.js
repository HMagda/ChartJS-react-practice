import React from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const LineChart = ({lineChartData}) => {
  return (
    <div className='line-chart-container'>
      <Line 
        data={lineChartData} 
        options={{maintainAspectRatio: false}} 
      />
    </div>
  );
};

export default LineChart;
