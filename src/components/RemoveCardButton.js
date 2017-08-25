import React, { Component } from "react";
import CloseIcon from 'material-ui/svg-icons/navigation/close';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

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

  render() {
    const actions = [
      <FlatButton
        label="No"
        primary={true}
        onTouchTap={this.handleClose}
      />,
      <FlatButton
        label="Yes"
        primary={true}
        onTouchTap={() => {
          this.props.removeCard()
          this.handleClose();
        }}
      />
    ];

    return (
      <div>
        <span
          style={{ float: "right" }}
          onClick={() => this.handleOpen()}
        >
          <CloseIcon className="card__close" />
        </span>
        <Dialog
          title="Are you sure you want to delete this?"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        />
      </div>
    );
  }
}
