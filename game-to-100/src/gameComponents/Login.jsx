import { useState } from "react";

function Login() {
  const [num, setNum] = useState();
  const [arrNames, setArrName] = useState([]);


  const handel = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (index, value) => {
    if (value) {
      const newArr = [...arrNames];
      newArr[index] = value;
      setArrName(newArr);
    }
  };
  
  const handleInputChange = (event) => {
    if (Number(event.target.value) < 5 && Number(event.target.value) > 0) {
      setNum(event.target.value);
    }
  };

  
  return (
    <div className="container">
      <h1 className="title">Game to 100!!</h1>
      <label id="number">Enter the number of players 1 - 4</label>
      <input className="numPlayers" type="number" name="number" id="number" onChange={handleInputChange} value={num} />
      <div className="playerNameInputs">
        <form onSubmit={handel}>
          {Array.from({ length: num }, (_, index) => (
            <input 
            className="playerName"
              type="text"
              id={toString({ index })}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          ))}
          <button
          className="login"
            onClick={() => {
              console.log("->", arrNames); //פונקציה שבונה אובייקט למשתמש חדש ושולחת ללוקאל והופכת לדיספליי נאן
            }}
          >
            login
          </button>
        </form>
      </div>
    </div>
  );
}
export default Login;
