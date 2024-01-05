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



//delete Todo
app.delete("/deleted", async (req, res) => {
  const deletePayload = req.body;
  const parsedPayload = deleteTodo.safeParse(deletePayload);

  if (!parsedPayload.success) {
    res.status(404).json({ message: "Todo Is Not Available" });
  }
  
  const deletedItem = await Todo.findOneAndDelete({ _id: req.body.id });

  if (!deletedItem) {
    res.status(404).json({ message: "Provide valid id" });
  }

  res.json({ message: "Todo Deleted Successfully" });
});

```

### creating Database file for schemas and connecting to the database
```javascript
const mongoose = require("mongoose");


// connect to database

mongoose.connect("mongodb+srv://bharatchavhan141:MAQEZNN4mCMS8FQH@cluster0.wduzg.mongodb.net/todo-app")


// create schemas
const TodoSchema = mongoose.Schema({
    title : String,
    description: String,
    completed: Boolean
})

const Todo = mongoose.model('Todo', TodoSchema)


module.exports = {Todo}

```
### Types Zod validation 

```javascript
const zod = require("zod");


const createTodo = zod.object({
    title: zod.string(),
    description: zod.string()
})


const updateTodo = zod.object({
    id: zod.string()
})

const deleteTodo = zod.object({
    id:zod.string()
})

module.exports = {
    createTodo,
    updateTodo,
    deleteTodo
}

```

# final index file for all routs 
```javascript
const express = require("express");
const { Todo } = require("./database");
const { createTodo, updateTodo, deleteTodo } = require("./types");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/demo", (req, res) => {
  res.send("Hello world");
});

app.post("/todo", async (req, res) => {
  const createPayload = req.body;
  const parsedPayload = createTodo.safeParse(createPayload);

  if (!parsedPayload.success) {
    res.status(411).json({ message: "please provide valid inputs" });
    return;
  }

  // put the data in mongodb
  await Todo.create({
    title: createPayload.title,
    description: createPayload.description,
    completed: false,
  });

  res.json({
    msg: "todo is created successfully",
  });
});

// get todos with find function
app.get("/todos", async (req, res) => {
  const todoData = await Todo.find({});
  res.json({ todoData });
});

app.put("/completed", async (req, res) => {
  const updatePayload = req.body;
  const parsedPayload = updateTodo.safeParse(updatePayload);
  if (!parsedPayload.success) {
    res.status(411).json({ message: "please provide valid inputs" });
    return;
  }

  // update in mongodb
  //  Whatever object has the _id please update completed as true

  await Todo.updateOne({ _id: req.body.id }, { completed: true });

  res.json({
    msg: "bravo your task has been updated",
  });
});

app.delete("/deleted", async (req, res) => {
  const deletePayload = req.body;
  const parsedPayload = deleteTodo.safeParse(deletePayload);

  if (!parsedPayload.success) {
    res.status(404).json({ message: "Todo Is Not Available" });
  }
  
  const deletedItem = await Todo.findOneAndDelete({ _id: req.body.id });

  if (!deletedItem) {
    res.status(404).json({ message: "Provide valid id" });
  }

  res.json({ message: "Todo Deleted Successfully" });
});
app.listen(port);



``` 
