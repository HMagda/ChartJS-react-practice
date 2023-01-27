import React from 'react';
import {Doughnut} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const DoughnutChart = ({doughnutChartData}) => {
  return (
    <div className='doughnut-chart-container'>
      <Doughnut 
        data={doughnutChartData} 
        options={{maintainAspectRatio: false}} 
      />
    </div>
  );
};

export default DoughnutChart;
