import React, { Component } from "react";
import Dialog from 'material-ui/Dialog';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { LinearProgress } from "material-ui/Progress";
import AddIcon from 'material-ui-icons/Add';
import IconButton from 'material-ui/IconButton';
import { KeyboardShortcuts, KeyboardShortcutInhibitor } from "./KeyboardShortcuts";

import MuiAppBar from "material-ui/AppBar";
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';


const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * 3,
    width: '100%',
  },
  title: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
});

class AppBar extends Component {
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
      <Button
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <Button
        label="Add"
        primary={true}
        form="addColumnForm"
        type="submit"
      />
    ];

          // <MuiAppBar
          //   title="Dragon Drop"
          //   titleStyle={{textAlign: "center"}}
          //   showMenuIconButton={false}
          //   iconElementRight={
          //     <IconButton><AddIcon
          //       onTouchTap={() => this.handleOpen()}
          //       label={this.props.buttonLabel}
          //     /></IconButton>
          //   }

    const { classes } = this.props;

    return (
      <div className="app-bar">
        <MuiAppBar position="static">
          <Toolbar>
            <Typography type="title" color="inherit" align="center" className={classes.title}>
              Dragon Drop
            </Typography>
            <IconButton className={classes.menuButton} color="contrast" aria-label="Menu">
              <IconButton>
                <AddIcon
                  onTouchTap={() => this.handleOpen()}
                  label={this.props.buttonLabel}
                />
                </IconButton>
            </IconButton>
          </Toolbar>
        </MuiAppBar>
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

AppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AppBar);
