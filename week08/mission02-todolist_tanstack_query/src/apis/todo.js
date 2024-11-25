// src/apis/todo.js
import axiosInstance from "./axios-instance";

// TODO: TODO 생성
const postTodo = async ({title, content, checked = false}) => {
    const { data } = await axiosInstance.post('/todo', {
        title,
        content,
        checked,
    });
    return data;
};

// TODO: TODO LIST 가져오기 (title)
const getTodoList = async({title}) => {
    let url = `/todo`;
    if (title) {
        url += `?title=${title}`;
    }
    // const { data } = await axiosInstance.get(`/todo?title=${title}`);
    const { data } = await axiosInstance.get(url);

    return data;
}

// TODO: TODO 단건 가져오기
const getTodo = async({id}) => {
    const { data } = await axiosInstance.get(`/todo/${id}`);

    return data;
}

// TODO: TODO 수정하기
const patchTodo = async({id, title, content, checked}) => {
    const { data } = await axiosInstance.patch(`/todo/${id}`, {
        title, 
        content, 
        checked,
    });

    return data;
}

// TODO: TODO 삭제하기
const deleteTodo = async({id}) => {
    const { data } = await axiosInstance.delete(`/todo/${id}`);

    return data;
}

export { postTodo, getTodo, getTodoList, patchTodo, deleteTodo };