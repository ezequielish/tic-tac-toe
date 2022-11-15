import React, { useState } from 'react';

const rowStyle = {
  display: 'flex'
}

const squareStyle = {
  'width': '60px',
  'height': '60px',
  'backgroundColor': '#ddd',
  'margin': '4px',
  'display': 'flex',
  'justifyContent': 'center',
  'alignItems': 'center',
  'fontSize': '20px',
  'color': 'white'
}

const boardStyle = {
  'backgroundColor': '#eee',
  'width': '208px',
  'alignItems': 'center',
  'justifyContent': 'center',
  'display': 'flex',
  'flexDirection': 'column',
  'border': '3px #eee solid'
}

const containerStyle = {
  'display': 'flex',
  'alignItems': 'center',
  'flexDirection': 'column'
}

const instructionsStyle = {
  'marginTop': '5px',
  'marginBottom': '5px',
  'fontWeight': 'bold',
  'fontSize': '16px',
}

const buttonStyle = {
  'marginTop': '15px',
  'marginBottom': '16px',
  'width': '80px',
  'height': '40px',
  'backgroundColor': '#8acaca',
  'color': 'white',
  'fontSize': '16px',
}
function Square({ order, row, game, handleClick }) {
  return (
    <div
      className="square"
      onClick={() => handleClick(order, row)}
      style={squareStyle}>
      {game}
    </div>
  );
}

function Board() {
  const player1 = "X";
  const player2 = "O";

  const [game, setGame] = useState([
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
  ])
  const [turn, setTurn] = useState(player1)
  const [winner, setWinner] = useState("None")

  const validatePlay = () => {

    if (game[0][0] === turn && game[0][1] === turn && game[0][2] === turn) {
      setWinner(turn)
    }
    if (game[1][0] === turn && game[1][1] === turn && game[1][2] === turn) {
      setWinner(turn)
    }
    if (game[2][0] === turn && game[2][1] === turn && game[2][2] === turn) {
      setWinner(turn)
    }

    if (game[0][0] === turn && game[1][0] === turn && game[2][0] === turn) {
      setWinner(turn)
    }
    if (game[0][1] === turn && game[1][1] === turn && game[2][1] === turn) {
      setWinner(turn)
    }
    if (game[0][2] === turn && game[1][2] === turn && game[2][2] === turn) {
      setWinner(turn)
    }
    if (game[0][0] === turn && game[1][1] === turn && game[2][2] === turn) {
      setWinner(turn)
    }
    if (game[0][2] === turn && game[1][1] === turn && game[2][0] === turn) {
      setWinner(turn)
    }
    if((!game[0].includes("") && !game[1].includes("") && !game[2].includes(""))){
      setWinner("DRAW")
    }
  }

  const reset = () => {
    setGame([
      ["", "", ""],
      ["", "", ""],
      ["", "", ""]
    ])
    setWinner("None")
  }

  const handleClick = (order, row) => {
    if (winner === "None" && (game[0].includes("") || game[1].includes("") || game[2].includes(""))) {
      let _game = [...game]
      _game[row][order] = turn
      setGame(_game)
      validatePlay()
      setTurn(turn === player1 ? player2 : player1)
    }
  }
  return (
    <div style={containerStyle} className="gameBoard">
      <div id="statusArea" className="status" style={instructionsStyle}>Next player: <span>{turn}</span></div>
      <div id="winnerArea" className="winner" style={instructionsStyle}>Winner: <span>{winner}</span></div>
      <button style={buttonStyle} onClick={reset}>Reset</button>
      <div style={boardStyle}>
        <div className="board-row" style={rowStyle}>
          <Square order={0} row={0} handleClick={handleClick} game={game[0][0]} />
          <Square order={1} row={0} handleClick={handleClick} game={game[0][1]} />
          <Square order={2} row={0} handleClick={handleClick} game={game[0][2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square order={0} row={1} handleClick={handleClick} game={game[1][0]} />
          <Square order={1} row={1} handleClick={handleClick} game={game[1][1]} />
          <Square order={2} row={1} handleClick={handleClick} game={game[1][2]} />
        </div>
        <div className="board-row" style={rowStyle}>
          <Square order={0} row={2} handleClick={handleClick} game={game[2][0]} />
          <Square order={1} row={2} handleClick={handleClick} game={game[2][1]} />
          <Square order={2} row={2} handleClick={handleClick} game={game[2][2]} />
        </div>
      </div>
    </div>
  );
}

function Game() {
  return (
    <div className="game">
      <div className="game-board">
        <Board />
      </div>
    </div>
  );
}
export default Game;
