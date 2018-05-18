import React from "react";
import { Grid } from "material-ui";
import classNames from "classnames";
import { getStatisticSeverity } from 'utils/NfepApi';
import { getStatisticState } from 'utils/NfepApi';
import { getStatisticCustomer } from 'utils/NfepApi';
import { Chart } from 'react-google-charts';
import ChartistGraph from "react-chartist";
import date from 'date-and-time';
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
import blue from "material-ui/colors/blue";


function calculateDate(dateToConvert)
{
  let now = new Date();
  let dateBug = new Date(dateToConvert);
   return date.subtract(now, dateBug).toDays();
}

function BugTimeChartCard ({ ...props }) {
    const {
      classes,
      title,            
      dataValue,      
    } = props;

    const chartValues = (dataValue, title) => {      
      var arrayData = [["Element","Open Days",{role: "style"}]];
      var totalBug = 0;
      dataValue.map(t =>
        arrayData.push(["ID " + t.TfsId,calculateDate(t.CreatedDate), 
        calculateDate(t.CreatedDate) > 400 ? "#ff5c33" : "#76A7FA"])        
      );
     
      let info = {
          options: {
          is3D: true,
          bar: {"groupWidth":"95%"},
          legend: {"position":"none"                  
                },
          hAxis: {
            title: 'Bugs Reported'    
                },
          vAxis: {
            title: 'Days Still Open',
            minValue: 0            
            },
            bar: { groupWidth: "35%" },            
          },          
          data: arrayData,          
        }        
        return info
      }    

      const chartie = chartValues(dataValue, title)         
    return (
        <Card className={classes.card}>
      
        <CardContent className={classes.textAlign}>
          <Typography component="h4" className={classes.cardTitle}>
              {title}
          </Typography>
          
          <Chart
          chartType="ColumnChart"
          data={chartie.data}
          options={chartie.options}          
          graph_id={title}
          width="100%"
          height="400px"  
          legend={chartie.legend}
          
        />
        Total Bugs {chartie.totalBugs}
  
        </CardContent>
  
      </Card>
    );
  }

  BugTimeChartCard.propTypes = {
    classes: PropTypes.object.isRequired,
    title: PropTypes.node,
    text: PropTypes.node,
  };


  export default withStyles(chartCardStyle)(BugTimeChartCard);
