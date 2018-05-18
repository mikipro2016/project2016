import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
import {
  ContentCopy,
  Store,
  InfoOutline,
  Warning,
  DateRange,
  LocalOffer,
  Update,
  ArrowUpward,
  AccessTime,
  Accessibility,
  Done,
  Storage,
} from "material-ui-icons";
import { withStyles, Grid } from "material-ui";

import {
  StatsCard,
  ChartCard,
  TasksCard,
  RegularCard,
  Table,
  ItemGrid,
  TotalExecutionChartCard,
  ModulesBarChartCard
} from "components";

import {
  dailySalesChart,
  emailsSubscriptionChart,
  completedTasksChart
} from "variables/charts";

import dashboardStyle from "variables/styles/dashboardStyle";

import * as VstsApi from 'utils/VstsApi'
import * as NfepApi from 'utils/NfepApi'
import FailedListTable from "../TableList/FailedListTable";

class Report extends React.Component {
    
    state = {
        totalTestcases: 0,
        passedTestcases: 0,
        failedTestcases: 0,
        testPlanName: "Test Plan",
        runId: 0,
        testResults: [],
    }

    // getFailedTestList(testResults){
    //     let failedList = []

    //     testResults.forEach( (result, index) => {
    //         // Create the list of the failed testcases
    //         if (result.outcome !== "Passed") {            
    //             failedList.push(result)
    //         }
    //     })

    //     this.setState({
    //         failedTestsList: failedList
    //     })
    // }

    buildExecutionByModulesData(){      
        this.state.testResults.forEach( (result, index) => {
            // Get the testcase details
            VstsApi
                .getWorkItem(result.testCase.id)        
                .then(test => {
                    // Get the tags for each test case and create the report by module
                    test.tags.forEach( (tag, index) => {
                        let tempTags = this.state.tagsResult;
                        let mod = {};
                        let modIndex = tempTags.findIndex( t => t.name === tag);

                        if (modIndex < 0) {
                            mod = { name: tag,
                                    passed: 0,
                                    failed: 0}    
                        } else {
                            mod = tempTags[modIndex];
                        }
                    
                        if (result.outcome === "Passed") {
                            mod.passed++
                        } else {
                            mod.failed++
                        }

                        tempTags = tempTags.filter( t => t.name !== tag);
                        tempTags.push(mod);

                        this.setState({
                            tagsResult: tempTags
                        })                        
                    })
                })
        })
    }

// componentWillMount() {
//     console.log("Report props componentWillMount", this.props)

//     const { match } = this.props;
//     const { planId, runId } = match.params;
//     console.log("run run planId", planId)
//     console.log("run run runId", runId)

//     NfepApi
//         .getTestRun(planId, runId)
//         .then((run) => {
//             console.log("run run run", run)
//             this.setState({
//                 runId: run.VstsRuntId
//             })
//         })
// }

componentDidMount() {
    console.log("Report state componentDidMount", this.state)

    const { match } = this.props;
    const { planId, runId } = match.params;
    console.log("run run planId", planId)
    console.log("run run runId", runId)

    NfepApi
        .getTestRun(planId, runId)
        .then((run) => {
            console.log("run run run", run)
            this.setState({
                runId: run.VstsRuntId
            })

            VstsApi
                .getTestRun(run.VstsRuntId)
                .then(value => {
                    this.setState({ 
                        totalTestcases: value.totalTests,
                        passedTestcases: value.passedTests,
                        failedTestcases: value.totalTests - value.passedTests,
                        testPlanName: value.plan.name
                    })
                })
    
            VstsApi
                .getTestResults(run.VstsRuntId)
                .then(vstsTestResults => {
                    //console.log("vstsTestResults 1", vstsTestResults[0])
                    //console.log("vstsTestResults 1 comment", vstsTestResults[0].comment)
                    //console.log("vstsTestResults 1 comment json", JSON.parse(vstsTestResults[0].comment))

                    
                    


                    this.setState({
                        testResults: vstsTestResults,
                        failedTestsList: vstsTestResults.filter((r) => r.outcome !== "Passed")
                    })
                })
                // .then( data => {
                //     this.buildExecutionByModulesData()            
                // })  
        })

    }

  render() {
      console.log("Report render state.failedTestsList", this.state.failedTestsList)
    return (
      <div>
        <Grid container>

          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Done}
              iconColor="green"
              title="Passed"
              description={this.state.passedTestcases}
              statIcon={DateRange}
              statText="Test Cases Passed in the execution"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={InfoOutline}
              iconColor="red"
              title="Failed"
              description={this.state.failedTestcases}
              statIcon={LocalOffer}
              statText="Test Cases Failed in the execution"
            />
          </ItemGrid>
          <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
              icon={Storage}
              iconColor="blue"
              title="Total"
              description={this.state.totalTestcases}
              statIcon={Update}
              statText="Wow! that's a lot of Test Cases"
            />
          </ItemGrid>

        <ItemGrid xs={12} sm={6} md={3}>
            <StatsCard
            icon={AccessTime}
            iconColor="orange"
            title="Time Execution"
            description={this.state.totalTestcases}
            statIcon={AccessTime}
            statText="It's real!"
            />
        </ItemGrid>


        </Grid>

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

{this.state.tagsResult && 
        <Grid container>
          <ItemGrid xs={12} sm={12} md={12}>
            <ModulesBarChartCard   
                title="Execution By Module"                
                tagsResult={this.state.tagsResult}
            />
          </ItemGrid>
        </Grid>
}


{this.state.failedTestsList && 
        <Grid container>
            <FailedListTable runId={this.state.runId} failedTestList={this.state.failedTestsList} />
        </Grid>
}

      </div>
    );
  }
}

Report.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Report);
