import * as React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useToken } from '../../customHooks/use-token';
import * as Styles from "./styles"


const { Container, Wrapper, CreateEvent, Left, Logo, LogoImg, Center, Right, MenuItem }  = Styles;



export const Navbar:React.FC = () => {
  const [token] = useToken();

  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    // @ts-ignore
    navigate("/login");
  };
  


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
        <CreateEvent>
        <Link to="/create" style={{ textDecoration: "none" }}>
           Create Event
        </Link>
        </CreateEvent>
      </Center>
      <Right>
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <MenuItem>REGISTER</MenuItem>
        </Link>
        <Link to="/login" style={{ textDecoration: "none" }}>
          {token ? (
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


