import React, { FC } from "react";
import { Figure } from "../../models/figures/Figure";
import styles from "./lost-figures.module.scss";

interface LostfiguresProps {
  title: string;
  figures: Figure[];
}

const LostFigures: FC<LostfiguresProps> = ({ title, figures }) => {
  return (
    <div className={styles.lost}>
      <h3>{title}</h3>

      {figures.map((figure) => (
        <div key={figure.id}>
          {figure.name}{" "}
          {figure.image && (
            <img
              src={figure.image}
              width={20}
              height={20}
              alt={figure.name}
            ></img>
          )}
        </div>
      ))}
    </div>
  );
};

export default LostFigures;
