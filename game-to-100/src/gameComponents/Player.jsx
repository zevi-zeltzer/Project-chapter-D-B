import { useState } from "react";
// import "./player.css";

function Player(props) {
  const player = JSON.parse(localStorage.getItem(props.name));

  const [num, setNum] = useState(Math.floor(Math.random() * 100));
  const [scores, setScores] = useState(player.scores.join(", "));
  const [actionCounter, setActionCounter] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  
  function winnerUpdating() {
    let playerAverage =
      player.scores.reduce((acc, current) => acc + current, 0) /
      player.scores.length; //חישוב ממוצע של השחקן הנוכחי
    const arrAverage = JSON.parse(localStorage.getItem("arrAverage"));
    const uniqueWinners = [];
    uniqueWinners.push({ name: player.name, average: playerAverage });
    const seenNames = new Set(); //פונקצייה שתוודא שכל שם נכנס למערך החדש רק פעם אחת
    seenNames.add(player.name);
    for (let i = 0; i < arrAverage.length; i++) {
      //לולאה שמכניסה למערך החדש
      const currentName = arrAverage[i].name;
      if (!seenNames.has(currentName)) {
        uniqueWinners.push(arrAverage[i]);
        seenNames.add(currentName);
      }
    }
    uniqueWinners.sort((a, b) => a.average - b.average); //סידור המערך החדש מהקטן לגדול
    uniqueWinners.sort((a, b) => {
      //דחיפה של האפסים לסוף
      if (a.average === 0) return 1;
      if (b.average === 0) return -1;
      return 0;
    });
    if (uniqueWinners.length === 2) {
      //במידה והמערך קטן מ 3 הכנסת איבר נוסף למניעת שגיאת ריצה
      uniqueWinners.push(uniqueWinners[1]);
    }
    console.log(uniqueWinners);
    
    const winner1 = {
      name: uniqueWinners[0].name,
      average: uniqueWinners[0].average,
    };
    const winner2 = {
      name: uniqueWinners[1].name,
      average: uniqueWinners[1].average,
    };
    const winner3 = {
      name: uniqueWinners[2].name,
      average: uniqueWinners[2].average,
    };
    props.setWinner1(winner1);
    props.setWinner2(winner2);
    props.setWinner3(winner3);
    localStorage.setItem("arrAverage", JSON.stringify(uniqueWinners));
  }

  function newGame() {
    setNum(Math.floor(Math.random() * 100));
    setActionCounter(0);
    setGameOver(false);
  }

  function quit() {
  
    const newArrPlayers = props.arrPlayers.filter(
      (player) => player !== props.name
    );
    console.log(newArrPlayers);
    props.setArrPlayers(newArrPlayers);
    console.log(props.arrPlayers.length);
    if(newArrPlayers.length>0){
    props.setCurrentPlayer((props.currentPlayer-1) % newArrPlayers.length);}
    else{
      props.setIfLogin(true);
    }
  }
  function ifCurrent() {
    console.log(props.currentPlayer);
    return props.arrPlayers[props.currentPlayer] === props.name;
  }

  if (num === 100 && !gameOver) {
    setGameOver(true);
    player.scores.push(actionCounter);
    setScores(player.scores.join(", "));
    console.log(scores);
    winnerUpdating();
    localStorage.setItem(player.name, JSON.stringify(player));
    console.log(props.arrPlayers);
  }

  function nextTurn() {
    props.setCurrentPlayer((props.currentPlayer + 1) % props.arrPlayers.length);
  }

  return (
    <>
      { (
        <div className={`player ${ifCurrent() ? "active" : "inactive"}`}>
          <h2 className="name">hello {player.name}</h2>

          <h4 className="scores">scores: {scores} </h4>
          <h3 className="num">num: {num} </h3>
          {gameOver && <h2 className="win">You win!!</h2>}
          <h3 className="steps">num steps: {actionCounter}</h3>
          {!gameOver && (
            <div className="butAction">
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num + 1);
                    setActionCounter(actionCounter + 1);
                    if (num + 1 !== 100) {
                      nextTurn();
                    }
                  }
                }}
              >
                +1
              </button>
              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num - 1);
                    setActionCounter(actionCounter + 1);
                    if (num - 1 !== 100) {
                      nextTurn();
                    }
                  }
                }}
              >
                -1
              </button>

              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(num * 2);
                    setActionCounter(actionCounter + 1);
                    if (num * 2 !== 100) {
                      nextTurn();
                    }
                  }
                }}
              >
                *2
              </button>

              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(100);
                    setActionCounter(actionCounter + 1);
                    nextTurn();
                  }
                }}
              >
                100
              </button>

              <button
                onClick={() => {
                  if (ifCurrent()) {
                    setNum(Math.floor(num / 2));
                    setActionCounter(actionCounter + 1);
                    if (Math.floor(num / 2) !== 100) {
                      nextTurn();
                    }
                  }
                }}
              >
                /2
              </button>
            </div>
          )}
          {gameOver && (
            <div className="butWin">
              <button onClick={newGame}>New Game</button>
              <button onClick={quit}>Quit</button>
            </div>
          )}
        </div>
      )}
    </>
  );
}
export default Player;
