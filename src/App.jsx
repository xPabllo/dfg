import React, { useState } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Board from './components/Board';
import { initialData } from './data';

function App() {
  const [data, setData] = useState(initialData);

  const onDragEnd = (result) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const sourceList = data.lists[source.droppableId];
    const destList = data.lists[destination.droppableId];
    const newSourceCards = Array.from(sourceList.cards);
    const newDestCards = source.droppableId === destination.droppableId
      ? newSourceCards
      : Array.from(destList.cards);

    // Remove from source
    newSourceCards.splice(source.index, 1);

    // Add to destination
    if (source.droppableId === destination.droppableId) {
      newSourceCards.splice(destination.index, 0, draggableId);
    } else {
      newDestCards.splice(destination.index, 0, draggableId);
    }

    const newData = {
      ...data,
      lists: {
        ...data.lists,
        [source.droppableId]: {
          ...sourceList,
          cards: newSourceCards,
        },
        [destination.droppableId]: {
          ...destList,
          cards: newDestCards,
        },
      },
    };

    setData(newData);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Board data={data} setData={setData} />
    </DragDropContext>
  );
}

export default App;
