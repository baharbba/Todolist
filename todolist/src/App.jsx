/* eslint-disable no-unused-vars */
import { useState } from 'react'
import './App.css'
import { Form, Button } from 'react-bootstrap';

//import { ReactComponent as SaveIcon } from "./assets/SaveIcon.svg";
import SaveIcon from './assets/SaveIcon.svg';
import EditIcon from './assets/EditIcon.svg';
import TrashIcon from './assets/TrashIcon.svg';
import { v4 as uuidv4 } from 'uuid';


function App() {
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const [newTodo, setNewTodo] = useState('')

  const addTodo = () => {
    setTodoList(prevTodoList => [...prevTodoList, { id: uuidv4(),  todo: newTodo, isEditable: false, isCompleted: false }]) // ekleye basınca öncekiyazılanlarla todo ile eklenen ynaiyi birlikte listeleyecek.
    setNewTodo('') //butona bastıktan sonra ınput temizlensin diye
  }
  const completeTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? {...todoItem, isCompleted: !todoItem.isCompleted} :todoItem))
  }
  const editTodo = (id, oldTodo) => {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ? { ...todoItem, isEditable: !todoItem.isEditable } : todoItem))
    setTodo(oldTodo)
  }

  const saveTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.map(todoItem => todoItem.id === id ?{...todoItem, isEditable: !todoItem.isEditable, todo: todo} : todoItem))
  }
  const deleteTodo = (id) => {
    setTodoList(prevTodoList => prevTodoList.filter(todoItem => todoItem.id !== id))
  }

  return (
    <div className=" baslik d-flex flex-column justify-contect-center align-items-center">
      <h1>ToDo List</h1>
      <div className='d-flex w-50'>
        <Form.Control 
          className='w-70 mt-3'
          placeholder="Add Todo..."
          value={newTodo} //yazıldığında ve butona basıldıgındatekrar ilk haline dönemsi için değerini ilk todoya eşitliyorum
          onChange={(e) => setNewTodo(e.target.value)} //e kullanıcının anlık yaptıgı değişiklikleri yakalamak, anlık değşim olan olaylar anlamında yani güncellendiğinde yenisi set.. olacak ve ınputta yazılanlar gözükecek.
        />
        <Button className='ms-4 mt-3' onClick={() => addTodo()}>Add</Button>
      </div>
        <div className='mt-5 w-50'>
          {
            todoList.map(
              todoItem => <>
                <div key={todoItem.id} className='d-flex justify-contect-between  mt-3'>
                <div className='d-flex w-75'>
                  <Form.Check // prettier-ignore

                    type={'checkbox'}
                    className='me-4'
                    value={todoItem.isCompleted}
                      onChange={() => completeTodo(todoItem.id)} />
                    {
                      !todoItem.isEditable ?
                  <label className={`${todoItem.isCompleted ? 'text-decoration-line-through': ''} fw-bold`}>
                  {todoItem.todo}
                    </label>
                    :
                    <Form.Control 
                      className='w-70 mt-3'
                      value={todoItem.todo} //yazıldığında ve butona basıldıgındatekrar ilk haline dönemsi için değerini ilk todoya eşitliyorum
                      onChange={(e) => setTodo( e.target.value)} //e kullanıcının anlık yaptıgı değişiklikleri yakalamak, anlık değşim olan olaylar anlamında yani güncellendiğinde yenisi set.. olacak ve ınputta yazılanlar gözükecek.
        />
                    }
                  </div><div style={{ marginLeft: '500px' }}>
                    {
                      !todoItem.isEditable ?
                  <img src={EditIcon} alt="Edit Icon" width={25} height={25} style={{ cursor: 'pointer' }} className='me-2' onClick={() => editTodo(todoItem.id , todoItem.todo)} />
                      :
                  <img src={SaveIcon} alt="Save Icon" width={25} height={25} style={{ cursor: 'pointer' }} className='me-2' onClick={() => saveTodo(todoItem.id)} />
                    }
                    <img src={TrashIcon} alt="Trash Icon" width={25} height={25} style={{ cursor: 'pointer' }} onClick={() => deleteTodo(todoItem.id)} />
                </div>
              
                </div>
                </>
            )
          }
        </div>
    </div>
  );
}

export default App;
