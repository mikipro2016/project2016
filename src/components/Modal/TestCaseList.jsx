import React from 'react';
import Button from 'material-ui/Button';
import CheckBox from 'material-ui/Checkbox';
import TextField from 'material-ui/TextField';
import { getBugs, getBug, postBug, getTestCase } from 'utils/NfepApi';
import { BugReport, Code, Cloud, Edit, OpenInBrowser, Delete } from "material-ui-icons";
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

class TestCaseList extends React.Component {
  constructor(props) {
        super(props);
    this.state = {    
    testcase: []     
    };

  this.removeToTestCaseList = this.removeToTestCaseList.bind(this);
  }

  handleStoreTestCase = storeTestCase.subscribe( () => 
    {this.setState(
      {testcase: storeTestCase.getState().testcase}
    )}
  ) 

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
  }

  changeVersion = (event, version) => {
    var checked = event.target;
    console.log("checked value: ", checked)
    // var testcase = testcase.Versions
    // if(checked) {
    //   this.setState({Version: testcase.})
    // }
  }

  removeToTestCaseList = (testCase) => {
    storeTestCase.dispatch({
      type: "REMOVE_FROM_TESTCASE_LIST",
      testCase
    })
  }

  render() {
    const { classes, testResult } = this.props;
    return (
      <div>
        <Table >
          {this.state.testcase !== undefined ? (
          <TableHead >
            <TableRow>
                  <TableCell>
                    Title
                  </TableCell>
                   <TableCell>
                    Versions
                  </TableCell>
                   <TableCell>
                    Actions
                  </TableCell>                
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {this.state.testcase
              .map((testcase) => {
            return (
              <TableRow hover key={Math.random()}>
                <TableCell >                 
                  {testcase.Name}
                </TableCell>

                <TableCell >                
                     <CheckBox label="2014" />
                     <CheckBox label="2015" />
                     <CheckBox label="2017" />                
                </TableCell>                                

                <TableCell key="1">
                <Button  
                  label="Save"
                  >                    
                  Save</Button>  
                  <IconButton                      
                      color="inherit"
                      aria-label="Delete Relation Bug Test Case affected"
                      onClick={this.removeToTestCaseList(testcase)}
                    >
                      <Delete />
                    </IconButton>               
                </TableCell>                                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
    )
  }
}

export default TestCaseList;