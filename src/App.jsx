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


  
  const pickWordAndCategory = useCallback(() => {
    const categories = Object.keys(words)//retorna uma array com as keys do objeto words em strings
    //console.log(categories);
    //console.log(Object.keys(categories)); //retorna uma array com os valores de index de cada item, o que seria a "key" de cada um
    const randomCategory = categories[Math.floor(Math.random() * Object.keys(categories).length)]

    const word = words[randomCategory][Math.floor(Math.random() * words[randomCategory].length)]
    //console.log(randomCategory);
    //console.log(word);
    return {word, randomCategory}
  }, [words])

  //funcções de controle de tela do game
  const startGame = useCallback(() => {

    //ao acertar a palvra e recarregar o componente, o state de letas continua o mesmo
    //gerando letras já renderizadas se forem em comum com a palavra anterior
    //por isso é necessário chamar a clearLettersState no início da startGame e evitar esse bug
    clearLetterStates()


    const {word, randomCategory} =  pickWordAndCategory()

    let wordLetters = word.split('')
    wordLetters = wordLetters.map((letter) => letter.toLowerCase())

    setPickedWord(word)
    setPickedCategory(randomCategory)
    setLetters(wordLetters)

    //console.log(word, randomCategory);
    //console.log(wordLetters);
    console.log(letters);
    setGameStage(stages[1].name)
  }, [pickWordAndCategory])

  const verifyLetter = (letter) => {
    console.log(letter);
    const normalizedLetter = letter.toLowerCase()

    //verificação se a letra já foi utilizada
    if (
      guessedLetters.includes(normalizedLetter) || 
      wrongLetters.includes(normalizedLetter)) {
        return;
      }
      
    console.log(guessedLetters);
    console.log(wrongLetters);
    //verificar se a letra está correta ou se ela está errada
    //cada set usa como parâmetro o estado prev para adicionar a letra através de spread operator
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) => [
        ...actualGuessedLetters,
        normalizedLetter
      ])
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters,
        normalizedLetter
      ])

      setGuesses((actualGuesses) => actualGuesses - 1)
    }

  }

  //function para resetar os states
  const clearLetterStates = () => {
    setGuessedLetters([])
    setWrongLetters([])
  }
  //uso do useEffect para controlar a lógica de endgame
  useEffect(() => {
    if (guesses === 0) {
      // game over and reset all states
      clearLetterStates();

      setGameStage(stages[2].name);
    }
  }, [guesses]);

  //useEffect para qdo acertar a palavra, aumentar o score, e escolher outra palavra
  useEffect(() => {
    //criar um novo letters com o valor da palavra escolhida
    //o new Set() cria uma array nova com o valor da variável letters, as letras
    // mas sem repetição de letras iguais
    //como a guessedLetters tb não recebe letras repetidas elas acabam tendo o mesmo número de letras, a mesma length

    const uniqueLetters = [...new Set(letters)]


    if (uniqueLetters.length == guessedLetters.length) {
      setScore(prevScore => prevScore += 100)

      startGame()
    }
  }, [guessedLetters, letters, startGame])

  const retry = () => {
    setScore(0);
    setGuesses(5);
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
        {gameStage == 'end' && <End score={score} retry={retry}/>}
      </div>
    </>
  )
}

export default App
