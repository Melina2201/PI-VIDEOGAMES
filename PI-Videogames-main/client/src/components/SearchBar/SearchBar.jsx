import React from "react";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { getGameBySearch, getAllGames } from "../../actions";

import { Link, useHistory } from "react-router-dom";
import s from  './SearchBar.module.css';



export default function SearchBar({ setCurrentPage }) {
  const history = useHistory()
  
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  
  useEffect(()=>{
    dispatch(getAllGames)
  },[])

  function handleInputChange(e) {
    e.preventDefault();
    setName(e.target.value);
    dispatch(getGameBySearch(e.target.value));
    setCurrentPage(1);
    history.push('/home')
  }


  return (
    <div >
    <form className={s.Conteiner} >
       <h4 className={s.Titulo}>SEARCH FOR NAME</h4>
      <input
        className={s.Input}

        id="outlined-basic"
        label="Search a game..."
        variant="standard"
        onChange={(e) => handleInputChange(e)}
      />
     
     <img className={s.img} src="https://i.ibb.co/18gKfTf/search.png" alt="" />
    </form>
    </div>
  );

    }

