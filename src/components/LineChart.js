import React, {useState} from 'react';
import {Line} from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';
import './styles.modules.scss';

const LineChart = ({formattedLineChartData}) => {
  const [sumIncome, setSumIncome] = useState('');
  const [month, setMonth] = useState('January');

  const handleIncomeSubmit = (e) => {
    e.preventDefault();
    const income = {sumIncome, month};

    fetch('http://localhost:8000/income/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(income),
    }).then(() => {
      console.log('new income added');
    });

    function addData(chart, label, data) {
      formattedLineChartData.labels.push(label);
      formattedLineChartData.datasets.forEach((dataset) => {
        dataset.data.push(data);
      });
    }

    addData(LineChart, month, sumIncome);

    setSumIncome('');
    setMonth('January');
  };

  return (
    <div className='wrapper'>
      <div className='line-chart-container'>
        <Line
          data={formattedLineChartData}
          options={{maintainAspectRatio: false}}
        />
      </div>
      <div className='add-income'>
        <h2>Add New Income</h2>
        <form onSubmit={handleIncomeSubmit}>
          <label>Income:</label>
          <textarea
            required
            value={sumIncome}
            onChange={(e) => setSumIncome(e.target.value)}
          ></textarea>
          <label>Month:</label>
          <select value={month} onChange={(e) => setMonth(e.target.value)}>
            <option value='January'>January</option>
            <option value='February'>February</option>
            <option value='March'>March</option>
            <option value='April'>April</option>
            <option value='May'>May</option>
            <option value='June'>June</option>
            <option value='July'>July</option>
            <option value='August'>August</option>
            <option value='September'>September</option>
            <option value='October'>October</option>
            <option value='November'>November</option>
            <option value='December'>December</option>
          </select>
          <button type='submit'>Add Income</button>
        </form>
      </div>
    </div>
  );
};

export default LineChart;
