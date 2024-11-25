import React, { useState, useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // URL 파라미터에서 id를 가져오기 위한 훅
import axios from 'axios'; // axios를 사용하여 API 호출
import Loader from '../components/Loader';
import styled from 'styled-components';
import { TodoContext } from '../context/TodoContext';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Button from '../components/Button';

const TodoDetail = () => {
    const navigate = useNavigate();
    const {
        todos, setTodos,
        text, setText,
        detail, setDetail,
        checked, setChecked,
        editingId, setEditingId,
        editText, setEditText,
        editDetail, setEditDetail,
        editChecked, setEditChecked,
        handleSubmit,
        addTodo,
        deleteTodo,
        updateTodo
      } = useContext(TodoContext)
      
    const { todoId } = useParams(); // URL 파라미터에서 id를 가져옵니다.
    // const [todo, setTodo] = useState(null); // 데이터를 저장할 상태
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [isError, setIsError] = useState(false); // 에러 상태

    useEffect(() => {
        // API에서 Todo 데이터를 가져오는 함수
        const fetchTodoDetail = async () => {
            if (!todoId) {  // id가 없으면 함수 종료
                console.error("유효하지 않은 id입니다.");
                setIsError(true);
                setIsLoading(false);
                return;
            }
            try {
                const response = await axios.get(`http://localhost:3000/todo/${todoId}`); // id를 사용하여 해당 Todo 데이터를 가져옵니다.
                const data = response.data;
                // setTodo(data);
                setText(data.title);
                setDetail(data.content);
                setChecked(data.checked);

                setEditText(data.title);  // 수정 상태 초기화
                setEditDetail(data.content);
                setEditChecked(data.checked);
            } catch (error) {
                console.error("Todo 데이터를 불러오는 중 오류가 발생했습니다:", error);
                setIsError(true); // 오류 발생 시 상태 업데이트
            } finally {
                setIsLoading(false); // 데이터 로딩이 완료되면 로딩 상태 변경
            }
        };

        fetchTodoDetail(); // 컴포넌트가 마운트되었을 때 데이터를 가져옵니다.
    }, [todos, todoId, setText, setDetail, setChecked, setEditText, setEditDetail, setEditChecked]); // id가 변경될 때마다 다시 데이터를 불러옵니다.

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

    const handleSave = async (todoId, updatedTodo) => {
        try {
            // const updatedTodo = {
            //     id: todoId,
            //     title: editText,
            //     content: editDetail,
            //     checked: editChecked,
            // };
            
            await axios.patch(`http://localhost:3000/todo/${todoId}`, updatedTodo);
            setTodos((updatedTodos) =>
                updatedTodos.map((todo) =>
                    // todo.id === todoId ? updatedTodo : todo
                    todo.id === todoId ? { ...todo, task: updatedTodo.title, detail: updatedTodo.content, checked: updatedTodo.checked } : todo
                )
            );
            setEditingId(null); // 저장 후 수정 모드 종료
        } catch (error) {
            console.error('Todo 수정 중 오류 발생:', error);
        }
    };

    const handleDelete = async () => {
        try {
            // 백엔드로 DELETE 요청 보내기
            await axios.delete(`http://localhost:3000/todo/${todoId}`);
            
            // 삭제 완료 후, todos 상태를 업데이트
            const updatedTodos = todos.filter(item => item.id !== parseInt(todoId));
            setTodos(updatedTodos);
    
            // 삭제 후 메인 페이지로 이동
            navigate('/');
        } catch (error) {
            console.error("Todo 삭제 중 오류 발생:", error);
            alert('삭제 중 문제가 발생했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <DetailWrapper>
        <p><strong>id: {todoId}</strong></p>
        {/* <p><strong>첫 작성 시간:</strong> {new Date(todo.createdAt).toLocaleString()}</p>
        <p><strong>업데이트 시간:</strong> {new Date(todo.updatedAt).toLocaleString()}</p> */}
        {editingId === todoId ? (
            <>
                <p><strong>제목:</strong> <Input value={editText} onChange={(e) => setEditText(e.target.value)}/></p>
                <p><strong>내용:</strong> <Input value={editDetail} onChange={(e) => setEditDetail(e.target.value)}/></p>
                <p>
                    <strong>체크 여부:</strong>
                    <input
                        type="checkbox"
                        checked={editChecked}
                        onChange={(e) => setEditChecked(e.target.checked)}
                    />
                </p>
                <Button onClick={() => handleSave(editingId, { title: editText, content: editDetail, checked: editChecked})} text="수정 완료" />
            </>
        ) : (
            <>
                <p><strong>제목:</strong> {text}</p>
                <p><strong>내용:</strong> {detail}</p>
                <p><strong>체크 여부:</strong> {checked ? '완료' : '미완료'}</p>
                <Button onClick={() => {setEditingId(todoId); setEditText(text); setEditDetail(detail); setEditChecked(checked);}} text="수정" />
                <Button onClick={() => handleDelete()} text='삭제하기'/>
            </>
        )}        
        <Button onClick={() => navigate('/')} text="뒤로가기" />
        </DetailWrapper>
    );
};

export default TodoDetail;

const DetailWrapper = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`