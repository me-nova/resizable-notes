import React, { FC, useEffect, useRef } from "react";
import { elementsOverlap } from "../../utils/helper";
import { CardColorPalette } from "../ColorPanel/ColorPanel"
import cx from "classnames";

import "./card.scss"

export interface ICard {
  title: string;
  description: string;
  id: string;
  color: CardColorPalette;
}

interface IProps extends ICard {
  removeCard: (id: string) => void;
  editCard: (id: string) => void;
}

const Card: FC<IProps> = ({editCard, removeCard, title, description, color, id}) => {
  const cardRef = useRef(null);
  useEffect(() => {
    const trash = document.getElementById("trash");
    const OnMouseUpCardRemover = () => {
      if (elementsOverlap(trash, cardRef.current)) {
        removeCard(id)
      }
    };
    document.addEventListener("mouseup", OnMouseUpCardRemover)

    return () => {
      document.removeEventListener("mouseup", OnMouseUpCardRemover)
    }
  }, [removeCard, id])

  return (
    <div
      ref={cardRef}
      className={cx("card", `card--${color}` )}
    >
      <div className="card__title">
        {title}
      </div>
      <div className="card__description">
        {description}
      </div>
      <div
        onClick={() => editCard(id)}
        className="card__edit"
      >
        edit
      </div>
    </div>
  )
}

export default Card;