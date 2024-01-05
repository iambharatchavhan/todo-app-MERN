import React from "react";

export default function Todos({ todos,handleTodoData }) {

  const handleMarkedTodo = async (id) => {
    const jsonData = await fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        id:id
      }),   
    });

    if(jsonData.ok){
     handleTodoData();
    }
  };

  return (
    <>
      {!todos.todoData ? (
        <h1>Loading ....</h1>
      ) : (
        todos.todoData.map((todo) => (
          <div key={todo._id} className="todoList">
            <div className="titleParent ">
              <h1 className={todo.completed ? "mark" : "title"}>{todo.title}</h1>
              <input type="checkbox" className="completed" checked={todo.completed} onChange={()=>handleMarkedTodo(todo._id)}/>
              <button>Delete</button>
            </div>
            <div>
              <h2 className="description ">{todo.description}</h2>
            </div>
          </div>
        ))
      )}
    </>
  );
}
