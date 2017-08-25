import React, { Component } from "react";

export default class KeyDetector extends Component {
  runCallbacks = e => {
    if (this.props.debug) { console.log(e) }
    let fn = this.props.keys[e.keyCode];
    if (typeof fn === "function") fn();
  }

  componentDidMount() {
    document.addEventListener("keyup", this.runCallbacks);
  }

  componentWillUnmount() {
    document.removeEventListener("keyup", this.runCallbacks);
  }

  render() {
    return <div />
  }
}
