//import CSS
import './App.css'
//import Hooks
import { useState, useEffect, useCallback } from 'react'
//import Components
import StartScreen from './components/StartScreen'
import Game from './components/Game.jsx'
import End from './components/GameOver.jsx'
//import data
import { wordsList }  from './data/data.js'


const stages = [
  {id:1, name: 'start'},
  {id: 2, name: 'game'},
  {id: 3, name: 'end'}
]


function App() {
  //usar a gameStage como referência para controlar o que será exibido em tela
  const [gameStage, setGameStage] = useState(stages[0].name)

  const [words] = useState(wordsList)
  const [pickedWord, setPickedWord] = useState('')
  const [pickedCategory, setPickedCategory] = useState('')

  const [letters, setLetters] = useState([]);
  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(5)
  const [score, setScore] = useState(0)


  const [word, setWord] = useState('')
  const pickWordAndCategory = () => {
    const categories = Object.keys(words)//retorna uma array com as keys do objeto words em strings
    //console.log(categories);
    //console.log(Object.keys(categories)); //retorna uma array com os valores de index de cada item, o que seria a "key" de cada um
    const randomCategory = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)]
    //console.log(randomCategory);
    //console.log(word);
    return {word, randomCategory}
  }

  //funcções de controle de tela do game
  const startGame = () => {

    const {word, randomCategory} =  pickWordAndCategory()

    let wordLetters = word.split('')
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    setPickedWord(word)
    setPickedCategory(randomCategory)
    setLetters(wordLetters)

    //console.log(word, randomCategory);
    //console.log(wordLetters);
    //console.log(letters);
    setGameStage(stages[1].name)
  }

  const verifyLetter = (letter) => {
    console.log(letter);

    //setGameStage(stages[2].name)
  }

  const retry = () => {
    setGameStage(stages[0].name)
  }


  return (
    <>
      <div className='App'>
        {gameStage == 'start' && <StartScreen startGame={startGame}/>}
        {gameStage == 'game' && (
          <Game 
            verifyLetter={verifyLetter}
            pickedCategory={pickedCategory}
            pickedWord={pickedWord}
            letters={letters}
            guessedLetters={guessedLetters}
            wrongLetters={wrongLetters}
            guesses={guesses}
            score={score}
          />)}
        {gameStage == 'end' && <End retry={retry}/>}
      </div>
    </>
  )
}

export default App
