import React from "react";
import { Grid } from "material-ui";
import { Search, AddAlert } from "material-ui-icons";
import classNames from "classnames";

import * as VstsAPI from 'utils/VstsApi'

import { 
  RegularCard, 
  TableFailedTests, 
  ItemGrid, 
  Modal, 
  IconButton as SearchButton, 
  CustomInput, 
  UpdateTestResultDialog,
  SnackbarContent,
  Snackbar,
  SearchInput
 } from "components";

 

class FailedListTable extends React.Component {

  state = {
    showModal: false,
    failedTestList: [],
    filteredFailedTestList: [],
    testResultToUpdate: {}, 
    alertMessage: "",   
    searchTerm: "",    
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

handleUpdateTestResult = (testResult) => {
    VstsAPI
        .updateTestResult(this.props.runId , testResult)
        .then(data => {
            if (data.count){
                // Close the Update Form when test result was updated
                this.handleUpdateFailedList(testResult)             
                this.closeUpdateForm();
                this.setState({
                    alertType: "success",
                    alertMessage: `Test Result [ ${testResult.id} ] was updated.` ,                    
                })    
                this.showNotification();

                // // Get the test result updated and update the failed list
                // VstsAPI
                //     .getTestResult(this.props.runId , patchTestResult.id)
                //     .then(testResult => {
                //         this.setState({
                //             alertType: "success",
                //             alertMessage: `Test Result [ ${testResult.id} ] was updated.` ,
                //             showAlert: true
                //         })   
        
                //         this.handleUpdateFailedList(testResult)
                //     })                

            } else {
                this.setState({
                    alertType: "warning",
                    alertMessage: data.message,                    
                })                          
                this.showNotification();
            }
        })  
}

handleUpdateFailedList = (testResult) => {
    let failedList = this.state.failedTestList.filter( tr => tr.id !== testResult.id)

    if (testResult.outcome === "Passed" && testResult.state === "Completed") {
        console.log(">>>>>>>>> handleUpdateFailedList testResult passed and completed")
    } else {
      failedList.push(testResult)
    }
    
    this.setState({
        failedTestList: failedList,
        filteredFailedTestList: this.filterTestResultList(failedList, this.state.searchTerm),
    })
}

showUpdateTestResultForm = (testResult) => {
  //console.log("FailedListTable show modal", testResult)

  this.setState({
    testResultToUpdate: testResult,
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
    filteredFailedTestList: this.filterTestResultList(this.state.failedTestList, searchTerm),    
  })
}

filterTestResultList = (testResultList, searchTerm) => {
  const filteredList = testResultList.filter(r => 
    r.comment.indexOf(searchTerm) > -1 || 
    r.computerName.indexOf(searchTerm) > -1 ||
    r.errorMessage.indexOf(searchTerm) > -1 ||
    r.owner.displayName.indexOf(searchTerm) > -1 ||          
    r.testCaseTitle.indexOf(searchTerm) > -1           
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

// fillFailedTest = (list) => {
//   console.log("FailedListTable fillFailedTest list", list)
  
//     this.setState({
//         failedTestList: list
//     })
// }

componentDidMount() {
  //console.log("FailedListTable componentDidMount props", this.props)
  this.setState({
    failedTestList: this.props.failedTestList,
    filteredFailedTestList: this.props.failedTestList,
  })
}

  render() {
    //console.log("FailedListTable props", this.props)
    //console.log("FailedListTable state", this.state)
    // this.fillFailedTest(this.props.failedTestList)
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
          <RegularCard
            headerColor="green"
            cardTitle="Failed Test Cases"
            cardSubtitle=
            {
              <SearchInput 
                handleSearch={this.handleSearch}
              />
            }

            content={
              <TableFailedTests
                tableHeaderColor="info"
                tableHead={["Machine", "Test Case", "Bug Related", "Comments" ,"", "Assigned"]}
                tableData={this.state.filteredFailedTestList}
                showUpdateTestResultForm={this.showUpdateTestResultForm}
              />
            }
          />
        </ItemGrid>    

          {this.state.showModal &&
            <Modal 
              open={this.state.showModal}
              runId={this.props.runId}
              testResult={this.state.testResultToUpdate} 
              closeUpdateForm={this.closeUpdateForm} 
              handleUpdateTestResult={this.handleUpdateTestResult} 
            />   
            // <UpdateTestResultDialog 
            //   open={this.state.showModal}
            //   runId={this.props.runId}
            //   testResult={this.state.testResultToUpdate} 
            //   closeUpdateForm={this.closeUpdateForm} 
            //   handleUpdateTestResult={this.handleUpdateTestResult} 
            // />   
          }   
                  
      </Grid>
    );
  }
}

export default FailedListTable;
