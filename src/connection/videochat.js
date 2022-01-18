import React, { useEffect, useState, useRef } from 'react';
import Peer from "simple-peer";
import "./css/videochat.css"
// import VideocamIcon from '@material-ui/icons/Videocam'
// import VideocamOffIcon from '@material-ui/icons/VideocamOff'
// import MicIcon from '@material-ui/icons/Mic'
// import MicOffIcon from '@material-ui/icons/MicOff'
// import {IconButton} from '@material-ui/core'
const {socket}  = require('../connection/socket')

const VideoChatApp = (props) => {
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState("");
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [isCalling, setIsCalling] = useState(false)
  const userVideo = useRef();
  const partnerVideo = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then(stream => {
      setStream(stream);
      if (userVideo.current) {
        userVideo.current.srcObject = stream;
      }
    })

    socket.on("hey", (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    })
  }, []);

  function callPeer(id) {
    //console.log("I am calling to ",id);
    setIsCalling(true)
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });

    peer.on("signal", data => {
      socket.emit("callUser", { userToCall: id, signal: data, from: props.id1})
    })

    peer.on("stream", stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream;
      }
    });

    socket.on("callAccepted", ({signal,id}) => {
      setCallAccepted(true);
      peer.signal(signal);
    })

  }

  function acceptCall() {
    setCallAccepted(true);
    setIsCalling(false)
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer.on("signal", data => {
      socket.emit("acceptCall", { signal: data, to: caller })
    })

    peer.on("stream", stream => {
      partnerVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
  }

  let UserVideo;
  if (stream) {
    UserVideo = (
      <div className='my-video-container'>
        <video playsInline muted ref={userVideo} autoPlay style = {{width: "100%", height: "100%"}} />
      </div>
    );
  }

  let PartnerVideo;

  if (callAccepted) {
    PartnerVideo = (
      <div className='partner-video-container'>
        <video playsInline ref={partnerVideo} autoPlay style = {{width: "100%", height: "100%"}} />
      </div>
    );
  } else if (receivingCall) {
    PartnerVideo = (
      <div className='partner-video-container'>
        <button style={{height:"20%", width:"50%",margin:'auto'}} onClick={acceptCall}><h1>Accept the call</h1></button>
      </div>
    )
  } else if (isCalling) {
    PartnerVideo = (
      <div className='partner-video-container'>
        <h1 style={{color:'white',margin:'auto'}}>Currently calling...</h1>
      </div>
    )
  } else {
    PartnerVideo = (
      <button onClick = {() => {
          callPeer(props.id2)
      }}><h1>Video Call</h1></button>
    )
  }

  return (
    <div className='right-container'>
        {PartnerVideo}
        {UserVideo}
    </div>
  );
}

export default VideoChatApp;
