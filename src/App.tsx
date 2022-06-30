import React, { useEffect, useState } from 'react';
import Board from './components/Board'
import './App.scss';
import { BoardModel } from './models/Board';
import { Player } from './models/Player';
import { Colors } from './models/Colors';
import LostFigures from './components/lost-figures';
import Timer from './components/Timer';

function App() {
  const [board, setBoard] = useState(new BoardModel());
  const [whitePlayer, setWhitePlayer] = useState(new Player(Colors.WHITE));
  const [blackPlayer, setBlackPlayer] = useState(new Player(Colors.BLACK));
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const restart = () => {
    const newBoard = new BoardModel();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  };

  const swapPlayer = () => {
    setCurrentPlayer(currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer);
  }

  useEffect(() => {
    restart();
  }, [])

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <Board board={board} setBoard={setBoard} currentPlayer={currentPlayer} swapPlayer={swapPlayer} />
      <div>
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigures} />
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
