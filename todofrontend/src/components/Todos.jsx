import React from "react";

export default function Todos({ todos }) {

  const handleMarkedTodo = async (id) => {
    const jsonData = fetch("http://localhost:3000/completed", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id:id
      }),
    });
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
              {console.log(todo.completed)}
              <input type="checkbox" className="completed" onChange={()=>handleMarkedTodo(todo._id)}/>
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
