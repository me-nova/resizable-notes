import React, { FC, memo } from "react";
import { ICard } from "../Card/Card";
import Card from "../Card/Card";
import ResizableContainer from "../ResizableWrapper/ResazibleWrapper"

interface ICardList {
  cards: ICard[];
  removeCard: (id: string) => void;
  editCard: (id: string) => void;
}

const CardList: FC<ICardList> = memo(({editCard, removeCard, cards}) => {
  return (
    <>
      {cards.map(({title, description, color, id}) => (
        <ResizableContainer
          id={id}
          key={id}
        >
          <Card
            editCard={editCard}
            removeCard={removeCard}
            title={title}
            description={description}
            color={color}
            id={id}
          />
        </ResizableContainer>
      ))}
    </>
  )
})

export default CardList;