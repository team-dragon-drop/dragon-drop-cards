import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MuiAppBar from '@material-ui/core/AppBar';
import LinearProgress from '@material-ui/core/LinearProgress';
import AddIcon from '@material-ui/icons/Add';
import IconButton from '@material-ui/core/IconButton';
import {
  KeyboardShortcuts,
  KeyboardShortcutInhibitor,
} from './KeyboardShortcuts';

export default class AppBar extends Component {
  state = {
    open: false,
    newColumnName: '',
  };

  handleOpen = () => {
    this.setState({ open: true }, () => {
      this.refs.newColumn.focus();
    });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ newColumnName: e.target.value });
  };

  handleSubmit = e => {
    this.props.onButtonTouchTap(this.state.newColumnName);
    this.setState({ newColumnName: '', open: false });
    e.preventDefault();
  };

  loadingIndicator() {
    if (this.props.loading) {
      return <LinearProgress mode="indeterminate" />;
    } else {
      // This keeps the height consistent instead of jumping by 4 pixels
      return <div style={{ height: '4px' }} />;
    }
  }

  render() {
    const actions = [
      <Button
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <Button label="Add" primary={true} form="addColumnForm" type="submit" />,
    ];

    return (
      <div className="app-bar">
        <MuiAppBar
          title={<Link to="/">Dragon Drop</Link>}
          titleStyle={{
            textAlign: 'center',
            fontFamily: 'Sheeping-Dogs',
            fontSize: '40px',
            lineHeight: '74px',
            height: '74px',
          }}
          showMenuIconButton={false}
          iconElementRight={
            <IconButton style={{ marginTop: '4px' }}>
              <AddIcon
                onTouchTap={() => this.handleOpen()}
                label={this.props.buttonLabel}
              />
            </IconButton>
          }
        />
        {this.loadingIndicator()}
        <Dialog
          title="Add A New Column"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form id="addColumnForm" onSubmit={this.handleSubmit}>
            <TextField
              onChange={this.handleChange}
              name="newColumn"
              ref="newColumn"
            />
          </form>
          <KeyboardShortcutInhibitor />
        </Dialog>
        <KeyboardShortcuts
          keys={{
            67: () => this.handleOpen(), // c
          }}
        />
      </div>
    );
  }
}
