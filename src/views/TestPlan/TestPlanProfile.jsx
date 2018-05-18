import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import { withStyles, Grid } from "material-ui";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { FeaturedPlayList } from "material-ui-icons";

import {
    RegularCard,
    ItemGrid
  } from "components";

import dashboardStyle from "variables/styles/dashboardStyle";

import { getTestPlan, getTestRuns } from 'utils/NfepApi';



class TestPlanProfile extends React.Component {

    state = {
      testplan: {},
      testRuns: [],
    }

    componentDidMount() {
      const { match } = this.props
        getTestPlan(match.params.id).then((plan) => {
          //console.log("TestPlanProfile plan", plan)
          this.setState({
            testplan: plan
          })
        }); 

        getTestRuns(match.params.id).then((runs) => {
          //console.log("TestPlanProfile runs", runs)
          this.setState({
            testRuns: runs
          })
        }); 
    }

render() {
  //console.log("TestPlanProfile props", this.props)

return (
  <div>
      <RegularCard
        headerColor="blue"
        cardTitle="Test Plan List"
        cardSubtitle="Select a Test Plan to see the Test Suites reports"
        content={
          <List component="nav">
            {this.state.testRuns.map(run => 
              // console.log(plan.name)
              <Link
                to={`/testplans/${this.state.testplan.Id}/runs/${run.Id}/report`}
                key={run.Id}                      
              >
                <ListItem
                  key={run.Id} 
                  button
                  divider={true}
                >
                  <ListItemIcon><FeaturedPlayList /></ListItemIcon>
                  <ListItemText primary={run.Name} />
                </ListItem>    
              </Link>              
             )}
          </List>
        }
      />      

      </div>
    );
  }
}

TestPlanProfile.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default compose(
//   withStyles(dashboardStyle),
//   connect(mapStateToProps, mapDispatchToProps)
// )(TestPlanIndex);

export default withStyles(dashboardStyle)(TestPlanProfile)

