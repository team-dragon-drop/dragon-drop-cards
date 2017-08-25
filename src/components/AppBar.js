import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import MuiAppBar from "material-ui/AppBar";
import LinearProgress from "material-ui/LinearProgress";

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
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Add"
        primary={true}
        onTouchTap={() => {
          this.props.onButtonTouchTap(this.state.newColumnName);
          this.setState({newColumnName: ""});
          this.handleClose();
        }}
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
          <TextField onChange={this.handleChange} name="newColumn" ref="newColumn" />
        </Dialog>
      </div>
    );
  }
}
