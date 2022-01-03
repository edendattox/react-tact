import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import * as Styles from "./styles";
import { useToken } from "../../customHooks/use-token";

const { Container, Wrapper, Title, Form, Input, Button } = Styles;

const baseURL: string | undefined = process.env.REACT_APP_BASE_URL;


export const Login = () => {
  const [token, setToken] = useToken()
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();


  const handleClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      const res = await axios.post(`${baseURL}/api/users/signin`, {
        email,
        password,
      });
      const {userJwt } = res.data;
      // @ts-ignore
      setToken(userJwt) 
      navigate("/")
      console.log('hurray, you successfully logged in')
    } catch (error) {
      console.error('wrong id or password')
    }
  };

  // useEffect(() => {
  //    token && navigate('/') 
  // }, [token])
  

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button onClick={handleClick} type="submit">
            Log In
          </Button>
        </Form>
        {/* {error && <Error>Something went wrong...</Error>} */}
        <Link to="/signup" style={{ textDecoration: "none" }}>
          <Button>CREATE A NEW ACCOUNT</Button>
        </Link>
      </Wrapper>
    </Container>
  );
};
