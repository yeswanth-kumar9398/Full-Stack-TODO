// App.js
import React from 'react';
// import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import 'bootstrap/dist/css/bootstrap.min.css'; 
// import todoList from '../../models/todolist';
import Todo from './Todo';
function App() {
  const headStyle = { 
    textAlign: "center", 
  }
  return (
    // <div>
    //   <h1>User Registration</h1>
    //   <RegisterForm />
    //   <h1>User Login</h1>
    //   <LoginForm />
    // </div>
    <div> 
    <h1 style={headStyle}>FULL STACK ASSIGNMENT</h1> 
    <BrowserRouter> 
      <Routes> 
      <Route path='/' element={<Todo/>}></Route> 
      <Route path='/login' element={<LoginForm/>}></Route>
      </Routes> 
    </BrowserRouter> 
    </div> 
  );
}

export default App;

