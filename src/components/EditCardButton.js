import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import { KeyboardShortcutInhibitor } from './KeyboardShortcuts';

export default class EditCardButton extends Component {
  state = {
    open: false,
    newContent: '',
    value: this.props.currentValue,
  };

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ newContent: e.target.value });
  };

  handleSubmit = e => {
    this.props.onSubmit(this.state.newContent);
    this.handleClose();
    this.setState({ newContent: e.target.value });
    e.preventDefault();
  };

  render() {
    return (
      <span>
        <EditIcon
          onClick={() => this.handleOpen()}
          style={{ color: '#d3d3d3' }}
        />
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Edit card</DialogTitle>
          <DialogContent>
            <form id="editCardForm" onSubmit={this.handleSubmit}>
              <TextField
                placeholder="Markdown is supported"
                label="Card Text"
                multiline
                rows={1}
                fullWidth={true}
                onChange={this.handleChange}
                name="card"
                ref="card"
                defaultValue={this.props.currentValue}
                inputRef={el => el && el.focus()}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            ,
            <Button form="editCardForm" type="submit">
              Edit
            </Button>
            ,
          </DialogActions>
          <KeyboardShortcutInhibitor />
        </Dialog>
      </span>
    );
  }
}
