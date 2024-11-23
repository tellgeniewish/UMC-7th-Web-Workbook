// src/components/WantToDo.jsx
import React, { useState, useContext, useEffect } from 'react'
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';

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

  // 💖 Todo 추가 (API 요청)
  // const handleAddTodo = async () => {
  //   if (text.trim().length === 0) {
  //       alert('입력해!');
  //       return;
  //   }

  //   try {
  //       const response = await axios.post('http://localhost:3000/todo', {
  //           task: text,
  //           detail: detail,
  //       });

  //       // 💖 서버에서 받은 새 Todo 항목을 TodoContext에 반영
  //       setTodos((prev) => [...prev, response.data]);

  //       setText('');
  //       setDetail('');
  //   } catch (error) {
  //       console.error('Todo 추가 실패:', error);
  //   }
  // };

  return (
    <InputAndButtonWrapper onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="제목을 입력해주세요."/>
        <Input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="내용을 입력해주세요."/>
        <Button onClick={() => addTodo()} text='ToDo 생성'/>
        {/* <Button onClick={handleAddTodo} text="ToDo 생성" /> */}
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