
const express = require("express");
const { Todo } = require("./database");
const { createTodo, updateTodo } = require("./types");  
const app = express();
const port = 3000;

app.use(express.json());

app.get("/demo",(req,res)=>{
    res.send("Hello world")
})



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
    completed: false
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

  await Todo.updateOne(
    { _id: req.body.id,},
    { completed: true }
  );

  res.json({
    msg: "bravo your task has been updated",
  });
});


app.listen(port);
