import React from "react";
import * as NfepApi from 'utils/NfepApi';
  
import {
    withStyles,   
    LinearProgress,
    Grid
  } from "material-ui";

  import PropTypes from "prop-types";

import chartCardStyle from "variables/styles/chartCardStyle";

import { 
  ItemGrid, 
   BugChartCard,
  BugTimeChartCard,
 } from "components";

 
 import dashboardStyle from "variables/styles/dashboardStyle";
class Statistics extends React.Component {

  state = {    
    //statisticBySeverity: [],
    //statisticByState: [],    
    //statisticByCustomer: [],   
    //statisticByModule: [],
   // bugList: [], 
  };


  componentDidMount(){       
    NfepApi
    .getStatisticSeverity(true).then((bugsresult) => {       
      this.setState({
        statisticBySeverity: bugsresult        
      })      
    });
    
    NfepApi
    .getStatisticState(true).then((bugsresult) => {       
      this.setState({
        statisticByState: bugsresult        
      })      
    });

    NfepApi
    .getStatisticCustomer(true).then((bugsresult) => {       
      this.setState({
        statisticByCustomer: bugsresult        
      })      
    });

    NfepApi
    .getStatisticModule(true).then((bugsresult) => {       
      this.setState({
        statisticByModule: bugsresult        
      })      
    });

    NfepApi
    .getBugs(true).then((bugsresult) => {       
      this.setState({
        bugList: bugsresult        
      })      
    });
     
  }
  
  render() {    
    return (            
        <div>
          <Grid container alignItems="center">          
            <ItemGrid xs={12} sm={6} md={6} >
            {this.state.statisticBySeverity ? 
            <BugChartCard  
                chartColor="blue"
                title="Bugs by Severity"                
                dataValue={this.state.statisticBySeverity}
                columName="Severity"              
                />            
          : <LinearProgress />          
            }
          </ItemGrid>          

          
          <ItemGrid xs={12} sm={6} md={6}>
            {this.state.statisticByState ?
            <BugChartCard  
                chartColor="blue"
                title="Bugs by State"                
                dataValue={this.state.statisticByState}
                columName="State"              
                />
            :<LinearProgress />
            }
          </ItemGrid>
          </Grid> 

          <Grid container>
          <ItemGrid xs={12} sm={6} md={6}>
            {this.state.statisticByCustomer ?
            <BugChartCard  
                chartColor="red"
                title="Bugs by Customer"                
                dataValue={this.state.statisticByCustomer}
                columName="Customer"              
                />
            : <LinearProgress />
            }
          </ItemGrid>

          <ItemGrid xs={12} sm={6} md={6}>
            {this.state.statisticByModule ?
            <BugChartCard  
                chartColor="red"
                title="Bugs by Module"                
                dataValue={this.state.statisticByModule}
                columName="Module"              
                />
            : <LinearProgress />
            }
          </ItemGrid>
          </Grid> 

          <Grid container >
          <ItemGrid xs={12} sm={12} md={12}>
            {this.state.bugList ?
            <BugTimeChartCard  
                chartColor="red"
                title="Days Still Open"                
                dataValue={this.state.bugList}                
                />
            : <LinearProgress />
            }
          </ItemGrid>
          </Grid>
               
          </div>        
    );
  }
}
  
export default Statistics;
