import React from "react";
import PropTypes from "prop-types";
import { Switch, Route, Redirect } from "react-router-dom";
// creates a beautiful scrollbar
import PerfectScrollbar from "perfect-scrollbar";
import "perfect-scrollbar/css/perfect-scrollbar.css";
import { withStyles } from "material-ui";

import { Header, Footer, Sidebar } from "components";

import Home from "views/Home/Home";
import TestPlanIndex from "views/TestPlan/TestPlanIndex";
import TestPlanProfile from "views/TestPlan/TestPlanProfile";
import BugsIndex from "views/Bugs/BugsIndex";
import BugProfile from "views/Bugs/BugProfile";
import BugWithTCIndex from "views/BugWithTCs/BugWithTCIndex";

import Statistics from "views/Statistic/Statistics";

import Report from "views/TestSuite/Report";
import appRoutes from "routes/app.jsx";
import appStyle from "variables/styles/appStyle.jsx";
import image from "assets/img/sidebar-24.jpg";
import logo from "assets/img/autologo.png";

class App extends React.Component {
  state = {
    mobileOpen: false
  };
  
  render() {
    const { classes, ...rest } = this.props;
    console.log("APP ...rest", rest)
    return (
      <div className={classes.wrapper}>
        <Sidebar
          optionsBar={appRoutes}
          logoText={"Automation Team"}
          logo={logo}
          image={image}
          handleDrawerToggle={this.handleDrawerToggle}
          open={this.state.mobileOpen}
          color="red"
          {...rest}
        />
        <div className={classes.mainPanel} ref="mainPanel">
          <Header
            handleDrawerToggle={this.handleDrawerToggle}
            {...rest}
          />

          <Route exact path="/home" component={Home}/>   
          <Route exact path="/bugs" component={BugsIndex}/>   
          <Route exact path="/addbugs" component={BugProfile}/>
          <Route exact path="/bugtestcases" component={BugWithTCIndex}/>   
          <Route exact path="/testplans" component={TestPlanIndex}/>   
          <Route exact path="/testplans/:id" component={TestPlanProfile}/>      
          <Route exact path="/testplans/:planId/runs/:runId/report" component={Report}/>      
          <Route exact path="/statistics" component={Statistics}/>   
        </div>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(appStyle)(App);
