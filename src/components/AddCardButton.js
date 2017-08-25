import React, { Component } from "react";
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import TextField from 'material-ui/TextField';
import KeyDetector from "./KeyDetector";

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
    this.setState({newCardName: "", open: false});
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

    let keyboardShortcuts = <KeyDetector keys={{
      65: () => this.handleOpen()  // a
    }}/>

    return (
      <div>
        <RaisedButton onTouchTap={() => this.handleOpen()}
          style={{ padding: "10px", width: "100%" }}
        >
          + Add Card
        </RaisedButton>
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
        </Dialog>
        { this.props.keyboardShortcutsActive && keyboardShortcuts }
      </div>
    );
  }
}
