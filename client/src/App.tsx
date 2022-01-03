import React, { Fragment } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import './App.css';
import { Navbar } from './components/Navbar/Navbar';
import { useToken } from './customHooks/use-token';
import Create from './pages/Create/Create';
import Detail from './pages/Detail/Detail';
import Home from './pages/Home/Home';
import {Login} from './pages/Login/Login';
import {SignUp} from './pages/SignUp/SignUp';

interface IProps {
  children: any;
  auth: any;
}

const Protected = ({auth, children }: IProps) => {   
  return auth ? children : <Navigate to="/login" />;
}

const  App:React.FC = () => {
  
  const isAuthenticated = !!localStorage.getItem("token");

  return (
    <div className="App">
    <Router>
      <Fragment>
        <Navbar />
        <Routes>
          <Route path="/" element={ 
            <Protected auth={isAuthenticated} >
              <Home />
            </Protected>
        }/>
          <Route path="/detail/event/:id" element={
            <Protected auth={isAuthenticated} >
              <Detail />
            </Protected>
          } />
          <Route path="/create" element={
            <Protected auth={isAuthenticated} >
              <Create />
            </Protected>
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
