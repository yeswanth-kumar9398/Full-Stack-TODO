const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User=require("./models/User")
const TodoModel=require("./models/todolist")
const cors=require('cors')
const app = express();
app.use(bodyParser.json());


app.use(cors())

// MongoDB Connection
async function connectDB(){
   await mongoose.connect('mongodb+srv://yeswanthkumar9398:JYOTHI9000402636@cluster0.brbeli5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
   console.log("db connected")
}


connectDB()


// Routes

app.get("/getTodoList", (req, res) => { 
  TodoModel.find({}) 
      .then((todoList) => res.json(todoList)) 
      .catch((err) => res.json(err)) 
}); 

app.post("/addTodoList", (req, res) => { 
  TodoModel.create({ 
      task: req.body.task, 
      status: req.body.status, 
      deadline: req.body.deadline,  
  }) 
      .then((todo) => res.json(todo)) 
      .catch((err) => res.json(err)); 
}); 

app.post("/updateTodoList/:id", (req, res) => { 
  const id = req.params.id; 
  const updateData = { 
      task: req.body.task, 
      status: req.body.status, 
      deadline: req.body.deadline,  
  }; 
  TodoModel.findByIdAndUpdate(id, updateData) 
      .then((todo) => res.json(todo)) 
      .catch((err) => res.json(err)); 
}); 

app.delete("/deleteTodoList/:id", (req, res) => { 
  const id = req.params.id; 
  TodoModel.findByIdAndDelete({ _id: id }) 
      .then((todo) => res.json(todo)) 
      .catch((err) => res.json(err)); 
}); 


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();
    res.status(201).send("User registered successfully");
  } catch (error) {
    res.status(500).send("Error registering user");
  }
});

app.get("/",async(req,res)=>{
    const  users =await User.find();
    res.send(users)
})

app.post('/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) {
    return res.status(404).send("User not found");
  }

  if (!bcrypt.compareSync(password, user.password)) {
    return res.status(401).send("Invalid credentials");
  }

  const token = jwt.sign({ userId: user._id }, 'secretKey');
  res.status(200).send({ token });
});

app.listen(3001, () => {
  console.log('Server is running on port 3001');
});
