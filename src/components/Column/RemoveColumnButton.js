import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import { KeyboardShortcuts } from '../KeyboardShortcuts';

export default class RemoveColumnButton extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRemoveColumn = () => {
    this.handleClose();
    this.props.onClick();
  };

  render() {
    return (
      <div>
        <span
          className="column__close"
          style={{ float: 'right' }}
          onClick={() => this.handleOpen()}
        >
          <CloseIcon />
        </span>

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">
            Are you sure you want to delete this?
          </DialogTitle>
          <KeyboardShortcuts
            keys={{
              13: () => this.handleRemoveColumn(),
            }}
          />
          <DialogActions>
            <Button color="primary" onClick={() => this.handleClose()}>
              No
            </Button>
            <Button color="primary" onClick={() => this.handleRemoveColumn()}>
              Yes
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}
