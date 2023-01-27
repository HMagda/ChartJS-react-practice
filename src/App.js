import React, {useEffect, useState} from 'react';
import './App.css';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
// import DoughnutChart from './components/DoughnutChart';

const App = () => {
  const [formattedBarChartData, setFormattedBarChartData] = useState(null);
  const [formattedLineChartData, setFormattedLineChartData] = useState(null);
  // const [formattedDoughnutChartData, setFormattedDoughnutChartData] = useState(null);

  const [sumIncome, setSumIncome] = useState('');
  const [month, setMonth] = useState('January');

  const handleSubmit = (e) => {
    e.preventDefault();
    const income = {sumIncome, month};

    fetch('http://localhost:8000/income/', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(income),
    }).then(() => {
      console.log('new income added');
    });

    console.log('sumIncome', sumIncome);
    console.log(
      'formattedLineChartData labels',
      typeof formattedLineChartData.labels[1]
    );

    console.log('formattedLineChartData', formattedLineChartData);

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

  useEffect(() => {
    fetch('http://localhost:8000/expenses')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const year = data.map(function (index) {
          return index.year;
        });

        const sumExpenses = data.map(function (index) {
          return index.sumExpenses;
        });

        let formattedBarChartData = {
          labels: year,
          datasets: [sumExpenses].map(function (singleSum) {
            return {
              label: 'Sum of all expenses',
              data: singleSum,
              borderWidth: 2,
              borderColor: '#8e060f',
              backgroundColor: '#f13a37',
            };
          }),
        };
        setFormattedBarChartData(formattedBarChartData);
      });
  }, []);

  useEffect(() => {
    fetch('http://localhost:8000/income')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const month = data.map(function (index) {
          return index.month;
        });

        const sumIncome = data.map(function (index) {
          return index.sumIncome;
        });

        let formattedLineChartData = {
          labels: month,
          datasets: [sumIncome].map(function (singleSum) {
            return {
              label: 'Sum of income',
              data: singleSum,
              borderWidth: 3,
              borderColor: 'green',
              backgroundColor: 'black',
            };
          }),
        };
        setFormattedLineChartData(formattedLineChartData);
      });
  }, []);

  return (
    <>
      <div>
        {formattedBarChartData && (
          <BarChart barChartData={formattedBarChartData} />
        )}
      </div>

      <div>
        {formattedLineChartData && (
          <LineChart lineChartData={formattedLineChartData} />
        )}
      </div>

      <div className='add-income'>
        <h2>Add New Income</h2>
        <form onSubmit={handleSubmit}>
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

      {/* <div>
        {formattedDoughnutChartData && (
          <DoughnutChart doughnutChartData={formattedDoughnutChartData} />
        )}
      </div> */}
    </>
  );
};

export default App;
