import React, { FC } from "react";
import classNames from "classnames";
import { CellModel } from "../../models/Cell";
import styles from "./cell.module.scss";

interface CellProps {
  cell: CellModel;
  selected: boolean;
  onClick: (cell: CellModel) => void;
}

const Cell: FC<CellProps> = ({ cell, selected, onClick }) => {
  return (
    <div
      className={classNames(styles.cell, styles[cell.color], {
        [styles.selected]: selected,
        [styles.haveFigures]: Boolean(cell.figure),
      })}
      onClick={() => onClick(cell)}
      style={{ background: cell.available && cell.figure ? "green" : "" }}
    >
      {cell.available && !cell.figure && <div className={styles.available} />}
      {cell.figure?.image && (
        <img src={cell.figure?.image} alt={cell.figure.name} />
      )}
    </div>
  );
};

export default Cell;
