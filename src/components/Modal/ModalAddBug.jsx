import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { getBugs, getBug, postBug } from 'utils/NfepApi';

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

export default class ModalAddBug extends React.Component {
  state = {
    open: false,
    bug: {}
  };

  handleAddBug = () => {
     if(this.state.bug.Name) {
      console.log("tfs bug id: ", this.state.bug.TfsId) 
        var result = handlePostBug(this.state.bug.TfsId)
        console.log("var result: ", result)    
    }
    else {
        //hacemos algo
    }
    console.log("before method: ", this.state.bugs)    
  };

  handleSearch = (searchTerm) => {
    getBug(searchTerm).then((bug) => {      
        this.setState({ bug: bug })
           console.log("Bug: ", this.state.bug)           
    });    
  }

  displayResult = () => {    
       if(this.state.bug.Message) {
          return (<div>{this.state.bug.Message}</div>
       )} 
       if(this.state.bug.Name) {
          return ( <div>{this.state.bug.Name}</div>
       )}      
    }  

  handleClickOpen = () => {
    this.setState({ open: true });    
  };
  handleClose = () => {
    this.setState({ open: false });
  };
  componentDidMount() {
    console.log("UpdateTestResultDialog componentDidMount props", this.props)
    this.setState({ open: this.props.open });        
}
  render() {
    const { classes, testResult } = this.props;    
    // const search = SearchInput.state;
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Bug from TFS server</DialogTitle>
          <DialogContent> 
                                              
            <SearchInput handleSearch={this.handleSearch} />
              {this.displayResult()}
            
          </DialogContent>         
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleAddBug} color="primary">
              Register
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }

   // componentDidMount() {
  //       getBugs().then((bugs) => {          
  //         this.setState({
  //           bugs: bugs
  //         })
  //         console.log("Bugs", this.state.bugs)
  //       }); 
  //   }
}