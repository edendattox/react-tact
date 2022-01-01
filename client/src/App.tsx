import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import Create from './pages/Create/Create';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import {Login} from './pages/Login/Login';
import {SignUp} from './pages/SignUp/SignUp';

const  App:React.FC = () => {
  

  const isAuthenticated = !!localStorage.getItem("token");
  return (
    <div className="App">
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={ 
            isAuthenticated ? (
              <Home />
            ) : (
              <Navigate to="/login" />
            )
        }/>
          <Route path="/detail/event/:id" element={
              isAuthenticated ? (
                <Detail />
              ) : (
                <Navigate to="/login" />
              )
          } />
          <Route path="/create" element={
              isAuthenticated ? (
                <Create />
              ) : (
                <Login/>
              )
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path='*' >404 Go Back</Route>
        </Routes>
      </Fragment>
    </Router>
  </div>
  );
}

export default App;
