import React from 'react'
import style from './GameOver.module.css'

const End = ({ retry }) => {
  return (
    <div>
      <h1>End</h1>
      <button onClick={retry}>Recomeçar</button>
    </div>
  )
}

export default End