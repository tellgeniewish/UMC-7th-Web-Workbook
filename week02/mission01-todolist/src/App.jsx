import { useState } from 'react';
import './App.css';
import Button from './components/Button';
import Input from './components/Input';

function App() {
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

  return (
    <>
      <form onSubmit={handleSubmit}>
        {/*<input type='text' 
               value={text} 
               onChange={(e) => setText(e.target.value)}/>*/}
        <Input value={text} 
               onChange={(e) => setText(e.target.value)}/>
        {/*<button type='submit' onClick={() => addTodo()}>할 일 등록</button>*/}
        <Button onClick={() => addTodo()} text='할 일 등록'/>
      </form>
      <div>
          {todos.map((todo, _) => (
            <div className='inputAndBtn'> {/*jsx는 동일한 위치에 연속된 태그 불가 -> 부모 요소로 감싸줘야 함*/}
              {/* 수정이 아닐 때 */}
              {/*{isEditing === false && (*/}
              {editingId !== todo.id && (
                <div className='todoView' key={todo.id}>
                  <p>{todo.id}번</p>
                  <p>{todo.task}</p>
                </div>
              )}
              {/* 수정 중 상태일 때 */}
              {/*{isEditing === true && (*/}
              {editingId === todo.id && (
                <div className='todoView' key={todo.id}>
                  <p>{todo.id}번</p>
                  {/*<input defaultValue={todo.task} onChange={(e) => setEditText(e.target.value)}/>*/}
                  <Input value={editText} onChange={(e) => setEditText(e.target.value)}/>
                </div>
              )}
              {/*<button onClick={() => deleteTodo(todo.id)} style={{height: 'fit-content'}}>삭제하기</button>*/}
              <Button onClick={() => deleteTodo(todo.id)} text='삭제하기'/>
              {/*<input defaultValue={todo.task}/>*/}
              {/*<button onClick={() => setIsEditing(true)}>수정 진행</button>*/}
              {/*<button onClick={() => setEditingId(todo.id)}>수정 진행</button>*/}
              {/* editingId === todo.id 수정 중인 상태 */}
              {/*{editingId === todo.id ?
                (<button onClick={() => updateTodo(editingId, editText)} style={{height: 'fit-content'}}>수정 완료</button>)
                :
                (<button onClick={() => {setEditingId(todo.id); setEditText(todo.task);}} style={{height: 'fit-content'}}>수정 진행</button>)
              }*/}
              {editingId === todo.id ?
                (<Button onClick={() => updateTodo(editingId, editText)} text='수정 완료'/>)
                :
                (<Button onClick={() => {setEditingId(todo.id); setEditText(todo.task);}} text='수정 진행'/>)
              }
            </div>
          ))}
          {/* {todos.map(({id, task}, _) =>
            <h4>{id}. {task}</h4>
          )} */}
      </div>
    </>
  );
}

export default App;