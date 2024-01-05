import { useState,useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
import Todos from './components/Todos'


function App() {
  const [todos, SetTodos] = useState([])

 

   const handleTodoData = async () => {
     const data = await fetch("https://todo-app-mern-by-bharat-backend-api.vercel.app/todos")
     const totosData = await data.json()   
    SetTodos(totosData)
 
   }



  useEffect(()=>{
      handleTodoData()
  },[])


  return (
    
    <main className='parent'>
      <h1>Todo App</h1>
     <Todo handleTodoData = {handleTodoData}/>
 <Todos todos={todos} handleTodoData = {handleTodoData}/>
   
    </main>
  )
}

export default App
