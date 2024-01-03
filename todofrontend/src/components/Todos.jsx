import React from 'react'

export default function Todos({todos}) {
 console.log(todos.todoData)
//  const data = [...todos.todoData]
 

return (
    <>
      {!todos.todoData ? (
        <h1>Loading ....</h1>
      ) : (
        todos.todoData.map((todo) => (
          <div key={todo._id} className='todoList'>
             <div className='titleParent'>
             <h1 className='title'>{todo.title}</h1>
              <input type='checkbox' className='completed' />
             </div>
            <h2 className='description'>{todo.description}</h2>
          </div>
        ))
      )}
    </>
  )
}