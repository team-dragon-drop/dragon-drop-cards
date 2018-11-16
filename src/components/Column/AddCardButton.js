import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import {
  KeyboardShortcuts,
  KeyboardShortcutInhibitor,
} from '../KeyboardShortcuts';

export default class AddCardButton extends Component {
  state = {
    open: false,
    newCardName: '',
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ newCardName: e.target.value });
  };

  handleSubmit = e => {
    this.props.onSubmit(this.state.newCardName);
    this.handleClose();
    this.setState({ newCardName: '' });
    e.preventDefault();
  };

  render() {
    let keyboardShortcuts = (
      <KeyboardShortcuts
        keys={{
          65: () => this.handleOpen(), // a
        }}
      />
    );

    return (
      <div>
        <Button
          onClick={() => this.handleOpen()}
          fullWidth={true}
          style={{ height: 50 }}
        >
          Add Card
        </Button>
        <Dialog
          classes={{ paper: 'dialog' }}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <DialogTitle className="dialog-title" id="form-dialog-title">
            Add A New Card
          </DialogTitle>
          <DialogContent>
            <form id="addCardForm" onSubmit={this.handleSubmit}>
              <TextField
                placeholder="Markdown is supported"
                label="Card Text"
                multiline
                rows={3}
                fullWidth={true}
                onChange={this.handleChange}
                name="newCard"
                inputRef={el => el && el.focus()}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button color="primary" form="addCardForm" type="submit">
              Add
            </Button>
          </DialogActions>
          <KeyboardShortcutInhibitor />
        </Dialog>
        {this.props.keyboardShortcutsActive && keyboardShortcuts}
      </div>
    );
  }
}
