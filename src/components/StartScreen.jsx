import React from 'react'
import style from './StartScreen.module.css'

const StartScreen = ({ startGame }) => {
  return (
    <div className={style.start}>
        <h1>Secret Word</h1>
        <p>Descubra a palavra secreta</p>
        <button onClick={startGame}>Comece a jogar</button>
    </div>
  )
}

export default StartScreen