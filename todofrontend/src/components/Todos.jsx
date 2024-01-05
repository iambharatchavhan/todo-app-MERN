import React from "react";
import { MdDelete } from "react-icons/md";
import Empty from "./Empty";

export default function Todos({ todos,handleTodoData }) {

  const handleMarkedTodo = async (id) => {

    // This is for marked todo
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


  // This is for delete Todo
  const handleDelete = async (id) =>{
    const deleteData = await fetch("http://localhost:3000/deleted",{
      method:"DELETE",
      headers:{
        "Content-Type":"application/json"
      },

      body: JSON.stringify({
        id:id
      })
    });


    if(deleteData){
      handleTodoData();
    }

  }

  console.log(todos.todoData.length)

  return (


    <>
      {!todos.todoData.length ? (
        <Empty/>
      ) : (
        todos.todoData.map((todo) => (
          <div key={todo._id} className="todoList">
            <div className="titleParent ">
              <div>
              <h1 className={todo.completed ? "mark" : "title"}>{todo.title}</h1>
              </div>
              <div className="action-btn">
            
                <input type="checkbox"  className="checkbox" checked={todo.completed} onChange={()=>handleMarkedTodo(todo._id)}/>
             
              <button className="delete" onClick={()=>handleDelete(todo._id)}><MdDelete /></button>
              </div>
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
