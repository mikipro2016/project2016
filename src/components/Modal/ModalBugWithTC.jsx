import React from 'react';
import Button from 'material-ui/Button';
import CheckBox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { getBugs, getBug, postBug, getTestCase } from 'utils/NfepApi';
import { BugReport, Code, Cloud, Edit, OpenInBrowser, Delete } from "material-ui-icons";
import TestCaseList from '../Modal/TestCaseList.jsx';
import storeTestCase from 'reducers/storeTestCase.js';

import {
  withStyles,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  IconButton,  
  Tooltip,
} from "material-ui";

import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';
import { 
    RegularCard, 
    ItemGrid,     
    TableBugs,    
    IconButton as SearchButton, 
    CustomButtons,
    CustomInput, 
    UpdateTestResultDialog,
    SnackbarContent,
    Snackbar,
    SearchInput
   } from "components";

async function handlePostBug(tfsId) {
    try {
      return await postBug(this.state.bug.TfsId).then(
        res => {       
      console.log("res: ", res)     
    })}    
    catch (error) {
    }    
  };

  async function handleGetTestCases(testCaseId) {
    
      return await getTestCase(testCaseId)
       
  };

class ModalBugWithTC extends React.Component {
  state = {    
    bug: {},    
    testcase: [],
    Message: []
    
  };

  handleAddRelationBugTestCase = () => {    
    var VersionSites = [];
    var listTestCases = [];
    var newTestCase =[];
    
     if(this.state.bug.Name) {
       var bugId = this.state.bug.TfsId
       this.state.testcase.forEach(function(testCase) {         
         var VersionSites = [];       
          testCase.Versions.forEach(function(version) {
            VersionSites.push({Version: version});
          }, this)
        listTestCases.push({Name: testCase.Name,VersionSites: VersionSites});      
      }, this);
    
    newTestCase.push({"BugId": bugId, TestCases: listTestCases});

    var relation = new Object(newTestCase);    
     }   

    console.log("object print: ", relation)         
  };

  handleSearchBug = (searchTerm) => {
    getBug(searchTerm).then((bug) => {      
        this.setState({ bug: bug })
           console.log("Bug: ", this.state.bug)           
    });    
  }

  handleSearchTestCase = async(searchTerm) => {
    var listTestCases = searchTerm.split(",");
    var newTests = new Array();
    var newMessages = new Array();
    for(var i = 0; i< listTestCases.length;i++)  {
      await getTestCase(listTestCases[i]).then((testcase) => {
        if(testcase.Name) {          
          newTests.push(testcase);
        }
        if(testcase.Message) {          
          newMessages.push(testcase);            
        }
      });
    }
    this.setState({ testcase: newTests })           
    this.setState({ Message: newMessages })
    
    this.addToTestCaseList(this.state.testcase)
  }

 displayResultBug = () => {    
    if(this.state.bug.Message) {
       return (<div>{this.state.bug.Message}</div>
    )} 
    if(this.state.bug.Name) {
       return ( <div>{this.state.bug.Name}</div>
    )}      
  }


  editVersions = (event) => {
    console.log("testCase on click: ", event)
  }

  changeVersion = (event, version) => {
    var checked = event.target;
    console.log("checked value: ", checked)
    // var testcase = testcase.Versions
    // if(checked) {
    //   this.setState({Version: testcase.})
    // }
  }

  addToTestCaseList = (testCase) => {
    storeTestCase.dispatch({
      type: "ADD_TO_TESTCASE_LIST",
      testCase
    })
  } 

  render() {
    const { classes, testResult } = this.props;
    return (
      <div>                 
            <label >Bug:</label>                                 
            <SearchInput handleSearch={this.handleSearchBug} />
              {this.displayResultBug()}
             <p></p>            

            <label>Test Cases:</label>
            
            <SearchInput handleSearch={this.handleSearchTestCase} />
              
              <TestCaseList />
        
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddRelationBugTestCase} color="primary">
              Register
            </Button>
          
      </div>
    );
  }
}
export default ModalBugWithTC;


  // displayResultTestCase = () => {
  //   return (
  //     <div>
  //       <Table >
  //         {this.state.testcase !== undefined ? (
  //         <TableHead >
  //           <TableRow>
  //                 <TableCell>
  //                   Title
  //                 </TableCell>
  //                  <TableCell>
  //                   Versions
  //                 </TableCell>
  //                  <TableCell>
  //                   Save
  //                 </TableCell>                
  //           </TableRow>
  //         </TableHead>
  //       ) : null}
  //       <TableBody>
  //         {this.state.testcase
  //             .map((testcase) => {
  //           return (
  //             <TableRow hover key={Math.random()}>
  //               <TableCell >                 
  //                 {testcase.Name}
  //               </TableCell>

  //               <TableCell >
  //               <table className = "center" >
  //                    <CheckBox label="2014" />
  //                    <CheckBox label="2015" />
  //                    <CheckBox label="2017" />
  //                   </table>
  //               </TableCell>                                

  //               <TableCell >
  //               <Button  
  //                 label="Save"                                      
  //                   onClick={this.editVersions()}
  //                 >                    
  //                 Save</Button>                 
  //               </TableCell>                                
  //             </TableRow>
  //           );
  //         })}
  //       </TableBody>
  //     </Table>
  //   </div>
  //   )
  // }