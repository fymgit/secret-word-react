import React from 'react'
import style from './GameOver.module.css'

const End = ({ retry, score }) => {
  return (
    <div >
      <h1 className={style.endTitle}>Game Over</h1>
      <p>A sua pontuação foi de: <span>{score}</span></p>
      <button className={style.retryBtn} onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default End