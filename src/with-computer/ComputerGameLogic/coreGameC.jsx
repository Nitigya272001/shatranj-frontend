import React, { useEffect, useState } from 'react'
import '../../App.css'
import { gameSubject, initGame, resetGame} from './GameC'
import BoardC from './BoardC'

function CoreGameC({depth,setDepth}) {

  const [board, setBoard] = useState([])
  const [isGameOver, setIsGameOver] = useState()
  const [result, setResult] = useState()
  const [turn, setTurn] = useState()
  const [userChecked, setUserChecked] = useState(false)
 
  useEffect(() => {
    initGame()
    const subscribe = gameSubject.subscribe((game) => {
      setBoard(game.board)
      setIsGameOver(game.isGameOver)
      setResult(game.result)
      setTurn(game.turn)
      setUserChecked(game.isChecked)
    })
    return () => subscribe.unsubscribe()
  }, [])

  function handleReset() {
    resetGame();
  }

  function handleResetDepth() {
    resetGame();
    setDepth(null);
  }

  return (
    <div style={{display:'flex', gap:'5vw'}}>
      <div>
        {isGameOver && (
          <h2 className="vertical-text">
            GAME OVER
          </h2>
        )}
      </div>
      <div style={{height:'80vh',width:"45vw",display:"flex", flexDirection:"column", justifyContent:"center", gap:'5px'}}>
        <div style={{height:'5vh',display:"flex", flexDirection:"row", justifyContent:"center", gap:'5px'}}>
            <button style={{height:"5vh",width:"8vw"}} className="btn btn-success mb-4" onClick={handleReset}>Reset Game</button>
            <button style={{height:"5vh",width:"12vw"}} className="btn btn-success mb-4" onClick={handleResetDepth}>Reset Difficulty</button>
            {userChecked && isGameOver===false && <h2 style={{marginLeft:"4%" , color:'white'}}>Check!!!</h2>}
        </div>
        <BoardC board={board} turn={turn} depth={depth} />
      </div>
      <div>
        {result && <h3 className="vertical-text">{result}</h3>}
      </div>
    </div>
  )
}

export default CoreGameC