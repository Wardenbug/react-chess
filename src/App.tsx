import React, { useCallback, useEffect, useMemo, useState } from "react";
import Board from "./components/Board";
import "./App.scss";
import { BoardModel } from "./models/Board";
import { Player } from "./models/Player";
import { Colors } from "./models/Colors";
import LostFigures from "./components/LostFigures";
import Timer from "./components/Timer";

function App() {
  const [board, setBoard] = useState(new BoardModel());
  const [currentPlayer, setCurrentPlayer] = useState<Player | null>(null);

  const whitePlayer = useMemo(() => {
    return new Player(Colors.WHITE);
  }, []);

  const blackPlayer = useMemo(() => {
    return new Player(Colors.BLACK);
  }, []);

  const restart = useCallback(() => {
    const newBoard = new BoardModel();
    newBoard.initCells();
    newBoard.addFigures();
    setBoard(newBoard);
    setCurrentPlayer(whitePlayer);
  }, [whitePlayer]);

  const swapPlayer = () => {
    setCurrentPlayer(
      currentPlayer?.color === Colors.WHITE ? blackPlayer : whitePlayer
    );
  };

  useEffect(() => {
    restart();
  }, [restart]);

  return (
    <div className="app">
      <Timer currentPlayer={currentPlayer} restart={restart} />
      <Board
        board={board}
        setBoard={setBoard}
        currentPlayer={currentPlayer}
        swapPlayer={swapPlayer}
      />
      <div>
        <LostFigures title={"Черные фигуры"} figures={board.lostBlackFigures} />
        <LostFigures title={"Белые фигуры"} figures={board.lostWhiteFigures} />
      </div>
    </div>
  );
}

export default App;
