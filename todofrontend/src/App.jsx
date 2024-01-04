import { useState,useEffect } from 'react'
import './App.css'
import Todo from './components/Todo'
import Todos from './components/Todos'

function App() {
  const [todos, SetTodos] = useState([])

 

   const handleTodoData = async () => {
     const data = await fetch("http://localhost:3000/todos")
     const totosData = await data.json()   
    SetTodos(totosData)
 
   }



  useEffect(()=>{

      handleTodoData()
   
  },[])

  // console.log(todos)


  return (
    <main className='parent'>
      <h1>Todo App</h1>
     <Todo/>
     <Todos todos={todos}/>
    </main>
  )
}

export default App
