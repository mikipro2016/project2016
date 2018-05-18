import React from "react";
import PropTypes from "prop-types";
import { Link, Route } from "react-router-dom";

import { withStyles, Grid } from "material-ui";
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import { FeaturedPlayList } from "material-ui-icons";
import FailedListTable from "../TableList/FailedListTable";
import BugListTable from "../TableList/BugListTable";

import {
    RegularCard,
    ItemGrid
  } from "components";

import dashboardStyle from "variables/styles/dashboardStyle";





class BugsIndex extends  React.Component {

    

    /*componentDidMount() {
        getBugs().then((buglist) => {
          console.log("bugs-----", buglist)
          this.setState({
            bugs: buglist
          })
        }); 
    }*/

render() {
  

return (/*
  <div>
      <RegularCard
        headerColor="blue"
        cardTitle="Bugs"
        cardSubtitle="Select a Bug to see details"
        content={
          <List component="nav">
            {this.state.bugs.map(bug =>               
              <Link
                to={`/bugs/${bug.TfsId}`}
                key={bug.TfsId}                      
            >
                <ListItem
                  key={bug.TfsId} 
                  button
                  divider={true}
                >
                  <ListItemIcon><FeaturedPlayList /></ListItemIcon>
                  <ListItemText primary={bug.Name} />
                </ListItem>                
              </Link>              
             )}
          </List>
        }
      />      

      </div>*/
      <div>         
        <Grid container>
            <BugListTable  />
        </Grid>
         

     </div>
    );
  }
}

BugsIndex.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(BugsIndex)

