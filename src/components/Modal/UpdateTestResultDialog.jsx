import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

export default class UpdateTestResultDialog extends React.Component {
  state = {
    open: false,
  };

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
    console.log("UpdateTestResultDialog clasess", classes)
    console.log("UpdateTestResultDialog testResult", testResult)
    return (
      <div>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Update Test Result</DialogTitle>
          <DialogContent>            
            
            <TextField
              autoFocus
              margin="dense"
              id="state"
              name="state"
              label="State"
              value={testResult.state}

              fullWidth
            />

          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Subscribe
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
