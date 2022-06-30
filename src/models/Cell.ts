import { BoardModel } from "./Board";
import { Colors } from "./Colors";
import { Figure } from "./figures/Figure";

export class CellModel {
    readonly x: number;
    readonly y: number;
    readonly color: Colors;

    figure: Figure | null;
    board: BoardModel;
    available: boolean;
    id: number;

    constructor(board: BoardModel, x: number, y: number, color: Colors, figure: Figure | null) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.figure = figure;
        this.board = board;
        this.available = false;
        this.id = Math.random();
    }

    isEmpty() {
        return this.figure === null;
    }
    setFigure(figure: Figure) {
        this.figure = figure;
        this.figure.cell = this;
    }
    addLostFigure(figure: Figure) {
        figure.color === Colors.BLACK ? this.board.lostBlackFigures.push(figure) : this.board.lostWhiteFigures.push(figure)
    }
    moveFigure(target: CellModel) {
        if (this.figure && this.figure.canMove(target)) {
            this.figure.moveFigure(target);

            if (target.figure) {
                this.addLostFigure(target.figure)
            }
            target.setFigure(this.figure);
            this.figure = null;
        }
    }

    isEmptyVertical(target: CellModel): boolean {
        if (this.x !== target.x) return false;
        const min = Math.min(this.y, target.y);
        const max = Math.max(this.y, target.y);

        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(this.x, i).isEmpty()) return false;
        }
        return true;

    }
    isEmptyHorizontal(target: CellModel): boolean {
        if (this.y !== target.y) return false;
        const min = Math.min(this.x, target.x);
        const max = Math.max(this.x, target.x);

        for (let i = min + 1; i < max; i++) {
            if (!this.board.getCell(i, this.y).isEmpty()) return false;
        }
        return true;

    }
    public isEnemy(target: CellModel) {
        if (target.figure) return this.figure?.color !== target.figure.color;
        return false;
    }
    isEmptyDiagonal(target: CellModel): boolean {
        const absX = Math.abs(target.x - this.x);
        const absY = Math.abs(target.y - this.y);
        if (absY !== absX) return false;

        const dy = this.y < target.y ? 1 : -1;
        const dx = this.x < target.x ? 1 : -1;

        for (let i = 1; i < absY; i++) {
            if (!this.board.getCell(this.x + dx * i, this.y + dy * i).isEmpty()) return false;
        }
        return true;

    }
}