import React from "react";
import { Grid ,
  LinearProgress} from "material-ui";
import { Search, AddAlert} from "material-ui-icons";
import classNames from "classnames";
import { getBugs } from 'utils/NfepApi';

import { 
  RegularCard, 
  ItemGrid, 
  ModalAddBug,
  TableBugs,
  Button,
  IconButton as SearchButton, 
  CustomButtons,
  CustomInput, 
  UpdateTestResultDialog,
  SnackbarContent,
  Snackbar,
  SearchInput
 } from "components";

 

class BugListTable extends React.Component {

  state = {
    showModal: false,    
    testResultToUpdate: {}, 
    alertMessage: "",   
    searchTerm: "", 
    bugList: [],
    

  };    

  showNotification = () => {
    this.setState({
      showAlert: true
    });
    setTimeout(
      function() {        
        this.setState({
          showAlert: false
        });
      }.bind(this),
      6000
    );
  }


showUpdateTestResultForm = (testResult) => {
  //console.log("FailedListTable show modal", testResult)

  this.setState({
    testResultToUpdate: testResult,
    showModal: true,
  });
}

handleOpen = () => {
  //console.log("FailedListTable show modal", testResult)

  this.setState({
    showModal: true,
  });
}
closeUpdateForm = () => {
  this.setState({showModal: false});
}

handleCloseAlert = () => {
    this.setState({
        showAlert: false
    })
}

handleSearch = (searchTerm) => {
  this.setState({
    searchTerm: searchTerm,  
    filteredBugList: this.filterBugList(this.state.bugList, searchTerm),    
  })
  console.log("search ",this.state.filterBugList)
}

filterBugList = (bugResultList, searchTerm) => {
    const filteredList = bugResultList.filter(r => 
      r.TfsId.indexOf(searchTerm) > -1 || 
      r.Name.indexOf(searchTerm) > -1 ||
      r.Customer.indexOf(searchTerm) > -1 ||
      r.Severity.indexOf(searchTerm) > -1 ||          
      r.State.indexOf(searchTerm) > -1           
    )
  
    return filteredList;
  }

handleChange = (event, field) => {   
  let name = event.target.name;
  let value = event.target.value;

  this.setState({
      [name]: value 
  })
}

   componentWillMount(){     
    getBugs(true).then((buglist) => {      
      this.setState({
        bugList: buglist,
        filteredBugList:buglist
      })
    });   
  }

  render() {    
    return (
      <Grid container>

       <Snackbar
          place="tc"
          color={this.state.alertType}
          icon={AddAlert}
          message={this.state.alertMessage}
          open={this.state.showAlert}
          closeNotification={() => this.setState({ showAlert: false })}
          close
        />
      
        <ItemGrid xs={12} sm={12} md={12}>
          <Button onClick = {this.handleOpen} color="primary">Add Bug</Button>
          <RegularCard
            headerColor="orange"
            cardTitle="Bugs Blocking Automation execution"
            cardSubtitle=
            {
              <SearchInput 
                handleSearch={this.handleSearch}
              />
            }
            


            content={
              this.state.filteredBugList ?
              <TableBugs
                tableHeaderColor="info"
                tableHead={["TFS Id", "Bug Title", "Created", "Days Still Open", "Module" , "Status", "Severity", "Legacy"]}
                tableData={this.state.filteredBugList}
                showUpdateTestResultForm={this.showUpdateTestResultForm}
              />
              : <LinearProgress />
            }
          />          
        </ItemGrid>    

          {this.state.showModal &&
            <ModalAddBug 
              open={this.state.showModal}              
              closeUpdateForm={this.closeUpdateForm}               
            />               
          }   
                  
      </Grid>
    );
  }
}

export default BugListTable;
