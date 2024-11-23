// src/components/WantToDo.jsx
import React, { useState, useContext } from 'react'
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';

const WantToDo = () => {
    const {
      todos, setTodos,
      text, setText,
      detail, setDetail,
      editingId, setEditingId,
      editText, setEditText,
      editDetail, setEditDetail,
      handleSubmit,
      addTodo,
      deleteTodo,
      updateTodo
    } = useContext(TodoContext)

  return (
    <InputAndButtonWrapper onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="제목을 입력해주세요."/>
        <Input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="내용을 입력해주세요."/>
        <Button onClick={() => addTodo()} text='ToDo 생성'/>
    </InputAndButtonWrapper>
  )
}

export default WantToDo

const InputAndButtonWrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-top: 20px;
  margin-bottom: 50px;
  width: 500px;
`;