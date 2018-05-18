import React from "react";
import { 
  Grid,
  LinearProgress 
} from "material-ui";
import { Search, AddAlert} from "material-ui-icons";
import classNames from "classnames";
import { getBugWithTCs } from 'utils/NfepApi';

import { 
  RegularCard, 
  ItemGrid, 
  ModalBugWithTC,
  TableBugs,
  TableBugTC,
  Button,
  IconButton as SearchButton, 
  CustomButtons,
  CustomInput, 
  UpdateTestResultDialog,
  SnackbarContent,
  Snackbar,
  SearchInput
 } from "components";

 

class BugWithTCsListTable extends React.Component {

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


  showUpdateBugTestCase = (testResult) => {
  console.log("Bug with tstcaseTable show modal", testResult)

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
  console.log("search ",this.state.filteredBugList)
}

filterBugList = (bugResultList, searchTerm) => {      
    const filteredList = bugResultList.filter(r => 
      r.BugTfsId.indexOf(searchTerm) > -1 || 
      r.BugTitle.indexOf(searchTerm) > -1
      )                    
    console.log("fff", filteredList);
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
    getBugWithTCs().then((buglist) => {      
      this.setState({
        bugList: buglist,
        filteredBugList: buglist        
      })
    });   
  }

  render() {
    console.log("rnder states ", this.state.bugList)    
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
          <Button onClick = {this.handleOpen} color="primary">Add Bug and Test Case Affected</Button>
          <RegularCard
            headerColor="orange"
            cardTitle="Test Cases With Bugs"
            cardSubtitle=
            {
              <SearchInput 
                handleSearch={this.handleSearch}
              />
            }
            
            content={
              this.state.filteredBugList ?
              <TableBugTC
                tableHeaderColor="info"
                tableHead={["TFS Id", "Bug Title", "State", "Test Cases affected","Action"]}
                tableData={this.state.filteredBugList}
                showUpdateTestResultForm={this.showUpdateTestResultForm}
              />
              : <LinearProgress />
            }
          />          
        </ItemGrid>    

          {this.state.showModal &&
            <ModalBugWithTC 
              open={this.state.showModal}              
              closeUpdateForm={this.closeUpdateForm}
              testResult={this.state.testResultToUpdate}                             
            />               
          }   
                  
      </Grid>
    );
  }
}

export default BugWithTCsListTable;
