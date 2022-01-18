import React, { useEffect, useState } from 'react'
import '../../App.css'
import { gameSubject, initGame, resetGame} from './Game'
import Board from './Board'
import { socket, playerNumber } from '../../connection/socket'
import {useParams} from 'react-router-dom'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

let roomName;

function LaunchGame() {

  const params = useParams();
  roomName = params.gameid;

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

  useEffect(()=> {
    socket.on('resetGame', resetGame)
  }, [])

  function handleReset() {
    socket.emit('reStartNewGame', {roomName, playerNumber })
  }

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{width:'55%',display:'flex', gap:'5vw'}}>
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
              {userChecked && isGameOver===false && <h2 style={{marginLeft:"4%" , color:'white'}}>Check!!!</h2>}
          </div>
          <Board board={board} turn={turn} />
        </div>
        <div>
          {result && <h3 className="vertical-text">{result}</h3>}
        </div>
      </div>
    </DndProvider>   
  )
}

export default LaunchGame