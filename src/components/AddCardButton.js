import React, { Component } from "react";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import { KeyboardShortcuts, KeyboardShortcutInhibitor } from "./KeyboardShortcuts";

export default class AddCardButton extends Component {
  state = {
    open: false,
    newCardName: ""
  };

  handleOpen = () => {
    this.setState({open: true}, () => {
      this.refs.newCard.focus();
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (e) => {
    this.setState({newCardName: e.target.value});
  };

  handleSubmit = (e) => {
    this.props.addCard(this.state.newCardName);
    this.handleClose();
    this.setState({newCardName: ""});
    e.preventDefault();
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Add"
        primary={true}
        form="addCardForm"
        type="submit"
      />
    ];

    let keyboardShortcuts = <KeyboardShortcuts keys={{
      65: () => this.handleOpen()  // a
    }}/>

    return (
      <div>
        <FlatButton
          onTouchTap={() => this.handleOpen()}
          fullWidth={true}
          backgroundColor="#fff"
          hoverColor="#f6f6f6"
          style={{ height: 50 }}
        >
          Add Card
        </FlatButton>
        <Dialog
          title="Add A New Card"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form id="addCardForm" onSubmit={this.handleSubmit}>
            <TextField onChange={this.handleChange} name="newCard" ref="newCard" />
          </form>
          <KeyboardShortcutInhibitor />
        </Dialog>
        { this.props.keyboardShortcutsActive && keyboardShortcuts }
      </div>
    );
  }
}
