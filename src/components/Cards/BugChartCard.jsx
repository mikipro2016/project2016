import React from "react";
import { Grid } from "material-ui";
import classNames from "classnames";
import { getStatisticSeverity } from 'utils/NfepApi';
import { getStatisticState } from 'utils/NfepApi';
import { getStatisticCustomer } from 'utils/NfepApi';
import { Chart } from 'react-google-charts';
import ChartistGraph from "react-chartist";

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

function BugChartCard ({ ...props }) {
    const {
      classes,
      title,            
      dataValue,
      columName,
    } = props;

    const chartValues = (columnName,dataValue, title) => {      
      var arrayData = [[columnName,"Bugs"]];
      var totalBug = 0;
      dataValue.map(t =>
        arrayData.push([t.value,t.count])        
      );
      dataValue.forEach(element => {
        totalBug += element.count
      });      

      let info = {
          options: {
          pieHole: 0.4,
          is3D: true ,          
          },
          data: arrayData,
          totalBugs : totalBug
        }        
        return info
      }    

      const chartie = chartValues(columName, dataValue, title)      
    
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
        Total Bugs {chartie.totalBugs}
  
        </CardContent>
  
      </Card>
    );
  }

  BugChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.node,
    text: PropTypes.node,
  };


  export default withStyles(chartCardStyle)(BugChartCard);
