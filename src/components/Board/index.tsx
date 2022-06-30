import React, { FC, Fragment, useEffect, useState } from "react";
import { BoardModel } from "../../models/Board";
import { CellModel } from "../../models/Cell";
import { Player } from "../../models/Player";
import style from "./board.module.scss";
import Cell from "../Cell";

interface BoardProps {
  board: BoardModel;
  setBoard: (board: BoardModel) => void;
  currentPlayer: Player | null;
  swapPlayer: () => void;
}
const Board: FC<BoardProps> = ({
  board,
  setBoard,
  currentPlayer,
  swapPlayer,
}) => {
  const [selectedCell, setSelectedCell] = useState<CellModel | null>(null);

  const handleClick = (cell: CellModel) => {
    if (
      selectedCell &&
      selectedCell !== cell &&
      selectedCell.figure?.canMove(cell)
    ) {
      selectedCell.moveFigure(cell);
      swapPlayer();
      setSelectedCell(null);
    } else {
      if (cell.figure?.color === currentPlayer?.color) {
        setSelectedCell(cell);
      }
    }
  };

  useEffect(() => {
    highlightCells();
  }, [selectedCell]);

  const highlightCells = () => {
    board.highlightCells(selectedCell);
    updateBoard();
  };

  const updateBoard = () => {
    const newBoard = board.getCopyBoard();
    setBoard(newBoard);
  };

  return (
    <div>
      <h3>Current Player {currentPlayer?.color}</h3>
      <div className={style.board}>
        {board.cells.map((row, index) => {
          return (
            <Fragment key={index}>
              {row.map((cell) => {
                return (
                  <Cell
                    cell={cell}
                    key={cell.id}
                    selected={
                      cell.x === selectedCell?.x && cell.y === selectedCell?.y
                    }
                    onClick={handleClick}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
};

export default Board;
