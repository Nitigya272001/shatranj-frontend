import React from 'react'

export default function SquareC({ children, black }) {
  const bgClass = black ? 'square-black' : 'square-white'

  return (
    <div className={`${bgClass} board-square`}>
      {children}
    </div>
  )
}
