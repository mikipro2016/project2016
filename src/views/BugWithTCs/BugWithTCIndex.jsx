import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import { withStyles, Grid } from "material-ui";
import { FeaturedPlayList } from "material-ui-icons";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import BugWithTCsListTable from "../TableList/BugWithTCsListTable";
import BugProfile from "../Bugs/BugProfile";
import { getBugs } from 'utils/NfepApi';
import {
    RegularCard,
    ItemGrid
  } from "components";

import dashboardStyle from "variables/styles/dashboardStyle";





class BugWithTCIndex extends  React.Component {

render() {
  

return ( 
      <div>         
        <Grid container>
            {/*<BugWithTCsListTable  />*/}
            <BugProfile  />
        </Grid>
     </div>
    );
  }
}

BugWithTCIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(BugWithTCIndex)

