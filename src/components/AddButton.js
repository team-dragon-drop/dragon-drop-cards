import React from 'react';

class AddButton extends React.Component {
  render() {
    return(
    <button onClick={this.props.handleAddCard()}> Add Card </button>
  );
}

}
export default AddButton;
