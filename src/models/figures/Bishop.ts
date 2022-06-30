import { CellModel } from "../Cell";
import { Colors } from "../Colors";
import { Figure, FigureNames } from "./Figure";
import blackLogo from '../../assets/black-bishop.png'
import whiteLogo from '../../assets/white-bishop.png'

export class Bishop extends Figure {

    constructor(color: Colors, cell: CellModel) {
        super(color, cell);
        this.image = color === Colors.BLACK ? blackLogo : whiteLogo;
        this.name = FigureNames.BISHOP;
    }

    canMove = (target: CellModel): boolean => {
        if (!super.canMove(target)) return false;

        if (this.cell.isEmptyDiagonal(target)) return true;

        return false;
    }
}