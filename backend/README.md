# Simple ToDo application Backend

- initialize empty app - git init
- install some packages 

  - jsonwebtoken
  - body-parser
  - mongoose
  - express
  - nodemon
  - zod
  
- created 3 routs for initial application to work

     - .post/ todo rout for creating TODO
     - .get / todo rout for getting TODOs
     - .put / completed rout for Mark todo as done

for all of this on top initialized `app.use(express.json) `middleware

```javascript
const express = require("express")
const port = 3000;
const app = express()


app.use(express.json())


app.post("/todo",(req,res)=>{

})

app.get('"todos',(req,res)=>{

})

app.put("/completed",(req,res)=>{
    
})

app.listen(port,()=>{
    console.log("backend is up .. yee ! ")
})

```
Thats the high level 

- Now we have to get inputs from user but first we will validate those inputs using zod library. 

- creating type.js file for it
- created schema objects using zod and validated it 
- exported the both objects 
**Now We have a brand new types file which manage our user inputs and there validation**

```javascript
const zod = require("zod");


const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})


const updateTodo = zod.object({
    id: zod.string()
})



module.exports = {
    createTodo,
    updateTodo
}
```
### Putting Data into mongoDB database:

- first check the data is safe-parsed in request body 
```javascript

app.post("/todo",(req,res)=>{
    //checking inputs are safe-parsed
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    // checking the if the payload is valid ===> if not send error status code and return from here
    if(!parsedPayload){
        res.status(411).json({'message':'please provide valid inputs'})
        return
    }
    // if payload is valid then put the data in database i.e. mongoDB
      await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false
  });

  res.json({
    msg: "todo is created successfully",
  });
 
})


// Also update route we have to do same
app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({ message: "please provide valid inputs" });
    return;
  }
  // update in mongodb
  await todo.update(
    // Whatever object has the _id please update completed as true
    { _id: req.body.id,},
    { completed: true }
  );

  res.json({
    msg: "bravo your task has been updated",
  });
});

// update in mongodb
await Todo.updateOne(
    { _id: req.body.id,},
    { completed: true }
  );

  res.json({
    msg: "bravo your task has been updated",
  });

})


```

### creating Database file for schemas and connecting to the database
