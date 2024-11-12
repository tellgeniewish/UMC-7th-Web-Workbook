import { useState, useContext } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';
import styled from 'styled-components';
import { DiEnvato } from 'react-icons/di';
import { TodoContext } from './context/TodoContext';

function App() {
  const {
    todos, setTodos,
    text, setText,
    editingId, setEditingId,
    editText, setEditText,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo
  } = useContext(TodoContext)

  return (
    <>
      <InputAndButtonWrapper onSubmit={handleSubmit}>
        <Input value={text} onChange={(e) => setText(e.target.value)}/>
        <Button onClick={() => addTodo()} text='할 일 등록'/>
      </InputAndButtonWrapper>
      <div>
          {todos.map((todo, _) => (
            <InputAndBtn className='inputAndBtn' key={todo.id}> {/*jsx는 동일한 위치에 연속된 태그 불가 -> 부모 요소로 감싸줘야 함*/}
              {/* 수정이 아닐 때 */}
              {/*{isEditing === false && (*/}
              {editingId !== todo.id && (
                <TodoItem className='todoView' key={todo.id}>
                  <p>{todo.id}번</p>
                  <p>{todo.task}</p>
                </TodoItem>
              )}
              {/* 수정 중 상태일 때 */}
              {/*{isEditing === true && (*/}
              {editingId === todo.id && (
                <div className='todoView' key={todo.id}>
                  <p>{todo.id}번</p>
                  <Input value={editText} onChange={(e) => setEditText(e.target.value)}/>
                </div>
              )}
              <Button onClick={() => deleteTodo(todo.id)} text='삭제하기'/>
              {editingId === todo.id ?
                (<Button onClick={() => updateTodo(editingId, editText)} text='수정 완료'/>)
                :
                (<Button onClick={() => {setEditingId(todo.id); setEditText(todo.task);}} text='수정 진행'/>)
              }
            </InputAndBtn>
          ))}
      </div>
    </>
  );
}

export default App;

const InputAndButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  margin-bottom: 10px;
`;

const InputAndBtn = styled.div`
  display: flex;
  gap: 20px;
`;

const TodoItem = styled.div`
  width: 180px;
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;