import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import makeGameCode from './makeGameCode.js'

const socket  = require('../connection/socket').socket

const Onboard = (props) => {
    const [typingGameId, setTypingGameId] = useState("");
    const [gameId, setGameId] = useState('');

    const createNewGameHandler = (e) => {
        const newGameRoomId = makeGameCode();
        setGameId(newGameRoomId);
        socket.emit('createNewGame', newGameRoomId)
    }

    function joinGameHandler() {
        setGameId(typingGameId)
        const idData = {gameId:typingGameId,isCreator:false}
        socket.emit("playerJoinGame", idData);
    }

    return ( 
        <React.Fragment>
            {
              gameId!=="" ? 
                <button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}><Redirect to = {"/game/" + gameId}>Start Game</Redirect></button>
                :
                <div>
                    <div style={{marginLeft : "33%",marginTop : "5vh",marginBottom : "5vh",border:"3px solid black",height:'50vh', width:"33%", display:'flex', flexDirection:'column', justifyContent:"space-around", alignItems: "center"}}>
                        <button className="btn btn-primary" 
                                style={{width:"33%"}}
                                onClick = {createNewGameHandler}>Start New Game
                        </button>
                

                        <div>OR</div>
                        <div className="form-group">
                            <input
                                type="text"
                                placeholder="Enter Game Code"
                                id="gameCodeInput"
                                value={typingGameId}
                                onChange={(e) => {
                                    setTypingGameId(e.target.value);
                                }}
                            />
                        </div>


                        <button
                            type="submit"
                            className="btn btn-success"
                            id="joinGameButton"
                            disabled = {!(typingGameId.length > 0)} 
                            onClick={joinGameHandler}>Join Game
                        </button>

                    </div>
                </div>

            }
        </React.Fragment>
    )
}

export default Onboard