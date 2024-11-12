import {createContext} from 'react'
import { useState } from 'react';

// 데이터를 담고 있음
export const TodoContext = createContext();

// 우산을 만듦
export function TodoContextProvider({children}) {
    const [todos, setTodos] = useState([
        {id: 1, task:'투두 만들어보기'},
        {id: 2, task: '지니'}
    ]);
     //console.log(todos)
    const [text, setText] = useState('');
    
    // 1. 추가하기
    const addTodo = () => {
        if (text.trim().length == 0) {
            alert('입력해!')
            return;
        }
        setTodos((prev) => [
            ...prev, // 이전에 저장된 값을 받아온다
            {id: Math.floor(Math.random() * 100) + 2, task: text}
        ])
        setText('');
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
    const updateTodo = (id, text) => {
        //console.log(id);
        setTodos((prev) =>
            prev.map((item) => (id == item.id ? {...item, task:text}:item))
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
        editingId, setEditingId,
        editText, setEditText,
        handleSubmit,
        addTodo,
        deleteTodo,
        updateTodo
        }}>{children}</TodoContext.Provider>
}