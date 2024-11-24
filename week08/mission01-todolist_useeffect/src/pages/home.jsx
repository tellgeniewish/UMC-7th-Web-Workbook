// src/pages/home.jsx
import { useState, useContext } from 'react';
// import './App.css';
import Button from '../components/Button';
import Input from '../components/Input';
import styled from 'styled-components';
import { DiEnvato } from 'react-icons/di';
import { TodoContext } from '../context/TodoContext';
import WantToDo from '../components/WantToDo';
import ViewList from '../components/ViewList';

function App() {
  return (
    <ToDoList>
      <Title><strong>⚡UMC ToDoList⚡</strong></Title>
      <WantToDo/>
      <ViewList/>
    </ToDoList>
  );
}

export default App;

const ToDoList = styled.div`
  width: 100vw;
  height: 100vh;
  display:flex;  
  flex-direction: column;
  align-items: center;
`

const Title = styled.div`
  margin-top: 30px;
  font-size: 1.5rem;
`