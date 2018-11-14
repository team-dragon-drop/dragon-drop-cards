import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
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
    this.setState({ open: true }, () => {
      this.refs.card.focus();
    });
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
    const actions = [
      <Button
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <Button label="Edit" primary={true} form="editCardForm" type="submit" />,
    ];

    return (
      <span>
        <EditIcon
          onTouchTap={() => this.handleOpen()}
          style={{ color: '#d3d3d3' }}
        />
        <Dialog
          title="Edit This Card"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form id="editCardForm" onSubmit={this.handleSubmit}>
            <TextField
              hintText="Markdown is supported"
              floatingLabelText="Card Text"
              multiLine={true}
              rows={1}
              fullWidth={true}
              onChange={this.handleChange}
              name="card"
              ref="card"
              defaultValue={this.props.currentValue}
            />
          </form>
          <KeyboardShortcutInhibitor />
        </Dialog>
      </span>
    );
  }
}
