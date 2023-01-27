import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import Searchbar from '../SearchBar/SearchBar';
import s from'./NavBar.module.css'

const NavBar = () => {
    const [input, setInput] = useState('')

    useEffect( () => {
        console.log(input);
    })

    const handleChangeInput = (e) => {
        setInput(e.target.value)
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        // alert('Your favorite flavor is: ' + this.state.value);
        console.log(input)
    }

    return (
        <div className={s.NavContainer}>
            <div className={s.nameApp}>
                <Link to={'/home'} >
                    <h3 id='appVideogames'>MEL`S VIDEOGAMES</h3>
                </Link>
            </div>

            <div >
                <Searchbar/>
            </div>
            
            <div className={s.NavLinks}>

                <Link to={'/home'}>
                    <h4 id='home'> HOME </h4>
                </Link>

                <h3 className={s.separador}><b> | </b></h3>

                <Link to={'/creategame'}>
                    <h4 id='creategame'> CREATE GAME </h4>
                </Link>

                <h3 className={s.separador}><b> | </b></h3>

                <Link to={'/about'} >
                    <h4 id='about'> ABOUT </h4>
                </Link>
            </div>
        </div>
    )
}

export default NavBar;