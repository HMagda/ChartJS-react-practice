import React, {useEffect, useState} from 'react';
import './App.css';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';

const App = () => {
  const [formattedBarChartData, setFormattedBarChartData] = useState(null);
  const [formattedLineChartData, setFormattedLineChartData] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/expenses')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log(data, data[1].sumExpenses);

        const year = data.map(function (index) {
          return index.year;
        });
        console.log(year, 'year');

        const sumExpenses = data.map(function (index) {
          return index.sumExpenses;
        });
        console.log(sumExpenses, 'sumExpenses');

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
        console.log(data, data[1].sumIncome);

        const year = data.map(function (index) {
          return index.year;
        });
        console.log(year, 'year');

        const sumIncome = data.map(function (index) {
          return index.sumIncome;
        });
        console.log(sumIncome, 'sumIncome');

        let formattedLineChartData = {
          labels: year,
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
          <LineChart barChartData={formattedLineChartData} />
        )}
      </div>
    </>
  );
};

export default App;
