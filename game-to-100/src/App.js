

import Login from './gameComponents/Login';
import { useState } from 'react';

import Player from './gameComponents/Player'; 

function App() {
  const[ifLogin,setIfLogin]=useState(true);
  
  const [arrPlayers, setArrPlayers] = useState([]);
  const[currentPlayer,setCurrentPlayer]=useState(0)
 
  
  return (
    <div className="App">
     {ifLogin&&<Login setIfLogin={setIfLogin} arrPlayers={arrPlayers} setArrPlayers={setArrPlayers}/>}
     {!ifLogin&&arrPlayers.map((player)=>{
      console.log(player);
      
     return <Player name={player} currentPlayer={currentPlayer} setCurrentPlayer={setCurrentPlayer} arrPlayers={arrPlayers} setArrPlayers={setArrPlayers}/>
     })}
    </div>
  );
}

export default App;
