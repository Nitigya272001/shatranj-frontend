import React from "react";
import { useDrag, DragPreviewImage } from "react-dnd";

//use-drag => 
//DragPreviewImage => sirf image ko hi drag krta hua show krega, nhi toh puraa square move hota dikhega, 
//                    ref ko image ko de denge toh bhi thoda bhot toh brown dikhega hi
//                    isiliye isko use krte hai!!
// collect => yei jo drag ho rha hai uske alawa baakiyo ko thoda km krdeta hai

export default function Piece({ piece: { type, color }, position }) {

  const [{ isDragging }, drag, preview] = useDrag({
    type: "piece",
    item: {
      id: `${position}_${type}_${color}`,
    },
    collect: (monitor) => {
      return { isDragging: !!monitor.isDragging() };
    },
  });

  const pieceImg = "/assets/"+type+"_"+color+".png";
  
  return (
    <>
      <DragPreviewImage connect={preview} src={pieceImg} />
      <div
        className="piece-container"
        ref={drag}
        style={{ opacity: isDragging ? 0 : 1 }}
      >
        <img src={pieceImg} alt={type+" "+color} className="piece" />
      </div>
    </>
  );
}
