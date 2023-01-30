import React from 'react'
import s from './Paginado.module.css'

export default function Paginado({gamesPerPage, allVideoGames, paginado, currentPage}) {
  const pageNumber = [];
  
   for(let i=0; i<=Math.ceil(allVideoGames/gamesPerPage); i++){
    pageNumber.push(i+1)
   }

   const handlePrev = (currentPage)=>{
    if(currentPage !== 1) paginado(currentPage - 1) 
  }

  const handleNext = (currentPage)=>{
    if(currentPage !== 7) paginado(currentPage + 1) 
  }

   pageNumber.pop()
   const prev = "<< Prev"
   const next = "Next >>"

   return(
      <nav className={s.containerPadre}>
        <button key="prev" onClick={() => handlePrev(currentPage)} className={s.click}> {prev} </button>

        <ul className={s.nums}>
          {pageNumber && 
          pageNumber.map((number) =>{
            return(
            <li key={number}>
              <button className={s.button} onClick={() => paginado(number)}>{number}</button>
            </li>)
          })}
        </ul>

        <button key="prev" onClick={() => handleNext(currentPage)} className={s.click}>{next}</button>
      </nav>
   )
}