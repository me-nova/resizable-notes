import React, { FC } from "react";

import "./colorPanel.scss";

export enum CardColorPalette {
  RED = "red",
  GREEN = "green",
  BLUE = "blue",
  YELLOW = "yellow",
}

interface IProps {
  color: CardColorPalette;
  setCardColor: (color: CardColorPalette) => void;
}

const colors = [CardColorPalette.YELLOW, CardColorPalette.RED, CardColorPalette.GREEN, CardColorPalette.BLUE];

const ColorPanel: FC<IProps> = ({ color, setCardColor }) => {

  return (
    <div className="color">
      {colors.map((colorPallet, idx) => (
        <span key={`${colorPallet}_${idx}`}>
          <input
            type="radio"
            value={colorPallet}
            checked={color === colorPallet}
            onChange={() => {setCardColor(colorPallet)}}
            name="color"
            id={colorPallet}
          />
          <label
            className={colorPallet}
            htmlFor={colorPallet}
          />
        </span>
      ))}
    </div>
  )
}

export default ColorPanel;