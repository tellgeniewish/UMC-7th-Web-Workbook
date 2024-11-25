// src/components/ViewList.jsx
import React, { useState, useContext, useEffect } from 'react'
import Input from './Input';
import Button from './Button';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import axios from 'axios';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import debounce from "lodash.debounce";
import axiosInstance from '../apis/axios-instance';
import { postTodo } from '../apis/todo';
import { useMutation, useQuery } from '@tanstack/react-query';

const ViewList = () => {
  const navigate = useNavigate();
  const {
    todos, setTodos,
    text, setText,
    detail, setDetail,
    editingId, setEditingId,
    editText, setEditText,
    editDetail, setEditDetail,
    editChecked, setEditChecked,
    checked, setChecked,
    handleSubmit,
    addTodo,
    deleteTodo,
    updateTodo
  } = useContext(TodoContext)


  const [isLoading, setIsLoading] = useState(true);  // 로딩 상태 관리
  const [isError, setIsError] = useState(false);
 
  // Todo 데이터를 불러오는 함수
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:3000/todo", {
        params: {
          text: text, // 쿼리 파라미터로 title을 넘겨서 조건 검색
        },
      });
      //setTodos(response.data[0]); // API 응답의 첫 번째 배열을 todos에 저장
      // 데이터가 없거나 응답 형식이 예상과 다를 경우 처리
      if (!response.data || !Array.isArray(response.data[0]) || response.data[0].length === 0) {
        console.warn("받은 데이터가 비어 있습니다.");
        setTodos([]); // 빈 배열로 초기화
        return;
      }
      // console.log("response.data=", response.data);
      // ✨ API 데이터 구조를 기존 형식으로 변환
      const todosFromApi = response.data[0].map((todo) => ({
        id: todo.id,
        task: todo.title, // ✨ title을 task로 매핑
        detail: todo.content, // ✨ content를 detail로 매핑
        checked: todo.checked || false,
      }));

      setTodos(todosFromApi); // ✨ 변환된 데이터를 todos에 저장

      // API 데이터에서 title이 text와 일치하는 항목만 필터링
      const debounced = response.data[0].filter((todo) => 
        todo.title.includes(text)  // 제목이 text를 포함하는 항목만
      ).map((todo) => ({
        id: todo.id,
        task: todo.title,  // title을 task로 매핑
        detail: todo.content,  // content를 detail로 매핑
        checked: todo.checked || false,
      }));
      console.log("debounced=", debounced);
      
      console.log("response.data[0]=", response.data[0]);
      return response.data[0];
    } catch (error) {
      console.error("Todo 목록을 가져오는 중 오류 발생:", error);
    } finally {
      setIsLoading(false); // 로딩 완료 후 상태 변경
    }
  };
  // debounce된 fetchTodos 함수
  const debouncedFetchTodos = debounce(fetchTodos, 1000 * 10); // 10초 후에 실행

  const { data: todoList = [], isLoading:isFetchLoading, isError:isFetchError } = useQuery({
    queryKey: ['todo', todos], // queryKey
    queryFn: fetchTodos, // queryFn: fetchTodos 함수
    // cacheTime: 1000 * 60, // 옵션 객체
    // staleTime: 1000 * 60 * 5,
    // enabled: !!text,
  });

  const updateTodoMutation = useMutation({
    mutationFn: async ({ id, updatedData }) => {
      const response = await axiosInstance.patch(`/todo/${id}`, updatedData);
      return response.data;
    },
    onSuccess: (data, { id, updatedData }) => {
      console.log(`${id}번 Todo가 성공적으로 수정되었습니다.`);
      // 수정된 데이터를 로컬 상태에서 업데이트
      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, task: updatedData.title, detail: updatedData.content, checked: updatedData.checked } : todo
        )
      );
      setEditingId(null);
    },
    onError: (error) => {
      console.error('Todo 수정 중 오류 발생:', error);
      setIsError(true);
    },
  });
  // Todo 수정 함수
  const handleUpdateTodo = async (id, updatedData) => {
    const todo = todos.find((t) => t.id === id);
    if (!todo) return;

    setEditingId(todo.id); // 현재 수정 중인 todo의 ID를 설정
    setEditText(todo.title); // title 값을 editText에 설정
    setEditDetail(todo.content); // content 값을 editDetail에 설정
    updateTodoMutation.mutate({ id, updatedData });
    // try {
    //   const response = await axios.patch(`http://localhost:3000/todo/${id}`, updatedData);

    //   if (response.status === 200) {
    //     console.log(`${id}번 Todo가 성공적으로 수정되었습니다.`);
    //     // 수정된 데이터를 로컬 상태에서 업데이트
    //     setTodos((prevTodos) =>
    //       prevTodos.map((todo) =>
    //         todo.id === id ? { ...todo, task: updatedData.title, detail: updatedData.content, checked: updatedData.checked } : todo
    //       )
    //     );
    //     setEditingId(null);
    //   } else {
    //     console.error('Todo 수정 실패');
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   console.error('Todo 수정 중 오류 발생:', error);
    // }
  };
  const checkboxChangeMutation = useMutation({
    mutationFn: async (id) => {
      const updatedTodo = todos.find((todo) => todo.id === id);
      const updatedChecked = !updatedTodo.checked;

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, checked: updatedChecked } : todo
        )
      );

      const response = await axiosInstance.patch(`/todo/${id}`, {
        title: updatedTodo.task,
        content: updatedTodo.detail,
        checked: updatedChecked,
      });

      return updatedChecked;
    },
    onSuccess: (updatedChecked, id) => {
      setEditChecked(updatedChecked);
      console.log(`${id}번 Todo가 성공적으로 수정되었습니다.`);
    },
    onError: (error) => {
      console.error('Todo 수정 중 오류 발생:', error);
      setIsError(true);
    },
  });
  const handleCheckboxChange = async(id) => {
    checkboxChangeMutation.mutate(id);
    // 서버에 상태 업데이트 요청
    // try {
    //   const updatedTodo = todos.find((todo) => todo.id === id);
    //   const updatedChecked = !updatedTodo.checked;

    //   setTodos((prevTodos) =>
    //     prevTodos.map((todo) =>
    //       todo.id === id ? { ...todo, checked: updatedChecked } : todo
    //     )
    //   );

    //   const response = await axios.patch(`http://localhost:3000/todo/${id}`, {
    //     title: updatedTodo.task,
    //     content: updatedTodo.detail,
    //     checked: updatedChecked,
    //   });      

    //   if (response.status === 200) {
    //     setEditChecked(updatedChecked);
    //     console.log(`${id}번 Todo가 성공적으로 수정되었습니다.`);
    //   } else {
    //     console.error('Todo 수정 실패');
    //   }
    // } catch (error) {
    //   console.error('Todo 수정 중 오류 발생:', error);
    // }
  };

  const deleteTodoMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axiosInstance.delete(`/todo/${id}`);
      return response.data;
    },
    onSuccess: (data, id) => {
      console.log(`${id}번 Todo가 성공적으로 삭제되었습니다.`);
        
        // 로컬 상태에서 삭제된 Todo 항목을 제거
        setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    },
    onError: (error) => {
      console.error('Todo 삭제 중 오류 발생:', error);
      setIsError(true);
    },
  });
  // Todo 삭제 함수
  const handleDeleteTodo = async (id) => {
    deleteTodoMutation.mutate(id);
    // try {
    //   const response = await axios.delete(`http://localhost:3000/todo/${id}`);
      
    //   if (response.status === 200) {
    //     console.log(`${id}번 Todo가 성공적으로 삭제되었습니다.`);
        
    //     // 로컬 상태에서 삭제된 Todo 항목을 제거
    //     setTodos((prevTodos) => prevTodos.filter(todo => todo.id !== id));
    //   } else {
    //     console.error('Todo 삭제 실패');
    //     setIsError(true);
    //   }
    // } catch (error) {
    //   console.error('Todo 삭제 중 오류 발생:', error);
    // }
  };

  // 컴포넌트가 처음 렌더링될 때 데이터를 가져옴
  useEffect(() => {
    fetchTodos();
    if (text) {
      debouncedFetchTodos(text);
      // console.log("text=", text);
      // console.log("debouncedFetchTodos=", debouncedFetchTodos);
    } else {
      setTodos([]); // text이 비어있으면 결과 초기화
    }
  }, [text]);  

  if (isLoading) {
    return (
      <div>
        <Loader />
        <p>게시글을 불러오는 중입니다..</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div>
        <img src="/src/img/error.png" alt="에러 이미지" />
        <p>에러가 발생했습니다</p>
      </div>
    );
  }

  return (
    <Value>
          {todoList.map((todo, _) => (
              <ValueAndBtn className='inputAndBtn' key={todo.id}> {/*jsx는 동일한 위치에 연속된 태그 불가 -> 부모 요소로 감싸줘야 함*/}
                <input type="checkbox" id={`${todo.id}`} checked={todo.checked} onChange={() => handleCheckboxChange(todo.id)}/>
                <label htmlFor={`${todo.id}`}>
                  {/* 수정이 아닐 때 */}
                  {/*{isEditing === false && (*/}
                  {editingId !== todo.id && (
                    <TodoItem className='todoView' key={todo.id}>
                      {/* <ViewIndex><p>{todo.id}번</p></ViewIndex> */}
                      <ViewItem>
                        <ClickTitle onClick={() => navigate(`/todo/${todo.id}`)}>{todo.title}</ClickTitle>
                        <p>{todo.content}</p>
                      </ViewItem>
                    </TodoItem>
                  )}
                  {/* 수정 중 상태일 때 */}
                  {/*{isEditing === true && (*/}
                  {editingId === todo.id && (
                    <TodoItem className='todoView' key={todo.id}>
                      {/* <ViewIndex><p>{todo.id}번</p></ViewIndex> */}
                      <ViewItem>
                      <Input value={editText || ""} onChange={(e) => setEditText(e.target.value)}/>
                      <Input value={editDetail || ""} onChange={(e) => setEditDetail(e.target.value)}/></ViewItem>
                    </TodoItem>
                  )}
                </label> 
                {editingId === todo.id ?
                  // (<UpBtnFinish><Button onClick={() => updateTodo(editingId, editText, editDetail)} text='수정 완료'/></UpBtnFinish>)
                  (<UpBtnFinish><Button onClick={() => handleUpdateTodo(editingId, { title: editText, content: editDetail, checked: editChecked})} text='수정 완료'/></UpBtnFinish>)
                  // (<UpBtnFinish><Button onClick={() => handleUpdateTodo(todo, { title: editText, content: editDetail, checked: editChecked })} text='수정 완료'/></UpBtnFinish>)
                  :
                  (
                  <>
                    <Button onClick={() => {setEditingId(todo.id); setEditText(todo.title); setEditDetail(todo.content); setEditChecked(todo.checked); }} text='수정'/>
                    {/* <Button onClick={() => deleteTodo(todo.id)} text='삭제하기'/> */}
                    <Button onClick={() => handleDeleteTodo(todo.id)} text='삭제하기'/>
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
`

const ValueAndBtn = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 20px;
  border: 2px solid #ccc;
  border-radius: 10px;
  margin: 10px;
`;

const TodoItem = styled.div`
  width: 400px;
  height: 100px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  background-color: lightblue;
`;

const ClickTitle = styled.div`
  cursor: pointer;
  &:hover {  // &는 현재 선택자 (ClickTitle)를 참조
    color: #646cffaa;
    text-decoration: underline;
  }
`

const ViewIndex = styled.div`
  width:50px;
`

const ViewItem = styled.div`
  gap: 0px;
  display: flex;
  flex-direction: column;
`;

const UpBtnFinish = styled.div`
  margin-left: 110px;
`