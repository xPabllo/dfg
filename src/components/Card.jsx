import React, { useState } from 'react';
import styled from '@emotion/styled';
import { Draggable } from 'react-beautiful-dnd';

const CardContainer = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
  background-color: ${props => (props.isDragging ? '#f9f9f9' : 'white')};
  box-shadow: ${props => (props.isDragging ? '0 2px 5px rgba(0,0,0,0.1)' : 'none')};
  position: relative;
  &:hover .delete-button {
    display: block;
  }
`;

const DeleteButton = styled.button`
  position: absolute;
  top: 4px;
  right: 4px;
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

const CardContent = styled.div`
  cursor: pointer;
  padding: 4px;
  &:hover {
    background: #f0f0f0;
    border-radius: 3px;
  }
`;

const CardInput = styled.input`
  width: 100%;
  padding: 4px;
  border: 2px solid #0079bf;
  border-radius: 3px;
  font-size: inherit;
  font-family: inherit;
`;

const Card = ({ card, index, onDelete, onRename }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(card.content);

  const handleDelete = (e) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this card?')) {
      onDelete(card.id);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      onRename(card.id, content);
      setIsEditing(false);
    }
  };

  const handleBlur = () => {
    if (content.trim()) {
      onRename(card.id, content);
    } else {
      setContent(card.content);
    }
    setIsEditing(false);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardContainer
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          isDragging={snapshot.isDragging}
        >
          {isEditing ? (
            <CardInput
              type="text"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              onBlur={handleBlur}
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit(e)}
              autoFocus
            />
          ) : (
            <CardContent onClick={() => setIsEditing(true)}>
              {card.content}
            </CardContent>
          )}
          <DeleteButton className="delete-button" onClick={handleDelete}>
            ✕
          </DeleteButton>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default Card;
