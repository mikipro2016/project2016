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
import date from 'date-and-time';
// import tasksStyle from "variables/styles/tasksStyle.jsx";

function getDate(dateToConvert)
{
  let dateBug = new Date(dateToConvert);
   return date.format(dateBug, 'MMM DD YYYY')
}

function calculateDate(dateToConvert)
{
  let now = new Date();
  let dateBug = new Date(dateToConvert);
   return date.subtract(now, dateBug).toDays();
}

function TableBugs({ ...props }) {
  const { classes, tableHead, tableData, tableHeaderColor } = props;

  const showUpdateTestResultForm = (testResult, event) => {
    console.log("TableBugs clik edit", testResult)
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
              .sort((a, b) => a.Name > b.Name ? 
                              1 : (b.Name > a.Name ? -1 : 0))
              .map((result) => {
            return (
              <TableRow hover key={result.Id}>
                <TableCell className={classes.tableCell} key={result.Id + "TfsId"}>
                  {result.TfsId}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "BugTitle"}> 
                
                <Tooltip
                    id={result.Id+ "BugName"}
                    title={result.Customer}
                    placement="top-start"
                    classes={{tooltip:classes.tooltip}}
                  >
                  <A                      
                    >   
                    {result.Name}                  
                    </A>
                  </Tooltip>
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "Created"}>
                  { getDate(result.CreatedDate)}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "Time"}>
                  {calculateDate(result.CreatedDate)}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "Module"}>
                {result.Module}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "State"}>
                {result.State}
                </TableCell>

                <TableCell className={classes.tableCell} key={result.Id + "Severity"}>
                {result.Severity}
                </TableCell>                                

                <TableCell className={classes.tableCell} key={result.Id + "Legacy"}>
                { result.Legacy &&
                 <span> Yes </span>
                }
                { result.Legacy == false &&
                  <span>No</span>
                }        
        
                </TableCell>                                
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}

TableBugs.defaultProps = {
  tableHeaderColor: "gray"
};

TableBugs.propTypes = {
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

export default withStyles(tableStyle)(TableBugs);
