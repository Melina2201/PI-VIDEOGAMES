import React from 'react';
import {Link} from 'react-router-dom';
import img from '../../pressStart.gif'
import s from "./landingPage.module.css"


export default function LandingPage() {

  return (
      <div className={s.DivStyled}>
        <img className={s.Img} src={img} alt="img not found" />
        <Link to='/videogames'><button  className={s.ButtonStart}>Start</button></Link>
      </div>
    )
};