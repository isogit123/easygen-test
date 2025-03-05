import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/signup';
import 'bootstrap/dist/css/bootstrap.min.css';
import SignIn from './pages/signin';
import Home from './pages/home';

function App() {
  return (
    <Router>
        <Routes>
          <Route path="/signup" Component={Signup} />
          <Route path="/signin" Component={SignIn} />
          <Route path="/home" Component={Home} />
        </Routes>
    </Router>
  );
}

export default App;
