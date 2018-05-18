import React from "react";
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

import {
  A,
} from 'components';

import { BugReport, Code, Cloud, Edit, OpenInBrowser, Delete } from "material-ui-icons";

import PropTypes from "prop-types";

import tableStyle from "variables/styles/tableStyle";

function TableBugTC({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;

  const showUpdateBugTestCase = (testResult, event) => {  
    console.log("TableBugTC clik edit", testResult)  
    event.preventDefault();        
    console.log("TableBugTC display prop edit", props);
    props.showUpdateBugTestCase(testResult, event)  
  
  }

  const handleButtonToVstsResult = (event) =>{
    event.preventDefault();  
  }

  // closeUpdateForm = () => {
  //   this.setState({showModal: false});
  // }

  return (
    
    <div className={classes.tableResponsive}>
      <Table className={classes.table}>
        {tableHead !== undefined ? (
          <TableHead className={classes[tableHeaderColor + "TableHeader"]}>
            <TableRow>
              {tableHead.map((prop, key) => {
                return (
                  <TableCell
                    className={classes.tableCell + " " + classes.tableHeadCell}
                    key={key}
                  >
                    {prop}
                  </TableCell>
                );
              })}
            </TableRow>
          </TableHead>
        ) : null}
        <TableBody>
          {tableData
              .sort((a, b) => a.BugTfsId > b.BugTfsId ? 
                              1 : (b.BugTfsId > a.BugTfsId ? -1 : 0))
              .map((result) => {
            return (
              <TableRow hover key={result.Id}>
                <TableCell className={classes.tableCell} key={result.Id + "TfsId"}>
                  {result.BugTfsId}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "BugTitle"}> 
                {result.BugTitle}               
                </TableCell>                
                <TableCell className={classes.tableCell} key={result.Id + "State"}>
                {result.State}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "TCAffected"}>
                <table className = "center" >  
                     <tbody>                       
                    {result.TestCases.map((item, index) => <tr key={index}><td>{item.Name}</td>                             
                     
                    </tr>
                )}
                    </tbody>
                    </table>
                </TableCell>                                

                <TableCell className={classes.tableCell} key={result.Id + "actions"}>
                <IconButton
                    className={classes.appResponsive}
                    color="inherit"
                    aria-label="Edit Relation Bug Test Case affected"
                    onClick={(e) => showUpdateBugTestCase(result, e)}
                  >
                    <Edit />
                  </IconButton>
                  <IconButton
                      className={classes.appResponsive}
                      color="inherit"
                      aria-label="Delete Relation Bug Test Case affected"
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
  );
}

TableBugTC.defaultProps = {
  tableHeaderColor: "gray"
};

TableBugTC.propTypes = {
  classes: PropTypes.object.isRequired,
  tableHeaderColor: PropTypes.oneOf([
    "warning",
    "primary",
    "danger",
    "success",
    "info",
    "rose",
    "gray"
  ]),
  tableHead: PropTypes.arrayOf(PropTypes.string),
  //tableData: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.string))
};

export default withStyles(tableStyle)(TableBugTC);
