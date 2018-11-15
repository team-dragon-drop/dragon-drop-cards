import React, { Component } from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import { KeyboardShortcuts } from './KeyboardShortcuts';

export default class RemoveCardButton extends Component {
  state = {
    open: false,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleRemoveCard = () => {
    this.handleClose();
    this.props.removeCard();
  };

  render() {
    return (
      <span onClick={() => this.handleOpen()}>
        <DeleteIcon style={{ color: '#d3d3d3' }} />
        <Dialog
          className="dialog"
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle>Are you sure you want to delete this card? </DialogTitle>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleClose()}>
              No
            </Button>
            <Button color="primary" onClick={() => this.handleRemoveCard()}>
              Yes
            </Button>
          </DialogActions>
          <KeyboardShortcuts
            keys={{
              13: () => this.handleRemoveCard(),
            }}
          />
        </Dialog>
      </span>
    );
  }
}
