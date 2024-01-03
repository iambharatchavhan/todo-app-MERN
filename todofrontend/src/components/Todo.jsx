import React from "react";

export default function Todo() {
  return (
    <>
      <form id="form" onSubmit={(e) => e.preventDefault()}>
        <input type="text" name="" placeholder="Enter title" />
     
        <input type="text" name="" placeholder="Enter  description" />
    
        <button className="addTodoBtn">Add Todo</button>
      </form>
    </>
  );
}
