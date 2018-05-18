import React from "react";
import PropTypes from "prop-types";

import { withStyles, Grid } from "material-ui";

import {
  ItemGrid,
  TotalExecutionChartCard,
} from "components";

import dashboardStyle from "variables/styles/dashboardStyle";

import * as VstsAPI from 'utils/VstsAPI'


class Report extends React.Component {
    
    state = {
        totalTestcases: 0,
        passedTestcases: 0,
        failedTestcases: 0,
        testPlanName: "Test Plan",
        runId: 3158,
        testResults: [],
        tagsResult: [],
        failedTestsList: []
    }

componentDidMount() {

    VstsAPI
        .getTestRun(this.state.runId)
        .then(value => {
            this.setState({ 
                totalTestcases: value.totalTests,
                passedTestcases: value.passedTests,
                failedTestcases: value.totalTests - value.passedTests,
                testPlanName: value.plan.name
            })
        })    
    }

  render() {
    return (
      <div>       

        <Grid container>
          <ItemGrid xs={12} sm={12} md={6}>
            <TotalExecutionChartCard   
                chartColor="blue"
                title="Total Execution"                
                passed={this.state.passedTestcases}
                failed={this.state.failedTestcases}
                />
          </ItemGrid>
        </Grid>

        

      </div>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Report);
