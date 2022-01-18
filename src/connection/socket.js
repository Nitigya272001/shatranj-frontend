import io from 'socket.io-client'

const URL = 'https://shatranj-backend.herokuapp.com/'

const socket = io(URL);

var mySocketId
var playerNumber

socket.on("init", statusUpdate => {
    console.log("A new game has been created!, Game id: " + statusUpdate.gameId + " Socket id: " + statusUpdate.mySocketId)
    mySocketId = statusUpdate.mySocketId
    playerNumber = statusUpdate.playerNumber
})

export {
    socket,
    mySocketId,
    playerNumber,
}