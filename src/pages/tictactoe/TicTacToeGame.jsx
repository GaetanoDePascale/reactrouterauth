import { Divider } from 'antd';
import { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { calculateWinner } from '.';
import Board from './Board';
import './TicTacToeGame.css';

const TicTacToeGame = () => {
  const [setPageTitle, setPageSubtitle] = useOutletContext();

  const [history, setHistory] = useState([{ squares: Array(9).fill(null) }]);
  const [stepNumber, setStepNumber] = useState(0);
  const [xIsNext, setXIsNext] = useState(true);

  useEffect(() => {
    setPageSubtitle('A React Tic Tac Toe Game');
  }, [setPageTitle, setPageSubtitle]);

  const handleClick = (i) => {
    const localHistory = history.slice(0, stepNumber + 1);
    const current = localHistory[localHistory.length - 1];

    const newSquares = current.squares.slice();

    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    newSquares[i] = xIsNext ? 'X' : 'O';

    setHistory([
      ...history,
      {
        squares: newSquares,
      },
    ]);
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = (step) => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const restartGame = () => {
    setHistory([{ squares: Array(9).fill(null) }]);
    setStepNumber(0);
    setXIsNext(true);
  };

  const currentHistory = history;
  const currentMove = currentHistory[stepNumber];

  const winner = calculateWinner(currentMove.squares);

  const moves = currentHistory.map((step, move) => {
    const desc = move ? 'Go to move #' + move : 'Go to game start';
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  moves.push(
    <li key={'restart'}>
      <button onClick={() => restartGame()}>Restart Game</button>
    </li>
  );

  let status;
  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    <>
      <div className="game">
        <div className="game-board">
          <Board squares={currentMove.squares} handleClick={handleClick} />
        </div>
      </div>
      <Divider />
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </>
  );
};

export default TicTacToeGame;
