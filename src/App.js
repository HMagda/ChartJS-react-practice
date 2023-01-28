import React, {useEffect, useState} from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import DoughnutChart from './components/DoughnutChart';

const App = () => {
  const [formattedBarChartData, setFormattedBarChartData] = useState(null);
  const [formattedLineChartData, setFormattedLineChartData] = useState(null);
  const [formattedDoughnutChartData, setFormattedDoughnutChartData] = useState(null);

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

        let sumArr = [];
        sumIncome.forEach((singleSum) => {
          sumArr.push(singleSum);
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

  useEffect(() => {
    fetch('http://localhost:8000/categorized-expense')
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const category = data.map(function (index) {
          return index.category;
        });

        let categoriesArr = [];
        category.forEach((singleCategory) => {
          categoriesArr.push(singleCategory);
        });

        const cost = data.map(function (index) {
          return index.cost;
        });

        let costArr = [];
        cost.forEach((singleCost) => {
          costArr.push(singleCost);
        });

        let formattedDoughnutChartData = {
          labels: categoriesArr,
          datasets: [
            {
              label: 'Cost',
              data: costArr,
              backgroundColor: ['black', 'red', 'green', 'pink', 'blue'],
              borderWidth: 0,
            },
          ],
        };

        setFormattedDoughnutChartData(formattedDoughnutChartData);
      });
  }, []);

  return (
    <>
      <div>
        {formattedDoughnutChartData && (
          <DoughnutChart
            formattedDoughnutChartData={formattedDoughnutChartData}
          />
        )}
      </div>
      <div>
        {formattedLineChartData && (
          <LineChart formattedLineChartData={formattedLineChartData} />
        )}
      </div>
      <div>
        {formattedBarChartData && (
          <BarChart formattedBarChartData={formattedBarChartData} />
        )}
      </div>
    </>
  );
};

export default App;
