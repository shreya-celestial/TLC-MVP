import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import { Box, useMediaQuery } from '@mui/material';
import { useStyles } from './DoughnutChart.styles';

const MONTHS = [
  'Jan',
  'Feb',
  'March',
  'April',
  'May',
  'June',
  'July',
  'Aug',
  'Sept',
  'Oct',
  'Nov',
  'Dec'
]

const DoughnutChart = ({ data }) => {
  const isSmScreen = useMediaQuery((theme) => theme.breakpoints.down('sm'));
  const chartRef = useRef(null);
  const [dataObj, setDataObj] = useState({})
  const [chartInstance, setChartInstance] = useState(null);
  const date = new Date((new Date()).setMonth((new Date()).getMonth() - 5))

  useEffect(() => {
    if (data) {
      const obj = {}
      for (let i = date.getMonth(); i < date.getMonth() + 6; i++) {
        let comp;
        if (i > 12) {
          comp = i - 12
        }
        else {
          comp = i
        }
        const count = data?.data?.past_six_months_enrollments?.filter((enrollment) => {
          const date = new Date(enrollment?.created_at)
          return (date.getMonth() + 1) === comp
        })
        obj[`${MONTHS[comp - 1]}`] = count?.length
      }
      setDataObj(() => obj)
    }
  }, [data])

  // chart labels and data
  const label = Object.keys(dataObj);
  const chartData = Object.values(dataObj)

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
            data: chartData?.length ? chartData : [0, 0, 0, 0, 0, 0],
            backgroundColor: [
              '#4CB140',
              '#14B8A6',
              '#D14343',
              '#DF8244',
              '#9580C5',
              '#4E73BE',
            ],

            cutout: '75%',
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
  }, [dataObj]);
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
