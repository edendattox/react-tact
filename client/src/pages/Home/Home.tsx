import React from "react";
import { List } from "../../components/List/List";
import { Navbar } from "../../components/Navbar/Navbar";
import { Container } from "./styles";

const Home: React.FC = () => {
  return (
    <Container>
      <List />
    </Container>
  );
};

export default Home;
