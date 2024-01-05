import React, { useState } from "react";

export default function Todo({handleTodoData}) {

   

     const [title,setTitle] = useState();
     const [description ,setDescription]= useState()

     const handleSubmitData= async () => {
        const fetchData = await fetch("https://todo-app-mern-by-bharat-backend-api.vercel.app/todo",{
          method:"POST",
          body: JSON.stringify({
            title:title,
            description:description
          }),
          headers:{
            "Content-Type":"application/json"
          }
      
      })

     if(fetchData.ok){
       handleTodoData()
       setTitle("")
       setDescription("")
     }

     }



  return (
    <div id="form">
    
        <input type="text" name="" value={title} required placeholder="Enter title"  onChange={(e)=>setTitle(e.target.value)}/>
     
        <input type="text" name="" value={description} required placeholder="Enter  description" onChange={(e)=>setDescription(e.target.value)} />
    
        <button className="addTodoBtn" onClick={handleSubmitData}>Add Todo</button>
   
    </div>
  );
}
