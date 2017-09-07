import React, { Component } from "react";

let shortcutsEnabled = true;

class KeyboardShortcuts extends Component {
  runCallbacks = e => {
    if (!shortcutsEnabled) return;
    if (this.props.debug) console.log(e);
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

class KeyboardShortcutInhibitor extends Component {
  componentDidMount() {
    shortcutsEnabled = false;
  }

  componentWillUnmount() {
    shortcutsEnabled = true;
  }

  render() {
    return <div />
  }
}

export { KeyboardShortcuts, KeyboardShortcutInhibitor }
