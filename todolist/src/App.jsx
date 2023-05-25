import { useState } from 'react'
import './App.css'
import {Form, Button} from 'react-bootstrap';


function App() {
  const [todoList, setTodoList] = useState([])
  const [todo, setTodo] = useState('')
  const addTodo = () => {
    setTodoList(prevTodoList => [...prevTodoList, todo]) // ekleye basınca öncekiyazılanlarla todo ile eklenen ynaiyi birlikte listeleyecek.
    setTodo('') //butona bastıktan sonra ınput temizlensin diye
  }
  return (
    <div className=" baslik d-flex flex-column justify-contect-center align-items-center">
      <h1>ToDo List</h1>
      <div className='d-flex w-50'>
        <Form.Control 
          className='w-70 mt-3'
          placeholder="Add Todo..."
          value={todo} //yazıldığında ve butona basıldıgındatekrar ilk haline dönemsi için değerini ilk todoya eşitliyorum
          onChange={(e) => setTodo(e.target.value)} //e kullanıcının anlık yaptıgı değişiklikleri yakalamak, anlık değşim olan olaylar anlamında yani güncellendiğinde yenisi set.. olacak ve ınputta yazılanlar gözükecek.
        />
        <Button className='ms-4 mt-3' onClick={() => addTodo()}>Add</Button>
      </div>
        <div className='mt-5 w-50'>
          {
            todoList.map(
              todoItem => <div key={todoItem} className='d-flex justify-contect-between '>
                <div className='d-flex'>
                  <Form.Check // prettier-ignore
                  type={'checkbox'}
                  className='me-4'
                />
                <label>
                  {todoItem}
                </label>
                  </div>
                <div>
                  ...
              </div>
              </div>
            )
          }
        </div>
    </div>
  );
}

export default App;
