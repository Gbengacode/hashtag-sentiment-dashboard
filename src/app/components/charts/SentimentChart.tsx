"use client";

import * as React from "react";
import { useTheme } from "@mui/material/styles";
import { LineChart } from "@mui/x-charts/LineChart";
import { axisClasses } from "@mui/x-charts";
import { ChartsXAxis, ChartsYAxis } from "@mui/x-charts";
import { Box, Typography } from "@mui/material";

interface SentimentChartProps {
  data: {
    date: string;
    sentiment: number;
  }[];
}

const SentimentChart: React.FC<SentimentChartProps> = React.memo(({ data }) => {
  const theme = useTheme();

  const xLabels = React.useMemo(
    () =>
      data.map(item =>
        new Date(item.date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric"
        })
      ),
    [data]
  );

  const yValues = React.useMemo(() => data.map(item => item.sentiment), [data]);

  const minSentiment = Math.min(...yValues);
  const maxSentiment = Math.max(...yValues);
  const minIndex = yValues.indexOf(minSentiment);
  const maxIndex = yValues.indexOf(maxSentiment);

  const minSeries = Array(yValues.length).fill(null);
  minSeries[minIndex] = minSentiment;

  const maxSeries = Array(yValues.length).fill(null);
  maxSeries[maxIndex] = maxSentiment;

  return (
    <>
      <LineChart
        height={300}
        xAxis={[
          {
            id: "date",
            data: xLabels,
            label: "Date",
            scaleType: "band"
          }
        ]}
        yAxis={[
          {
            id: "sentiment",
            label: "Sentiment",
            min: -1,
            max: 1
          }
        ]}
        series={[
          {
            data: yValues,
            label: "Sentiment",
            color: theme.palette.primary.main
          },
          {
            data: minSeries,
            label: "Min Sentiment",
            color: theme.palette.error.main
          },
          {
            data: maxSeries,
            label: "Max Sentiment",
            color: theme.palette.success.main
          }
        ]}
        sx={{
          [`& .${axisClasses.left} .${axisClasses.label}`]: {
            transform: "translate(-10px, 0)"
          },
          [`& .${axisClasses.bottom} .${axisClasses.label}`]: {
            transform: "translate(0, 10px)"
          }
        }}
      >
        <ChartsXAxis label='Date' />
        <ChartsYAxis label='Sentiment' />
      </LineChart>

      <Box mt={2}>
        <Typography variant='body2' color='text.secondary' align='center'>
          Zoom and pan interactions are not yet available in Free MUI X Charts .
          Stay tuned for future releases!
        </Typography>
      </Box>

      <Box mt={1}>
        <Typography>
          Min Sentiment:{" "}
          <span style={{ color: theme.palette.error.main }}>
            {minSentiment.toFixed(2)} on {xLabels[minIndex]}
          </span>
        </Typography>
        <Typography>
          Max Sentiment:{" "}
          <span style={{ color: theme.palette.success.main }}>
            {maxSentiment.toFixed(2)} on {xLabels[maxIndex]}
          </span>
        </Typography>
      </Box>
    </>
  );
});

SentimentChart.displayName = "SentimentChart";

export default SentimentChart;
