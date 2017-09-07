import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiAppBar from "material-ui/AppBar";
import LinearProgress from "material-ui/LinearProgress";
import { KeyboardShortcuts, KeyboardShortcutInhibitor } from "./KeyboardShortcuts";

export default class AppBar extends Component {
  state = {
    open: false,
    newColumnName: ""
  };

  handleOpen = () => {
    this.setState({open: true}, () => {
      this.refs.newColumn.focus();
    });
  };

  handleClose = () => {
    this.setState({open: false});
  };

  handleChange = (e) => {
    this.setState({newColumnName: e.target.value});
  };

  handleSubmit = (e) => {
    this.props.onButtonTouchTap(this.state.newColumnName);
    this.setState({newColumnName: "", open: false});
    e.preventDefault();
  }

  loadingIndicator() {
    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else {
      // This keeps the height consistent instead of jumping by 4 pixels
      return <div style={{ height: "4px" }} />;
    }
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
        form="addColumnForm"
        type="submit"
      />
    ];

    return (
      <div>
        <MuiAppBar
          title="Dragon Drop"
          showMenuIconButton={false}
          iconElementRight={
            <FlatButton
              onTouchTap={() => this.handleOpen()}
              label={this.props.buttonLabel}
            />
          }
        />
        { this.loadingIndicator() }
        <Dialog
          title="Add A New Column"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form id="addColumnForm" onSubmit={this.handleSubmit}>
            <TextField onChange={this.handleChange} name="newColumn" ref="newColumn" />
          </form>
          <KeyboardShortcutInhibitor />
        </Dialog>
        <KeyboardShortcuts keys={{
          67: () => this.handleOpen()   // c
        }}/>
      </div>
    );
  }
}
