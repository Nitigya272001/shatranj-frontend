import React, {useState} from 'react'
import CoreGameC from './ComputerGameLogic/coreGameC'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import '../App.css'

const GameComputer = () => {

    const [depth,setDepth] = useState(null);

    const onChangeHandler = (e) => {
      setDepth(parseInt(e.target.value));
    }

    return (
      <div style={{backgroundColor:'rgb(102, 51, 0)', width:"100vw", display:'flex', flexDirection:'column'}}>
        <div style={{ display: "flex", minHeight:"96vh", width:"100vw", flexDirection:'column', justifyContent:'center', alignItems:'center', gap:'5px'}}>
          <h3 style={{color:'white', textAlign:'center'}}> You(White) vs Computer(Black) | Difficulty : {depth===null ? "Not Set" : depth } </h3>
          {depth===null ? 
            <div style={{height:"10vh",color:'white'}} class="form-group">
                <label for="search-depth"><h3>Difficulty Level: </h3></label>
                <select style={{marginLeft:'5px',height:"30px", width:"40px"}} value={depth} onChange={onChangeHandler} id="search-depth">
                <option value="0" selected>0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                </select>
            </div>
            :
            <div >
              <DndProvider backend={HTML5Backend}>
                <CoreGameC depth={depth} setDepth={setDepth}/>
              </DndProvider> 
            </div>
          }
        </div>
      </div>
    );
};

export default GameComputer