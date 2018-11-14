import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar';
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
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChange = e => {
    this.setState({ newColumnName: e.target.value });
  };

  handleSubmit = e => {
    this.props.onClick(this.state.newColumnName);
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
    return (
      <div className="app-bar">
        <MuiAppBar position="static">
          <Toolbar>
            <Link to="/">Dragon Drop</Link>
            <IconButton onClick={() => this.handleOpen()}>
              <AddIcon label={this.props.buttonLabel} />
            </IconButton>
          </Toolbar>
        </MuiAppBar>
        {this.loadingIndicator()}

        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogTitle id="form-dialog-title">Add A New Column</DialogTitle>
          <DialogContent>
            <form id="addColumnForm" onSubmit={this.handleSubmit}>
              <TextField
                label="Column Name"
                fullWidth={true}
                onChange={this.handleChange}
                name="newColumn"
                inputRef={el => el && el.focus()}
              />
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="primary" onClick={() => this.handleClose()}>
              Cancel
            </Button>
            <Button color="primary" form="addColumnForm" type="submit">
              Add
            </Button>
          </DialogActions>
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
