import React, {useEffect, useState} from 'react';
import BarChart from './components/BarChart';
import LineChart from './components/LineChart';
import DoughnutChart from './components/DoughnutChart';

const GraphStyle = class {
  constructor(label, borderWidth, borderColor, backgroundColor) {
    this.label = label;
    this.borderWidth = borderWidth;
    this.borderColor = borderColor;
    this.backgroundColor = backgroundColor;
  }
};

const App = () => {
  const [formattedBarChartData, setFormattedBarChartData] = useState(null);
  const [formattedLineChartData, setFormattedLineChartData] = useState(null);
  const [formattedDoughnutChartData, setFormattedDoughnutChartData] =
    useState(null);

  const updateChart = (setter, keyword, xname, yname, style) => {
    fetch('http://localhost:8000/' + keyword)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        const x = data.map(function (dataArr) {
          return dataArr[xname];
        });

        const y = data.map(function (dataArr) {
          return dataArr[yname];
        });

        let formattedChartData = {
          labels: x,
          datasets: [y].map(function (value) {
            return {
              label: style.label,
              data: value,
              borderWidth: style.borderWidth,
              borderColor: style.borderColor,
              backgroundColor: style.backgroundColor,
            };
          }),
        };
        setter(formattedChartData);
      });
  };

  useEffect(() => {
    const barChartStyle = new GraphStyle(
      'Sum of all expenses',
      2,
      '#8e060f',
      '#f13a37'
    );
    updateChart(
      setFormattedBarChartData,
      'expenses',
      'year',
      'sumExpenses',
      barChartStyle
    );
  }, []);

  useEffect(() => {
    const lineChartStyle = new GraphStyle(
      'Sum of all income',
      3,
      'green',
      'black'
    );
    updateChart(
      setFormattedLineChartData,
      'income',
      'month',
      'sumIncome',
      lineChartStyle
    );
  }, []);

  useEffect(() => {
    const doughnutChartStyle = new GraphStyle('Cost', 0, '', [
      'black',
      'red',
      'green',
      'pink',
      'blue',
    ]);
    updateChart(
      setFormattedDoughnutChartData,
      'categorized-expense',
      'category',
      'cost',
      doughnutChartStyle
    );
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
