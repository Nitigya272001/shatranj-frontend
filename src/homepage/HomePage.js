import React from 'react'
import {Link} from 'react-router-dom'

const HomePage = () => {
    return (
        <div style={{marginLeft : "33%",marginTop : "5vh",marginBottom : "5vh",border:"3px solid black",height:'50vh', width:"33%", display:'flex', flexDirection:'column', justifyContent:"space-around", alignItems: "center"}}>
            <button className="btn btn-primary" style={{width:"40%"}}>
                <Link to="/online" style={{color:"white",textDecoration:'none'}}> Play with Friends </Link>
            </button>
            <div>OR</div>
            <button className="btn btn-primary" style={{width:"40%"}}>
                <Link to="/computer" style={{color:"white",textDecoration:'none'}}> Play with Computer </Link>
            </button>
        </div>
    )
}

export default HomePage
