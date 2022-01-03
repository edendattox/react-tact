import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from '../../customHooks/use-token';
import * as Styles from "./styles"

const {useEffect, useState} = React;

const { Container, Wrapper, CreateEvent, Left, Logo, LogoImg, Center, Right, MenuItem }  = Styles;

export const Navbar:React.FC = () => {
  const [user, setUser] = useState(false);
  
  const navigate = useNavigate();
  
  const logOut = () => {
    localStorage.removeItem("token");
    // @ts-ignore
    console.log('comeback again');
    navigate("/login");
  };

  const isAuthenticated: boolean = !!localStorage.getItem("token")
  

  useEffect(() => {
    setUser(isAuthenticated)
  }, [user, isAuthenticated])


  return (
    <Container>
    <Wrapper>
      <Left >
        <Link to="/">
          <Logo>
            <LogoImg
              src="https://cdn.dribbble.com/users/31864/screenshots/3666062/attachments/819877/2.jpg"
              alt="#"
            />
          </Logo>
        </Link>
      </Left>
      <Center>
        <Link to="/create" style={{ textDecoration: "none" }}>
        <CreateEvent>
           Create Event
        </CreateEvent>
        </Link>
      </Center>
      <Center style={{ marginLeft: "20px"}}>
        <Link to="/" style={{ textDecoration: "none" }}>
        <CreateEvent>
          Home
        </CreateEvent>
        </Link>
      </Center>
      <Right>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <MenuItem>REGISTER</MenuItem>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          {user ? (
        <MenuItem onClick={logOut}>LOG OUT</MenuItem> 
          ) : 
            <MenuItem>LOG IN</MenuItem>
         } 
        </Link>
      </Right>
    </Wrapper>
  </Container>
  )
}


