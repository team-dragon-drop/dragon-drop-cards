import React, { Component } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Dialog from '@material-ui/core/Dialog';
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
    const actions = [
      <Button
        label="No"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <Button
        label="Yes"
        primary={true}
        onTouchTap={() => this.handleRemoveColumn()}
      />,
    ];

    return (
      <div>
        <span
          className="column__close"
          style={{ float: 'right' }}
          onClick={() => this.handleOpen()}
        >
          <CloseIcon color="#ccc" />
        </span>
        <Dialog
          title="Are you sure you want to delete this?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <KeyboardShortcuts
            keys={{
              13: () => this.handleRemoveColumn(),
            }}
          />
        </Dialog>
      </div>
    );
  }
}
