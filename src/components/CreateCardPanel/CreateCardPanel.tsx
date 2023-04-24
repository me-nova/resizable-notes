import React, { FC, ChangeEvent, memo } from "react";
import cx from "classnames";
import { ICard } from "../Card/Card"
import { CardColorPalette } from "../ColorPanel/ColorPanel"
import ColorPanel  from "../ColorPanel/ColorPanel"

import "./createCardPanel.scss";

export enum CardContent {
  TITLE = "title",
  DESCRIPTION = "description",
}

interface IProps {
  setValue: (card: ICard, prop: CardContent) => (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => void;
  saveCard: () => void
  card: ICard;
  isHidden: boolean;
  setCardColor: (color: CardColorPalette) => void;
  isError: boolean;
}

const CreateCardPanel: FC<IProps> = memo(({isError, setCardColor, saveCard, isHidden= true,  card, setValue}) => {
    const {title, description, color} = card;
    return (
      <div className={cx("panel", {"panel--is-hidden": isHidden})}>
        <div className="panel__title">
          <input
            value={title}
            onChange={setValue(card, CardContent.TITLE)}
            type="text"
          />
        </div>
        <div className="panel__description">
        <textarea
          value={description}
          onChange={setValue(card, CardContent.DESCRIPTION)}
        />
        </div>
        <ColorPanel
          color={color}
          setCardColor={setCardColor}
        />
        <div className="panel__save-btn">
          <button onClick={saveCard}>
            Save
          </button>
        </div>
        {isError && (
          <div className={"panel__error"}>
            All fields should be filled
          </div>
        )}
      </div>
    )
  }
)
export default CreateCardPanel;