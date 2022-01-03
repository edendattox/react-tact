import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import * as Styles from './styles'

const {Container, Wrapper, Title, Form, Input, Button} = Styles;

const baseURL : string | undefined  = process.env.REACT_APP_BASE_URL

export const SignUp = () => {
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const onSignUp = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    try {
      await axios.post(
       `${baseURL}/api/users/signup`,
       {
         username,
         email,
         password,
       }
     );
     console.log('yes, you did it congratulations')
     navigate("/login");
    } catch (error) {
      console.error('wrong details are provided')
    }
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN UP</Title>
        <Form>
          <Input
            type="text"
            placeholder="username"
            value={username}
            onChange={(e) => setUserName(e.target.value)}
          />
          <Input
            type="text"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Input
            type="password"
            placeholder="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <Button
            disabled={!email || !password || password !== confirmPassword}
            type="submit"
            onClick={onSignUp}
          >
            Sign Up
          </Button>
        </Form>
      </Wrapper>
    </Container>
  );
};

