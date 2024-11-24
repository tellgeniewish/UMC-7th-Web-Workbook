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

  const handleAddTodo = async () => {
    if (text.trim() === '') {
      alert('제목을 입력해주세요!');
      return;
    }

    try {
      const response = await axios.post('http://localhost:3000/todo', {
        title: text,
        content: detail,
      });
      // if (response.status === 200) {
      //   alert('ToDo가 성공적으로 추가되었습니다!');
      //   addTodo(); // 로컬 상태에 추가
      //   setText('');
      //   setDetail('');
      // }
      if (response.status === 200) {
        console.log('ToDo가 성공적으로 추가되었습니다!');
        
        const newTodo = { //새로운 데이터 형식에 맞게 업데이트
          id: response.data.id, // API 응답에서 id 가져오기
          task: response.data.title, // title을 task로 매핑
          detail: response.data.content, // content를 detail로 매핑
        };
        setTodos((prevTodos) => [...prevTodos, newTodo]); // 기존 todos에 추가
        // addTodo();
        setText('');
        setDetail('');
      }
    } catch (error) {
      console.error('ToDo 추가 중 오류 발생:', error);
      alert('ToDo를 추가하는 데 실패했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <InputAndButtonWrapper>
    {/* <InputAndButtonWrapper onSubmit={handleSubmit}> */}
        <Input value={text} onChange={(e) => setText(e.target.value)} placeholder="제목을 입력해주세요."/>
        <Input value={detail} onChange={(e) => setDetail(e.target.value)} placeholder="내용을 입력해주세요."/>
        {/* <Button onClick={() => addTodo()} text='ToDo 생성'/> */}
        <Button onClick={handleAddTodo} text="ToDo 생성" />
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