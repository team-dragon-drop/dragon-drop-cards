import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import DeleteIcon from 'material-ui-icons/Delete';
import { KeyboardShortcuts } from "./KeyboardShortcuts";

export default class RemoveCardButton extends Component {
  state = {
    open: false
  };

  handleOpen = () => {
    this.setState({open: true});
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleRemoveCard = () => {
    this.handleClose();
    this.props.removeCard();
  }

  render() {
    const actions = [
      <Button
        label="No"
        primary={true}
        onTouchTap={() => this.handleClose() }
      />,
      <Button
        label="Yes"
        primary={true}
        onTouchTap={() => this.handleRemoveCard() }
      />
    ];

    return (
      <span onClick={() => this.handleOpen()} >
        <DeleteIcon />
        <Dialog
          title="Are you sure you want to delete this?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <KeyboardShortcuts keys={{
            13: () => this.handleRemoveCard()
          }}/>
        </Dialog>
      </span>
    );
  }
}
