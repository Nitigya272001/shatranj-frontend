import React, { useEffect, useState } from 'react'
import BoardSquare from './BoardSquare'
import { playerNumber } from '../../connection/socket'
import { socket } from '../../connection/socket'
import { handleMovePieces } from './Game'


export default function Board({ board, turn }) {
  const [currBoard, setCurrBoard] = useState([])

  useEffect(() => {
    setCurrBoard(
      playerNumber === 1 ? board.flat() : board.flat().reverse()
    )
  }, [board, playerNumber])

  useEffect(()=> {
    socket.on('movePieces', handleMovePieces)
}, [])

  function getXYPosition(i) {
    const x = turn === 'w' ? i % 8 : Math.abs((i % 8) - 7)
    const y =
      turn === 'w'
        ? Math.abs(Math.floor(i / 8) - 7)
        : Math.floor(i / 8)
    return { x, y }
  }

  function isBlack(i) {
    const { x, y } = getXYPosition(i)
    return (x + y) % 2 === 0
  }

  function getPosition(i) {
    const { x, y } = getXYPosition(i)
    const letter = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'][x]
    return `${letter}${y + 1}`
  }
  return (
    <div className="board">
      {currBoard.map((piece, i) => (
        <div key={i} className="square">
          <BoardSquare
            piece={piece}
            black={isBlack(i)}
            position={getPosition(i)} 
            turn = {turn}
          />
        </div>
      ))}
    </div>
  )
}
