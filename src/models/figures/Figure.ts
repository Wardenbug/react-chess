import { Colors } from "../Colors";
import logo from "../../logo.svg";
import { CellModel } from "../Cell";

export enum FigureNames {
  FIGURE = "figure",
  KING = "king",
  KNIGHT = "knight",
  PAWN = "pawn",
  QUEEN = "queen",
  ROOK = "rook",
  BISHOP = "bishop",
}

export class Figure {
  color: Colors;
  image: typeof logo | null;
  cell: CellModel;
  name: FigureNames;
  id: number;

  constructor(color: Colors, cell: CellModel) {
    this.color = color;
    this.cell = cell;
    this.cell.figure = this;
    this.image = null;
    this.name = FigureNames.FIGURE;
    this.id = Math.random();
  }

  public canMove(target: CellModel): boolean {
    console.log('a')
    if (target.figure?.color === this.color) return false;

    if (target?.figure?.name === FigureNames.KING) return false;
    return true;
  }

  public moveFigure(target: CellModel) {}
}
