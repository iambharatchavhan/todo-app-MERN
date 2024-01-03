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
