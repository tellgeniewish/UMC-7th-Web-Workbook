// src/context/TodoContext.jsx
import {createContext} from 'react'
import { useState } from 'react';

// 데이터를 담고 있음
export const TodoContext = createContext();
// 우산을 만듦
export function TodoContextProvider({children}) {
    const [todos, setTodos] = useState([
        {id: 1, task:'투두 만들어보기', detail:''},
        {id: 2, task: '지니', detail:''}
    ]);
    //console.log(todos)
    const [text, setText] = useState('');
    const [detail, setDetail] = useState('');
    
    // 1. 추가하기
    const addTodo = () => {
        if (text.trim().length == 0) {
            alert('입력해!')
            return;
        }
        setTodos((prev) => [
            ...prev, // 이전에 저장된 값을 받아온다
            {id: Math.floor(Math.random() * 100) + 2, task: text, detail: detail}
        ])
        setText('');
        setDetail('');
    };
    // 2. 삭제하기
    const deleteTodo = (id) => {
      //console.log(id);
      setTodos((prev) => prev.filter((item) => id !== item.id))
    };
    // 3. 수정하기(백업)
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
    const [editDetail, setEditDetail] = useState('');
    const updateTodo = (id, text, detail) => {
        //console.log(id);
        setTodos((prev) =>
            prev.map((item) => (id == item.id ? {...item, task:text, detail:detail}:item))
        );
        setEditingId('');
    };
    
    // 렌더링 방지
    const handleSubmit = (e) => {
      e.preventDefault();
    }
    return <TodoContext.Provider value={{
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
        }}>{children}</TodoContext.Provider>
}