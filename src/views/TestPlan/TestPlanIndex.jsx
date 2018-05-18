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

import { getTestPlans } from 'utils/NfepApi';



class TestPlanIndex extends React.Component {

    state = {
      testplans: []
    }

    componentDidMount() {
        getTestPlans().then((plans) => {
          //console.log("plans", plans)
          this.setState({
            testplans: plans
          })
        }); 
    }

render() {
  //console.log("test plan index props", this.props)

return (
  <div>
      <RegularCard
        headerColor="blue"
        cardTitle="Test Plan List"
        cardSubtitle="Select a Test Plan to see the Test Suites reports"
        content={
          <List component="nav">
            {this.state.testplans.map(plan => 
              // console.log(plan.name)
              <Link
                to={`/testplans/${plan.Id}`}
                key={plan.Id}                      
              >
                <ListItem
                  key={plan.Id} 
                  button
                  divider={true}
                >
                  <ListItemIcon><FeaturedPlayList /></ListItemIcon>
                  <ListItemText primary={plan.Name} />
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

TestPlanIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default compose(
//   withStyles(dashboardStyle),
//   connect(mapStateToProps, mapDispatchToProps)
// )(TestPlanIndex);

export default withStyles(dashboardStyle)(TestPlanIndex)

