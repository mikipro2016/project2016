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

function ModulesBarChartCard({ ...props }) {
  const {
    classes,
    title,
    tagsResult
  } = props;
  
  const chartValues = (tags) => {
    let modulesResult = tags.map( t => [t.name, t.passed, t.failed])
    modulesResult.unshift(['Module', 'Passed', 'Failed'])

    let info = {
        options: {
            series: {
                0: {targetAxisIndex: 0},
                1: {targetAxisIndex: 0}
            },
            vAxes: {
                // Adds titles to each axis.
                0: {title: 'Test Cases'},
                1: {title: 'Cases'}
            },
            colors: ['#40ACB4', '#E73131']        
        },
        data: modulesResult
    }
    return info
}

  const chart = chartValues(tagsResult)

  return (   


<Card className={classes.card}>
      
      <CardContent id="by_module" className="ct-chart">
        <Typography component="h4" className={classes.cardTitle}>
            {title}
          </Typography>
        
          <Chart
            chartType="ColumnChart"
            data={chart.data}
            options={chart.options}
            graph_id={title}
            width="100%"
            height="300px"
            legend_toggle 
          />

      </CardContent>

    </Card>
  );
}


ModulesBarChartCard.propTypes = {
  classes: PropTypes.object.isRequired,
  title: PropTypes.node,
  text: PropTypes.node,
};

export default withStyles(chartCardStyle)(ModulesBarChartCard);
