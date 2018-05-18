import React from "react";
import { Chart } from 'react-google-charts';

import {
  withStyles,
  Card,
  CardContent,
  CardHeader,
  CardActions,
  Typography
} from "material-ui";
import PropTypes from "prop-types";

import chartCardStyle from "variables/styles/chartCardStyle";

function TotalExecutionChartCard({ ...props }) {
  const {
    classes,
    title,
    passed,
    failed,
  } = props;
  
  const chartValues = (testsPassed, testFailed) => {
    let info = {
      options: {
        pieHole: 0.4,
        colors: ['#40ACB4', '#E73131'],
        pieSliceText:'value',
      },
      data: [
        ['Status', 'Test Cases'],
        [`Passed - ${testsPassed} TC`, testsPassed],
        [`Failed - ${testFailed} TC`, testFailed],
      ]
    }
    return info
  }

  const chartie = chartValues(passed, failed)

  return (   


<Card className={classes.card}>
      
      <CardContent className={classes.textAlign}>
        <Typography component="h4" className={classes.cardTitle}>
            {title}
        </Typography>
        
        <Chart
          chartType="PieChart"
          data={chartie.data}
          options={chartie.options}
          graph_id={title}
          width="100%"
          height="300px"
          legend_toggle
        />

      </CardContent>

    </Card>
  );
}


TotalExecutionChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  text: PropTypes.node,
};

export default withStyles(chartCardStyle)(TotalExecutionChartCard);
