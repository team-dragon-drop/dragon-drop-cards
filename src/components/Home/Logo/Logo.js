import React, {Component} from 'react'
import {TweenLite, Power2, Bounce, TimelineLite} from 'gsap'
import logo from './dragon-drop-logo.svg'
import ddbox from './dd-box.svg'
import ddhead from './dd-head.svg'
import ddjaw from './dd-jaw.svg'
import ddfireball from './dd-fireball.svg'
import './styles.css'

const update = () => {
  return(
    tl.set(ddfireball,{scale:0.1, rotation:-10,transformOrigin:"50% 50%", opacity: 1})
      .to(ddjaw, 0.5, {rotation:-28, y:"16px", transformOrigin:"68% 60px"})
      .to(ddfireball, 2, {x:-200, y:30, scale:.5, opacity: 0}, "-=0.5")
      .to(ddjaw, 1, {rotation:0, y:"0", transformOrigin:"68% 60px"})
      .to(ddfireball, 1, {x:0,y:0,scale:0.1}, "-=1")
  )
}

const tl = new TimelineLite({repeat:-1, onUpdate: update()});
const jaw = document.querySelector(".logo--ddjaw"),
fireball = document.querySelector(".logo--ddfireball"),
head = document.querySelector(".logo--ddhead");


const bounce = () => {
  const duration = 1
  TweenLite.to('.logo', duration / 4, {y: -50, ease: Power2.easeOut})
  TweenLite.to('.logo', duration / 2, {
    y: 0,
    ease: Bounce.easeOut,
    delay: duration / 4,
  })
}

export const Logo = () => {
  return (
    <div className="logo-container">
      <div className="logo__head">
        <img className="logo--ddjaw" src={ddjaw} />
        <img className="logo--ddhead" src={ddhead} />
        <img className="logo--ddfireball" src={ddfireball} />
      </div>
      <img className="logo__section logo--ddbox" src={ddbox} />
    </div>
  )
}
