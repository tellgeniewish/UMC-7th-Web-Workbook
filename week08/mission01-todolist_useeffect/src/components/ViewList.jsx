// src/components/ViewList.jsx
import React, { useState, useContext, useEffect } from 'react'
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';

const ViewList = () => {
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

  // 컴포넌트가 처음 렌더링될 때 Todo 목록을 가져옵니다.
  // useEffect(() => {
  //   const fetchTodos = async () => {
  //     try {
  //       const response = await axios.get('http://localhost:3000/todo');
  //       setTodos(response.data);  // 서버에서 받은 Todo 목록을 상태에 저장
  //     } catch (error) {
  //       console.error('Todo 목록 조회 실패:', error);
  //     }
  //   };
  //   fetchTodos();
  // }, [setTodos]);

  return (
    <Value>
          {todos.map((todo, _) => (
              <ValueAndBtn className='inputAndBtn' key={todo.id}> {/*jsx는 동일한 위치에 연속된 태그 불가 -> 부모 요소로 감싸줘야 함*/}
                <input type="checkbox" id={`${todo.id}`}/>
                <label htmlFor={`${todo.id}`}>
                  {/* 수정이 아닐 때 */}
                  {/*{isEditing === false && (*/}
                  {editingId !== todo.id && (
                    <TodoItem className='todoView' key={todo.id}>
                      <ViewIndex><p>{todo.id}번</p></ViewIndex>                 
                      <ViewItem>
                        <p>{todo.task}</p>             
                        <p>{todo.detail}</p>
                      </ViewItem>
                    </TodoItem>
                  )}
                  {/* 수정 중 상태일 때 */}
                  {/*{isEditing === true && (*/}
                  {editingId === todo.id && (
                    <TodoItem className='todoView' key={todo.id}>
                      <ViewIndex><p>{todo.id}번</p></ViewIndex>
                      <ViewItem>
                        <Input value={editText} onChange={(e) => setEditText(e.target.value)}/>
                        <Input value={editDetail} onChange={(e) => setEditDetail(e.target.value)}/>
                      </ViewItem>
                    </TodoItem>
                  )}
                </label> 
                {editingId === todo.id ?
                  (<UpBtnFinish><Button onClick={() => updateTodo(editingId, editText, editDetail)} text='수정 완료'/></UpBtnFinish>)
                  :
                  (
                  <>
                    <Button onClick={() => {setEditingId(todo.id); setEditText(todo.task); setEditDetail(todo.detail);}} text='수정'/>
                    <Button onClick={() => deleteTodo(todo.id)} text='삭제하기'/>
                  </>
                  )
                }                                              
              </ValueAndBtn>
          ))}
      </Value>
  )
}

export default ViewList

const Value = styled.div`
  display: flex;
  flex-direction: column;
  width: 700px;
  background-color: pink;
`

const ValueAndBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
`;

const TodoItem = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  margin-right: 20px;
  background-color: lightblue;
`;

const ViewIndex = styled.div`
  width:50px;
  background-color: yellow;
`

const ViewItem = styled.div`
  display: flex;
  flex-direction: column;
`;

const UpBtnFinish = styled.div`
  margin-left: 110px;
`