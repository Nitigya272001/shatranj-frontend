import React, { useEffect, useState } from 'react'
import SquareC from './SquareC'
import PieceC from './PieceC'
import { useDrop } from 'react-dnd'
import { handleMovePieces } from './GameC'
import { gameSubject } from './GameC'
import useSound from 'use-sound'
import moveAudio from '../../sound/moveAudio.mp3'
import PromoteC from './PromoteC'

//use-drop => udhrr jisko use-drag kra hai, yei drop krta hai
//         => drop : callback runs after accepting the dragged componenet


export default function BoardSquare({piece,black,position,turn,depth}) {
  const [promotion, setPromotion] = useState(null)
  const [play] = useSound(moveAudio);
  const [, drop] = useDrop({
    accept: 'piece',
    drop: (item) => {
      // console.log("pos",position)
      const pieceDetailArray = item.id.split('_')
      play()
      handleMovePieces(pieceDetailArray[0],position,depth)
    },
  })

  useEffect(() => {
    const subscribe = gameSubject.subscribe(
      ({ pendingPromotion }) =>
        pendingPromotion && pendingPromotion.to === position
          ? setPromotion(pendingPromotion)
          : setPromotion(null)
    )

    return () => subscribe.unsubscribe()
  }, [position])
  
//   useEffect(()=> {
    
// },[])

  return (
    <div className="board-square" ref={drop}>
      <SquareC black={black} square={position}>
        {promotion && promotion.color==='w' ? (
          <PromoteC promotion={promotion} depth={depth} />
        ) : 
        piece ? (
          <PieceC piece={piece} position={position} />
        ) : null}
      </SquareC>
    </div>
  )
}