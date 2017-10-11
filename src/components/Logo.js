import React, { Component } from 'react';
import logo from "../assets/dragon-drop-logo.svg";
import {TweenLite, Power2, Bounce} from "gsap";
import "../styles/homepage.css";

export default class Logo extends Component {

  componentDidMount() {
/*   const duration = 1;
   TweenLite.set('.logo', {y:-9999});
   TweenLite.to('.logo', duration / 2, {y:-500, ease:Power2.easeOut});
   TweenLite.to('.logo', duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
   TweenLite.to('.logo', duration / 4, {y:-50, ease:Power2.easeOut});
   TweenLite.to('.logo', duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
    */
  }

  bounce() {
   const duration = 1;
   TweenLite.to('.logo', duration / 4, {y:-50, ease:Power2.easeOut});
   TweenLite.to('.logo', duration / 2, {y:0, ease:Bounce.easeOut, delay:duration / 4});
  }

  render() {
    return (
      <div className="logo-container">
        <img
          onMouseEnter={() => {this.bounce()}}
          onClick={() => {this.bounce()}}
          onTouchStart={() => {this.bounce()}}
          className="logo"
          src={logo}
          alt="Drop it like it's hot"
        />
     </div>
    )
  }
}
