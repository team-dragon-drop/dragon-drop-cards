import React, { Component } from 'react';
import logo from "../assets/dragon-drop-logo.svg";
import {TweenMax, Power2, Bounce} from "gsap";
import "../styles/homepage.css";

export default class Logo extends Component {

  componentDidMount() {
   const duration = 1;
   TweenMax.to(this, duration / 4, {y:-50, ease:Power2.easeOut});
   TweenMax.to(this, duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
  }

  render() {
    return (
     <img 
        className="logo" 
        src={logo}
        alt="Drop it like it's hot"
      />
    )
  }
}
