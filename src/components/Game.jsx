import React, { useState, useRef } from 'react'
import style from './Game.module.css'

const Game = ({ 
    verifyLetter, 
    pickedCategory, 
    pickedWord, 
    letters, 
    guessedLetters, 
    wrongLetters, 
    guesses, 
    score }) => {
  
  const [letter, setLetter] = useState('')
  const letterInputRef = useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    verifyLetter(letter)

    setLetter('')

    letterInputRef.current.focus()
  }


  return (
    <div className={style.game}>
      <p className={style.points}>
        <span>Pontuação: {score}</span>
      </p>
      <h1>Advinha a palavra: </h1>
      <h3 className={style.tip}>
        Dica sobre a palavra: <span>{pickedCategory}</span>
      </h3>
      <p>Você ainda possui {guesses} tentativas</p>
      <div className={style.wordContainer}>
        {letters.map((letter, index) => (
          guessedLetters.includes(letter) ? (
            <span key={index} className={style.letter}>S{letter}</span> 
            
          ) : (
            <span key={index} className={style.blankSquare}></span>
          )
        ))}
        {/* <span className={style.letter}>A</span>
        <span className={style.blankSquare}></span> */}
      </div>
      <div className={style.letterContainer}>
        <p>Tente advinhar uma letra:</p>
        <form onSubmit={handleSubmit}>
          <input 
            type="text" 
            name="letter" 
            maxLength={1} 
            required 
            onChange={(e) => setLetter(e.target.value)}
            value={letter}
            ref={letterInputRef}
          />
          <button>Jogar</button>
        </form>
      </div>
      <div className={style.wrongLettersContainer}>
        <p>Letras erradas:</p>
        {wrongLetters.map((letter, index) => (
          <span key={index}>{letter}</span>
        ))}
      </div>
    </div>
  )
}

export default Game