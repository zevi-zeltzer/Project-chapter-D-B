import Login from "./gameComponents/Login";
import { useState } from "react";
import "./App.css";

import Player from "./gameComponents/Player";

function App() {
  if (!localStorage.getItem("arrAverage")) {
    const arr = [
      { name: "", average: 0 },
      { name: "", average: 0 },
      { name: "", average: 0 },
    ];
    localStorage.setItem("arrAverage", JSON.stringify(arr));
  }

  const [ifLogin, setIfLogin] = useState(true);

  const [arrPlayers, setArrPlayers] = useState([]);
  const [currentPlayer, setCurrentPlayer] = useState(0);

  console.log(arrPlayers);
  const arrAverage = JSON.parse(localStorage.getItem("arrAverage"));
  const [winner1, setWinner1] = useState(arrAverage[0]);
  const [winner2, setWinner2] = useState(arrAverage[1]);
  const [winner3, setWinner3] = useState(arrAverage[2]);

  return (
    <div className="App">
      {ifLogin && (
        <Login
          setIfLogin={setIfLogin}
          arrPlayers={arrPlayers}
          setArrPlayers={setArrPlayers}
        />
      )}
      {!ifLogin && (
        <>
          <div className="winners-display">
            <p className="winner">
              {" "}
              winner 1- {winner1.name} {Math.floor(winner1.average)}
            </p>
            <p className="winner">
              {" "}
              winner 2- {winner2.name} {Math.floor(winner2.average)}
            </p>
            <p className="winner">
              {" "}
              winner 3- {winner3.name} {Math.floor(winner3.average)}
            </p>
          </div>
          <div
            className={`player-container ${
              arrPlayers.length === 1
                ? "one-player"
                : arrPlayers.length === 2
                ? "two-players"
                : arrPlayers.length === 3
                ? "three-players"
                : arrPlayers.length === 4
                ? "four-players"
                : ""
            }`}
          >
            {arrPlayers.map((player, index) => (
              <Player
                key={player}
                name={player}
                currentPlayer={currentPlayer}
                setCurrentPlayer={setCurrentPlayer}
                arrPlayers={arrPlayers}
                setArrPlayers={setArrPlayers}
                setWinner1={setWinner1}
                setWinner2={setWinner2}
                setWinner3={setWinner3}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default App;
