import React from "react";
import { withStyles, Modal, Typography, Grid, InputLabel, TextField } from "material-ui";
import PropTypes from "prop-types";

import {
    RegularCard,
    Button,
    CustomInput,
    ItemGrid
  } from "components";

  function centerStyle() {
    const top = 50;
    const left = 55;
  
    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const outcomes = [
    {
        value: 'None',
        label: 'None',
    },
    {
        value: 'Passed',
        label: 'Passed',
    },
    {
        value: 'Failed',
        label: 'Failed',
    },
    {
        value: 'Blocked',
        label: 'Blocked',
    },
    {
        value: 'NotExecuted',
        label: 'NotExecuted',
    },
    {
        value: 'InProgress',
        label: 'InProgress',
    },
  ];

  const states = [
    {
        value: 'Pending',
        label: 'Pending',
    },
    {
        value: 'Queued',
        label: 'Queued',
    },
    {
        value: 'InProgress',
        label: 'InProgress',
    },
    {
        value: 'Paused',
        label: 'Paused',
    },
    {
        value: 'Completed',
        label: 'Completed',
    },
  ];

  const owners = [
    {
        value: 'Martyn Hill',
        label: 'Martyn Hill',
    },
    {
        value: 'Gonzalo Alba',
        label: 'Gonzalo Alba',
    },
    {
        value: 'Edmundo Figueroa',
        label: 'Edmundo Figueroa',
    },
    {
        value: 'Lucero Penarrieta',
        label: 'Lucero Penarrieta',
    },
    {
        value: 'Veronica Prado',
        label: 'Veronica Prado',
    },
    {
        value: 'Miguel Lisperguer',
        label: 'Miguel Lisperguer',
    },
    {
        value: 'Gabriel Rendon',
        label: 'Gabriel Rendon',
    },
  ];

  const modalStyles = theme => ({
    paper: {
      position: 'absolute',
      width: 800,
      //backgroundColor: theme.palette.background.paper,
      //boxShadow: theme.shadows[5],
      padding: theme.spacing.unit * 4,
    },
  });

  class SimpleModal extends React.Component {
    state = {
      open: false,
      outcome: null,
      state: null,
    };

    componentDidMount() {
        console.log("MODAL componentDidMount props", this.props)
        const { testResult } = this.props

        this.setState({ 
            open: this.props.open,
            outcome: testResult.outcome,
            state: testResult.state,
            owner: testResult.owner.displayName,
            errorMessage: testResult.errorMessage,
            comment: JSON.parse(testResult.comment).Comment,            
        });        
    }
  
    // handleOpen = () => {
    //   this.setState({ open: true });
    // };

    handleUpdate = () => {
        console.log("CLICK on UPDATE")
        const commentObject = JSON.parse(this.props.testResult.comment);
        commentObject.Comment = this.state.comment

        let patchTestResult = {
            ...this.props.testResult,            
            outcome: this.state.outcome,
            state: this.state.state,
            owner: { displayName: this.state.owner },
            errorMessage: this.state.errorMessage,
            comment: JSON.stringify(commentObject)           
        } 

        console.log("CLICK on UPDATE patchTestResult", patchTestResult)
        
        this.props.handleUpdateTestResult(patchTestResult);    
    }
  
    handleClose = () => {
      this.props.closeUpdateForm();
    };

    handleChange = (event, field) => {   
        let name = event.target.name;
        let value = event.target.value;

        this.setState({
            [name]: value 
        })
    }
  
    render() {
      const { classes, testResult } = this.props;
        console.log("clasess", classes)
      return (
          <Modal
            aria-labelledby="simple-modal-title"
            aria-describedby="simple-modal-description"
            open={this.state.open}
            
            
            // onClose={this.handleClose}
          >
            <div style={centerStyle()} className={classes.paper}>
                <Grid container>
                    <ItemGrid xs={12} sm={12} md={12}>
                    <RegularCard
                        cardTitle="Update Test Result"
                        headerColor="green"
                        // cardSubtitle="Complete your profile"
                        content={
                        <div>

                            <Grid container>
                                <ItemGrid xs={12} sm={12} md={4}>

                                    <TextField                                       
                                        select
                                        id="state"
                                        name="state"
                                        label="State"
                                        value={this.state.state}
                                        onChange={this.handleChange}
                                        fullWidth
                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                    >
                                        {states.map(option => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </TextField>     

                                </ItemGrid>

                                <ItemGrid xs={12} sm={12} md={4}>
                                    <TextField
                                        select
                                        id="outcome"
                                        name="outcome"
                                        label="Outcome"
                                        // className={classes.textField}
                                        value={this.state.outcome}
                                        onChange={this.handleChange}
                                        fullWidth

                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        
                                        >
                                            {outcomes.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                    </TextField>
                                </ItemGrid>

                                <ItemGrid xs={12} sm={12} md={4}>
                                    <TextField
                                        select
                                        id="owner"
                                        name="owner"
                                        label="Owner"
                                        // className={classes.textField}
                                        value={this.state.owner}
                                        onChange={this.handleChange}
                                        fullWidth

                                        SelectProps={{
                                            native: true,
                                            MenuProps: {
                                                className: classes.menu,
                                            },
                                        }}
                                        
                                        >
                                            {owners.map(option => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                    </TextField>
                                </ItemGrid>                                    
                            </Grid>
                                
                            <Grid container>
                                <ItemGrid xs={12} sm={12} md={12}>
                                    <TextField
                                        id="comment"
                                        name="comment"                                        
                                        label="Comment"
                                        placeholder="Enter some comment related with the test case result"
                                        value={this.state.comment}
                                        onChange={this.handleChange}
                                        multiline
                                        // rows="5"
                                        //className={classes.textField}
                                        margin="normal"
                                        fullWidth
                                    />
                                </ItemGrid>
                            </Grid>

                            <Grid container>
                                <ItemGrid xs={12} sm={12} md={12}>
                                    <TextField
                                        id="errorMessage"
                                        name="errorMessage"                                        
                                        label="Bug Related"
                                        placeholder="Enter the actual reason for the test fail"
                                        value={this.state.errorMessage}
                                        onChange={this.handleChange}
                                        multiline
                                        // rows="5"
                                        //className={classes.textField}
                                        margin="normal"
                                        fullWidth
                                    />
                                </ItemGrid>
                            </Grid>

                        </div>
                }
                footer={
                    [
                        <Button key="update" onClick={this.handleUpdate} color="primary">Update</Button>, 
                        <Button key="cancel" onClick={this.handleClose} color="danger">Cancel</Button>
                    ]
                }
            />
            
            </ItemGrid>        
        </Grid>
        </div>
    </Modal>
      );
    }
  }
  
  SimpleModal.propTypes = {
    classes: PropTypes.object.isRequired
  };

export default withStyles(modalStyles)(SimpleModal);
