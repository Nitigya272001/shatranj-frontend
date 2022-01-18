import React, {useState,useEffect} from 'react'
import { useParams } from 'react-router-dom' 
import VideoChatApp from '../connection/videochat'
import LaunchGame from './gameLogic/launchGame.jsx'
const socket  = require('../connection/socket').socket


const ChessGame = (props) => {
    const { gameid } = useParams()
    const [opponentSocketId, setOpponentSocketId] = useState(null)
    const [gameSessionDoesNotExist, doesntExist] = useState(false)
    const [bothJoined,setBothJoined] = useState(false);

    useEffect(() => {     
        socket.on("playerJoinedRoom", statusUpdate => {
            console.log("A new player has joined the room! Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
            console.log("inside playerJoinedRoom", socket.id, statusUpdate.mySocketId);
            if (socket.id !== statusUpdate.mySocketId) {
                setOpponentSocketId(statusUpdate.mySocketId)
            }
            setBothJoined(true);
        })
    
        socket.on("status", statusUpdate => {
            alert(statusUpdate)
            doesntExist(true)
        })

        socket.on("opponentDisconnected", () =>  {
            alert("Opponent Disconnected");
            doesntExist(true)
            setBothJoined(false)
        })
    }, [])


    return (
      <React.Fragment>
        {bothJoined ? (
          <div style={{backgroundColor:'rgb(102, 51, 0)', height:"100vh", width:"100vw", display:'flex', flexDirection:'column', gap:'5%'}}>
            <div style={{textAlign:'center', height:"4vh", width:"100vw" }}>
            </div>
            <div style={{ display: "flex", height:"96vh", width:"100vw" }}>
              <LaunchGame />
              <VideoChatApp
                id1={socket.id}
                id2={opponentSocketId}
              />
            </div>
          </div>
        ) : gameSessionDoesNotExist ? (
          <div style={{height:"53.8vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", overflowX:"hidden" }}>
            <button className="btn btn-primary">
                <a href="/" style={{textDecoration:"none", textAlign: "center", color:"white" }}> 
                    Click here to go back to home page.  
                </a>
            </button>
          </div>
        ) : (
            <div style={{height:"53.8vh", width:"100vw", display:"flex", justifyContent:"center", alignItems:"center", overflowX:"hidden" }}>
            <div style={{height:"30vh", width:"60vw",border:'3px solid black',display:"flex", flexDirection:'column', justifyContent:"space-around", alignItems:"center", overflowX:"hidden"  }}>
            <h1
              style={{
                textAlign: "center",
              }}
            >
              Hey, send the code
              to your friend :
            </h1>
            <textarea
              style={{width: "200px", height: "30px"}}
              onFocus={(event) => {event.target.select()}}
              value = {gameid}
              type = "text">
              </textarea>
            </div>
          </div>
        )}
      </React.Fragment>
    );
};

export default ChessGame