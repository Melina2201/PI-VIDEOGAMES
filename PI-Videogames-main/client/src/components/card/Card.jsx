import React from 'react'
import s from './Card.module.css'

export default function Card({img, name , rating, genres}) {
  return (
    <div className={s.cardContainer}>
       
       <div  className={s.card}>
        <img src={img} alt='img' className={s.cardImg}/>
        <div  className={s.cardInfo}>
          <p  className={s.textTitle}>{name}</p>
          <p  className={s.textBody}>{genres}</p>
        </div>
        
        <div  className={s.cardFooter}>
          
          <div className={s.ratybuton}>
            <div>
            <span  className={s.textTitle}>⭐{rating}</span>
            </div>
          </div>

        </div>
      </div>

    </div>
   
  )
}