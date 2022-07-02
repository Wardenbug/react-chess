import { CellModel } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from "../../assets/black-king.png";
import whiteLogo from "../../assets/white-king.png";

export class King extends Figure {
  constructor(color: Colors, cell: CellModel) {
    super(color, cell);
    this.image = color === Colors.BLACK ? blackLogo : whiteLogo;
    this.name = FigureNames.KING;
  }

  canMove = (target: CellModel): boolean => {
    if (!super.canMove(target)) return false;

    console.log(this.cell, target);
    if (Math.abs(this.cell.y - target.y) < 2) return true;
    if (Math.abs(this.cell.x - target.x) < 2) return true;
    return false;
  };
}
