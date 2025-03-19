import React, { useState } from 'react';
import styled from '@emotion/styled';

const Container = styled.div`
  margin: 8px;
`;

const Button = styled.button`
  background: none;
  border: none;
  color: #5e6c84;
  cursor: pointer;
  padding: 8px;
  width: 100%;
  text-align: left;
  font-size: 14px;
  &:hover {
    background-color: rgba(9, 30, 66, 0.08);
    border-radius: 3px;
  }
`;

const Form = styled.form`
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 8px;
  border: 2px solid #0079bf;
  border-radius: 3px;
`;

const AddItem = ({ onAdd, placeholder }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    onAdd(text);
    setText('');
    setIsEditing(false);
  };

  if (!isEditing) {
    return (
      <Container>
        <Button onClick={() => setIsEditing(true)}>+ Add {placeholder}</Button>
      </Container>
    );
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={placeholder}
          autoFocus
        />
        <Button type="submit">Add</Button>
        <Button type="button" onClick={() => setIsEditing(false)}>Cancel</Button>
      </Form>
    </Container>
  );
};

export default AddItem;
