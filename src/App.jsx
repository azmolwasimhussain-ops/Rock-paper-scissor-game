import React from 'react'
import { useState } from "react"


function App() {
  const [streak, setStreak] = useState(0)
  const [rounds, setRounds] = useState(0)
  const [maxstr, setMaxstr] = useState(0)
  const [userScore, setUserScore] = useState(0)
  const [computerScore, setComputerScore] = useState(0)
  const [display, setDisplay] = useState("Make your move!!")
  const [history, setHistory] = useState([])
  const [lastUserMove, setLastUserMove] = useState(null)
  const [lastComputerMove, setLastComputerMove] = useState(null)

  const getEmoji = (choice) => {
    if (choice === "Rock") return "🪨";
    if (choice === "Paper") return "📄";
    if (choice === "Scissors") return "✂️";
    return "❓";
  };

  function handleClick(move) {
    let computerMove = Math.random()
    if(computerMove < 0.33){
      computerMove = "Rock"
    }else if(computerMove < 0.66){
      computerMove = "Paper"
    }else{
      computerMove = "Scissors"
    }

    let currentResult = ""
    if (move === computerMove){
      currentResult = "Draw"
      setDisplay(currentResult)
    }else if(move === "Rock" && computerMove === "Scissors"){
      setStreak(streak+1)
      currentResult = "You Win 🏆"
      setDisplay(currentResult)
      setUserScore(userScore + 1)
    }else if(move === "Paper" && computerMove === "Rock"){
      setStreak(streak+1)
      currentResult = "You Win 🏆"
      setDisplay(currentResult)
      setUserScore(userScore + 1)
    }else if(move === "Scissors" && computerMove === "Paper"){
      setStreak(streak+1)
      currentResult = "You Win 🏆"
      setDisplay(currentResult)
      setUserScore(userScore + 1)
    }else{
      if (streak > maxstr){
        setMaxstr(streak)
      }
      setStreak(0)
      currentResult = "You Lose 💔"
      setDisplay(currentResult)
      setComputerScore(computerScore + 1)
    }
    setRounds(rounds + 1)
    setLastUserMove(move)
    setLastComputerMove(computerMove)
    setHistory(prev => [{ round: rounds + 1, playerMove: move, computerMove: computerMove, result: currentResult }, ...prev])
  }

  function reset() {
    setStreak(0)
    setRounds(0)
    setMaxstr(0)
    setUserScore(0)
    setComputerScore(0)
    setDisplay("Make your move!!")
    setHistory([])
    setLastUserMove(null)
    setLastComputerMove(null)
  }


  return (
    <div className="main-container">
      <div className="header">
        <h1>Rock Paper Scissors</h1>
        <p>Can you beat the machine?</p>
      </div>
      <div className="streak-container">
        <div>
          <h3>Rounds</h3>
          <p>{rounds}</p>
        </div>
        <div>
          <h3>Streak</h3>
          <p>{streak}</p>
        </div>
        <div>
          <h3>Max Streak</h3>
          <p>{maxstr}</p>
        </div>
      </div>
      <div className="score-card">
        <div>
          <h3>You</h3>
          <p>{userScore}</p>
          <div className="play-emoji">
            {lastUserMove ? getEmoji(lastUserMove) : "🧑‍💻"}
          </div>
        </div>
        <h1>:</h1>
        <div>
          <h3>Computer</h3>
          <p>{computerScore}</p>
          <div className="play-emoji">
            {lastComputerMove ? getEmoji(lastComputerMove) : "🤖"}
          </div>
        </div>
      </div>
      <div className="choices">
        <button onClick={() => handleClick("Rock")}>🪨</button>
        <button onClick={() => handleClick("Paper")}>📄</button>
        <button onClick={() => handleClick("Scissors")}>✂️</button>
      </div>
      <h3>{display}</h3>
      <button onClick={reset}>Play Again</button>
      <div className="history-section">
        <h3>Previous Moves</h3>
        <ul className="history-list">
          {history.map((game, index) => (
            <li key={index} className="history-item">
              Round {game.round}: You played <strong>{game.playerMove}</strong>, Computer played <strong>{game.computerMove}</strong> - {game.result}
            </li>
          ))}
        </ul>
      </div>
    </div>

  )
}

export default App;