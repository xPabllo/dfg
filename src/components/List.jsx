import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Droppable } from 'react-beautiful-dnd';
import Card from './Card';
import AddItem from './AddItem';

const ListContainer = styled.div`
  background-color: #ebecf0;
  border-radius: 3px;
  width: 300px;
  padding: 8px;
  height: fit-content;
  margin-right: 8px;
  position: relative;
  &:hover .delete-list-button {
    display: block;
  }
`;

const TitleContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
`;

const Title = styled.div`
  margin: 0;
  cursor: pointer;
  padding: 4px;
  border-radius: 3px;
  &:hover {
    background: rgba(9, 30, 66, 0.08);
  }
`;

const TitleInput = styled.input`
  margin: 0;
  font-size: inherit;
  font-weight: bold;
  border: 2px solid #0079bf;
  border-radius: 3px;
  padding: 4px;
  width: 200px;
`;

const DeleteListButton = styled.button`
  background: #eb5a46;
  color: white;
  border: none;
  border-radius: 3px;
  padding: 4px 8px;
  cursor: pointer;
  display: none;
  font-size: 12px;
  &:hover {
    background: #cf513d;
  }
`;

const CardList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props => (props.isDraggingOver ? '#ddd' : 'inherit')};
  min-height: 100px;
`;

const List = ({ list, cards, data, setData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(list.title);

  const addCard = (content) => {
    const newCardId = `card-${Object.keys(data.cards).length + 1}`;
    const newCard = {
      id: newCardId,
      content,
    };

    setData({
      ...data,
      cards: {
        ...data.cards,
        [newCardId]: newCard,
      },
      lists: {
        ...data.lists,
        [list.id]: {
          ...list,
          cards: [...list.cards, newCardId],
        },
      },
    });
  };

  const deleteCard = (cardId) => {
    const newCards = { ...data.cards };
    delete newCards[cardId];
    
    const newLists = { ...data.lists };
    newLists[list.id].cards = list.cards.filter(id => id !== cardId);

    setData({
      ...data,
      cards: newCards,
      lists: newLists,
    });
  };

  const deleteList = () => {
    if (window.confirm('Are you sure you want to delete this list and all its cards?')) {
      const newData = { ...data };
      
      // Remove all cards in the list
      list.cards.forEach(cardId => {
        delete newData.cards[cardId];
      });
      
      // Remove the list
      delete newData.lists[list.id];
      
      // Update listOrder
      newData.listOrder = newData.listOrder.filter(id => id !== list.id);
      
      setData(newData);
    }
  };

  const renameList = (newTitle) => {
    if (newTitle.trim() && newTitle !== list.title) {
      setData({
        ...data,
        lists: {
          ...data.lists,
          [list.id]: {
            ...list,
            title: newTitle,
          },
        },
      });
    }
  };

  const renameCard = (cardId, newContent) => {
    if (newContent.trim() && newContent !== data.cards[cardId].content) {
      setData({
        ...data,
        cards: {
          ...data.cards,
          [cardId]: {
            ...data.cards[cardId],
            content: newContent,
          },
        },
      });
    }
  };

  const handleTitleBlur = () => {
    if (title.trim()) {
      renameList(title);
    } else {
      setTitle(list.title);
    }
    setIsEditing(false);
  };

  const handleTitleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleTitleBlur();
    }
  };

  return (
    <ListContainer>
      <TitleContainer>
        {isEditing ? (
          <TitleInput
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={handleTitleBlur}
            onKeyPress={handleTitleKeyPress}
            autoFocus
          />
        ) : (
          <Title onClick={() => setIsEditing(true)}>{list.title}</Title>
        )}
        <DeleteListButton className="delete-list-button" onClick={deleteList}>
          Delete List
        </DeleteListButton>
      </TitleContainer>
      <Droppable droppableId={list.id}>
        {(provided, snapshot) => (
          <CardList
            ref={provided.innerRef}
            {...provided.droppableProps}
            isDraggingOver={snapshot.isDraggingOver}
          >
            {cards.map((card, index) => (
              <Card 
                key={card.id} 
                card={card} 
                index={index} 
                onDelete={deleteCard}
                onRename={renameCard}
              />
            ))}
            {provided.placeholder}
          </CardList>
        )}
      </Droppable>
      <AddItem onAdd={addCard} placeholder="Add new card" />
    </ListContainer>
  );
};

export default List;
