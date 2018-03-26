import React, {Component} from 'react'
import FlatButton from 'material-ui/FlatButton'
import Dialog from 'material-ui/Dialog'
import TextField from 'material-ui/TextField'
import EditIcon from 'material-ui/svg-icons/image/edit'

export default class EditCardButton extends Component {
  state = {
    open: false,
    newContent: '',
    value: this.props.currentValue
  }

  handleOpen = () => {
    this.setState({open: true}, () => {
      this.refs.card.focus()
    })
  }

  handleClose = () => {
    this.setState({open: false})
  }

  handleChange = e => {
    this.setState({newContent: e.target.value})
  }

  handleSubmit = e => {
    this.props.onSubmit(this.state.newContent)
    this.handleClose()
    this.setState({newContent: e.target.value})
    e.preventDefault()
  }

  render() {
    const actions = [
      <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={() => this.handleClose()}
      />,
      <FlatButton
        label="Edit"
        primary={true}
        form="editCardForm"
        type="submit"
      />,
    ]

    return (
      <span>
        <EditIcon
          onTouchTap={() => this.handleOpen()}
        />
        <Dialog
          title="Edit This Card"
          actions={actions}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleClose}
        >
          <form id="editCardForm" onSubmit={this.handleSubmit}>
            <TextField
              multiLine={true}
              rows={1}
              fullWidth={true}
              onChange={this.handleChange}
              name={this.state.newContent}
              ref="card"
            />
          </form>
        </Dialog>
      </span>
    )
  }
}
