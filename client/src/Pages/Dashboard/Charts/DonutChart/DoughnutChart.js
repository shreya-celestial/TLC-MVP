import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Box,useMediaQuery } from '@mui/material';
import { useStyles } from './DoughnutChart.styles';

const DoughnutChart = () => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const chartRef = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
  // chart labels and data
  const label = ['January', 'Febuary', 'March', 'April', 'May', 'June'];
  const chartData = [10, 20, 30, 40, 50, 60];

  useEffect(() => {
    if (chartInstance) {
      chartInstance.destroy();
    }

    const barValue = {
      id: 'barValue',

      afterDatasetsDraw(chart) {
        const { ctx, data } = chart;
        const datasets = data.datasets;
        ctx.save();
        ctx.font = ' 12px Inter';
        ctx.fillStyle = '#fff';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        datasets.forEach((dataset, datasetIndex) => {
          const meta = chart.getDatasetMeta(datasetIndex);

          meta.data.forEach((element, index) => {
            const value = dataset.data[index];
            const arc = element;

            const centerX = arc.x;
            const centerY = arc.y;
            const startAngle = arc.startAngle;
            const endAngle = arc.endAngle;
            const innerRadius = arc.innerRadius;
            const outerRadius = arc.outerRadius;
            const middleAngle = (startAngle + endAngle) / 2;

            const xOffset =
              (Math.cos(middleAngle) * (innerRadius + outerRadius)) / 2;
            const yOffset =
              (Math.sin(middleAngle) * (innerRadius + outerRadius)) / 2;

            ctx.fillText(value, centerX + xOffset, centerY + yOffset);
          });
        });
      },
    };

    const textCenter = {
      id: 'textCenter',
      beforeDatasetsDraw(chart) {
        const { ctx, data } = chart;

        ctx.save();
        ctx.font = 'bold 12px Inter';
        ctx.textAlign = 'center';
        ctx.fillStyle = '#2F2F2F';
        ctx.textBaseLine = 'middle';

        const totalSum = data.datasets.reduce((acc, dataset) => {
          return (
            acc +
            dataset.data.reduce(
              (total, currentValue) => total + currentValue,
              0
            )
          );
        }, 0);
        ctx.fillText(
          `Enrollments: ${totalSum}`,
          chart.getDatasetMeta(0).data[0].x,
          chart.getDatasetMeta(0).data[0].y
        );
      },
    };
    const newChartInstance = new Chart(chartRef.current, {
      type: 'doughnut',
      data: {
        labels: label,
        datasets: [
          {
            label: 'Enrollments',
            data: chartData,
            backgroundColor: [
              '#4CB140',
              '#14B8A6',
              '#D14343',
              '#DF8244',
              '#9580C5',
              '#4E73BE',
            ],

            cutout: '75%',
            borderRadius: 10,
          },
        ],
      },
      options: {
        layout: {
          padding: isSmScreen ? 0 : 20,
        },
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
          },
        },
      },
      plugins: [barValue, textCenter],
    });

    setChartInstance(newChartInstance);

    return () => {
      if (newChartInstance) {
        newChartInstance.destroy();
      }
    };
  }, []);
  const classes = useStyles();
  return (
    <Box className={classes.root}>
      <Box className={classes.chart}>
        <canvas ref={chartRef} />
      </Box>
      <Box className={classes.labelBox}>
        {['#4CB140', '#14B8A6', '#D14343', '#DF8244', '#9580C5', '#4E73BE'].map(
          (item, index) => (
            <Box variant="body2" className="label" key={index}>
              <Box
                className={classes.customLegend}
                sx={{ background: `${item}` }}
              ></Box>
              {label[index]}
            </Box>
          )
        )}
      </Box>
    </Box>
  );
};

export default DoughnutChart;
