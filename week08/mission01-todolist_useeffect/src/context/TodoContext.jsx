// src/context/TodoContext.jsx
import {createContext} from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    
    // 서버에서 todos를 가져오는 함수 💛
    const fetchTodos = async () => {
        try {
        const response = await axios.get('http://localhost:3000/todo');
        setTodos(response.data);
        } catch (error) {
        console.error('Todos를 가져오는 데 실패했습니다.', error);
        }
    };

    // 컴포넌트가 마운트될 때 todos를 서버에서 가져오기 💛
    useEffect(() => {
        fetchTodos();
    }, []);

    // 1. 추가하기
    const addTodo = async() => {
        if (text.trim().length == 0) {
            alert('입력해!')
            return;
        }
        // setTodos((prev) => [
        //     ...prev, // 이전에 저장된 값을 받아온다
        //     {id: Math.floor(Math.random() * 100) + 2, task: text, detail: detail}
        // ])
        // setText('');
        // setDetail('');
        try {
            const response = await axios.post('http://localhost:3000/todo', {
              title: text,
              content: detail,
            });
            setTodos((prev) => [...prev, response.data]);
            setText('');
            setDetail('');
        } catch (error) {
        console.error('Todo를 추가하는 데 실패했습니다.', error);
        }
    };
    // 2. 삭제하기
    const deleteTodo = async(id) => {
      //console.log(id);
      //setTodos((prev) => prev.filter((item) => id !== item.id))
      try {
        await axios.delete(`http://localhost:3000/todo/${id}`);
        setTodos((prev) => prev.filter((item) => id !== item.id));
      } catch (error) {
        console.error('Todo를 삭제하는 데 실패했습니다.', error);
      }
    };
    // 3. 수정하기(백업)
    const [isEditing, setIsEditing] = useState(false);
    const [editingId, setEditingId] = useState('');
    const [editText, setEditText] = useState('');
    const [editDetail, setEditDetail] = useState('');
    const updateTodo = async(id, text, detail) => {
        //console.log(id);
        // setTodos((prev) =>
        //     prev.map((item) => (id == item.id ? {...item, task:text, detail:detail}:item))
        // );
        // setEditingId('');
        try {
            const response = await axios.patch(`http://localhost:3000/todo/${id}`, {
              title: text,
              content: detail,
            });
            setTodos((prev) =>
              prev.map((item) => (id === item.id ? { ...item, task: text, detail: detail } : item))
            );
        } catch (error) {
        console.error('Todo를 수정하는 데 실패했습니다.', error);
        }
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