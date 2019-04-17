import React, { Component } from 'react';
import { TweenLite, Power2, Bounce } from 'gsap';
import logo from './dragon-drop-logo.svg';
import './styles.css';

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
    TweenLite.to('.logo', duration / 4, { y: -50, ease: Power2.easeOut });
    TweenLite.to('.logo', duration / 2, {
      y: 0,
      ease: Bounce.easeOut,
      delay: duration / 4
    });
  }

  render() {
    return (
      <React.Fragment>
        <div className="speech-bubble">
          <p>
            Note: All boards are publically accessible. It is your responsibility
            to ensure that you are legally and contractually permitted to
            disclose any information on this site, including compliance with any
            company policies of your employer. You should also not disclose any
            commercially sensitive, confidential or personal information.
          </p>
        </div>
        <div className="logo-container">
          <img
            onMouseEnter={() => {
              this.bounce();
            }}
            onClick={() => {
              this.bounce();
            }}
            onTouchStart={() => {
              this.bounce();
            }}
            className="logo"
            src={logo}
            alt="Drop it like it's hot"
          />
        </div>
      </React.Fragment>
    );
  }
}
