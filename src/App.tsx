import React, {ChangeEvent, useState, useCallback } from 'react';
import CardList from "./components/CardList/CardList";
import CreateCardPanel from "./components/CreateCardPanel/CreateCardPanel";
import { ICard } from "./components/Card/Card";
import { CardColorPalette } from "./components/ColorPanel/ColorPanel"
import { CardContent } from "./components/CreateCardPanel/CreateCardPanel"
import ClickOutsideAction from "./utils/hooks/useClickOutside"
import uniqid from "uniqid";

import './App.scss';

const defaultNewCard = {
  title: "",
  description: "",
  color: CardColorPalette.YELLOW,
  id: "",
}

function App() {
  const [newCard, setNewCard] = useState<ICard>(defaultNewCard)
  const [savedCards, setSavedCards] = useState<ICard[]>([])
  const [isCreateCardPanelHidden, setIsCreateCardPanelHidden] = useState(true);
  const [isError, setIsError] = useState(false);

  const setCardColorHandler = useCallback((color: CardColorPalette) => {
    setNewCard({...newCard, color})
  }, [newCard]);

  const removeCardHandler = useCallback((id: string) => {
    const cloneSavedCards = [...savedCards];
    const updatedSavedCards = cloneSavedCards.filter(card => card.id !== id);
    setSavedCards(updatedSavedCards);
  }, [savedCards]);

  const createNewCardOnChange = useCallback(
    (card: ICard, prop: CardContent) => (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
      setIsError(false);
      const newCard = {
        ...card,
        [prop]: e.target.value,
      }

      setNewCard(newCard)
    }, [])

  const saveNewCardHandler = useCallback((newCard: ICard) => {
    if (newCard.title === "" || newCard.description === "") {
      setIsError(true);
      return;
    }

    if (!newCard.id) {
      const savedNewCard = {
        ...newCard,
        id: uniqid(),
      }
      setSavedCards([...savedCards, savedNewCard]);
      setNewCard(defaultNewCard);
    } else {
      const cloneCards = [...savedCards];
      const idx = cloneCards.findIndex((card) => card.id === newCard.id)
      if(idx > 0 || idx === 0) {
        cloneCards[idx] = newCard;
        setSavedCards(cloneCards)
        setNewCard(defaultNewCard);
      }
    }
  }, [savedCards]);

  const editCardHandler = useCallback((id: string) => {
    setIsCreateCardPanelHidden(false);
    const cloneSavedCards = [...savedCards];
    const card = cloneSavedCards.find((card) => card.id === id );
    if (card) {
      setNewCard(card)
    }
  }, [savedCards])

  return (
    <div className="App">
      <button
        onClick={() => {setIsCreateCardPanelHidden(false)}}
        className="create-btn"
      >
        Create new
      </button>

      <ClickOutsideAction action={() => {
        setIsCreateCardPanelHidden(true);
        setNewCard(defaultNewCard)
      }}
      >
        <CreateCardPanel
          isError={isError}
          setCardColor={setCardColorHandler}
          setValue={createNewCardOnChange}
          card={newCard}
          isHidden={isCreateCardPanelHidden}
          saveCard={() => saveNewCardHandler(newCard)}
        />
      </ClickOutsideAction>

      <CardList
        editCard={editCardHandler}
        removeCard={removeCardHandler}
        cards={savedCards}
      />

      <div id="trash"/>
    </div>
  );
}

export default App;
