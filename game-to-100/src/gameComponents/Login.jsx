import { useState } from "react";
// import "./login.css"

function Login(props) {
  const [num, setNum] = useState();

  const handel = (e) => {
    e.preventDefault();
  };

  const handleNameChange = (index, value) => {
    if (value) {
      const newArr = [...props.arrPlayers];
      newArr[index] = value;
      props.setArrPlayers([...newArr]);
    }
  };

  const handleInputChange = (event) => {
    if (Number(event.target.value) < 5 && Number(event.target.value) > 0) {
      setNum(event.target.value);
    }
  };
  const login = () => {
    for (let i = 0; i < props.arrPlayers.length; i++) {
      if (!localStorage.getItem(props.arrPlayers[i])) {
        let player = {
          name: props.arrPlayers[i],
          scores: [],
        };
        localStorage.setItem(player.name, JSON.stringify(player));
      }
    }
  };
  const hasDuplicates = arr => new Set(arr).size !== arr.length;

  return (
    <div className="container">
      <h1 className="title">Game to 100!!</h1>
      <label id="number">Enter the number of players 1 - 4</label>
      <input
        className="numPlayers"
        type="number"
        name="number"
        id="number"
        onChange={handleInputChange}
        value={num}
      />
      <div className="playerNameInputs">
        <form onSubmit={handel}>
          {Array.from({ length: num }, (_, index) => (
            <input
              className="playerName"
              type="text"
              id={String(index)}
              onChange={(e) => handleNameChange(index, e.target.value)}
            />
          ))}
          <button
            className="login"
            onClick={() => {
              login();
              console.log("->", props.arrPlayers);
              if (props.arrPlayers.length > 0&&!hasDuplicates(props.arrPlayers)) {
                props.setIfLogin(false);
              }
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
