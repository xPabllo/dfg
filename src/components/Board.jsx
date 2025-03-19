import React from 'react';
import styled from '@emotion/styled';
import List from './List';
import AddItem from './AddItem';

const BoardContainer = styled.div`
  display: flex;
  padding: 20px;
  overflow-x: auto;
  height: 100vh;
`;

const Board = ({ data, setData }) => {
  const addList = (title) => {
    const newListId = `list-${Object.keys(data.lists).length + 1}`;
    const newList = {
      id: newListId,
      title,
      cards: [],
    };

    setData({
      ...data,
      lists: {
        ...data.lists,
        [newListId]: newList,
      },
      listOrder: [...data.listOrder, newListId],
    });
  };

  return (
    <BoardContainer>
      {data.listOrder.map((listId) => {
        const list = data.lists[listId];
        const cards = list.cards.map(cardId => data.cards[cardId]);
        return <List key={list.id} list={list} cards={cards} data={data} setData={setData} />;
      })}
      <AddItem onAdd={addList} placeholder="Add new list" />
    </BoardContainer>
  );
};

export default Board;
