import React from 'react'
import SquareC from './SquareC'
import { handleMovePieces } from './GameC'
const promotionPieces = ['r', 'n', 'b', 'q']

export default function PromoteC({promotion: { from, to, color }, depth}) {
  return (
    <div className="board">
      {promotionPieces.map((p, i) => (
        <div key={i} className="promote-square">
          <SquareC black={i % 3 === 0}>
            <div
              className="piece-container"
              onClick={() => {
                console.log("i am clicked of promotion piece",p);
                handleMovePieces(from, to, depth, p, color)
                //setPromotion(null)
              }}
            >
              <img
                src={(`/assets/${p}_${color}.png`)}
                alt=""
                className="piece cursor-pointer"
              />
            </div>
          </SquareC>
        </div>
      ))}
    </div>
  )
}