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

import { BugReport, Code, Cloud, Edit, OpenInBrowser } from "material-ui-icons";

import PropTypes from "prop-types";

import tableStyle from "variables/styles/tableStyle";
// import tasksStyle from "variables/styles/tasksStyle.jsx";



function TableFailedTests({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;

  const showUpdateTestResultForm = (testResult, event) => {
    console.log("TableFailedTests clik edit", testResult)
    event.preventDefault();        
  
    props.showUpdateTestResultForm(testResult, event)  
  
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
              .sort((a, b) => a.computerName > b.computerName ? 
                              1 : (b.computerName > a.computerName ? -1 : 0))
              .map((result) => {
            return (
              <TableRow key={result.id}>
                <TableCell className={classes.tableCell} key={result.id + "computerName"}>
                  {result.computerName}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.id + "AutomatedTestCaseName"}>

                  <Tooltip
                    id={result.id + "testCaseTitle"}
                    title={result.testCaseTitle}
                    placement="top-start"
                    classes={{tooltip:classes.tooltip}}
                  >       
                    <A 
                      href={`https://abilacollection.visualstudio.com/Abila/netFORUM%20-%20Automation/_workitems/edit/${result.testCase.id}`}
                      target="_blank"
                    >
                      {JSON.parse(result.comment).AutomatedTestCaseName}
                    </A>
                  </Tooltip>

                </TableCell>

                <TableCell className={classes.tableCell} key={result.id + "errorMessage"}>
                  {result.errorMessage}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.id + "Comment"}>
                  {JSON.parse(result.comment).Comment}
                </TableCell>

                <TableCell className={classes.tableCellIcons} key={result.id + "actions"}>
                  <IconButton
                    className={classes.appResponsive}
                    color="inherit"
                    aria-label="open update test result modal"
                    onClick={(e) => showUpdateTestResultForm(result, e)}
                  >
                    <Edit />
                  </IconButton>
                  <A 
                    href={`https://abilacollection.visualstudio.com/Abila/netFORUM%20-%20Automation/_testManagement/runs?runId=${result.testRun.id}&_a=resultSummary&resultId=${result.id}`}
                    target="_blank"
                  >
                    <IconButton
                      className={classes.appResponsive}
                      color="inherit"
                      aria-label="open VSTS Result"
                    >
                      <OpenInBrowser />
                    </IconButton>
                  </A>
                </TableCell>

                <TableCell className={classes.tableCell} key={result.id + "owner"}>
                  {result.owner.displayName}
                </TableCell>
                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

TableFailedTests.defaultProps = {
  tableHeaderColor: "gray"
};

TableFailedTests.propTypes = {
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

export default withStyles(tableStyle)(TableFailedTests);
