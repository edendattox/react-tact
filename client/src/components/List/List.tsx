import axios from 'axios';
import * as React from 'react'
import { EventList } from '../EventList/EventList';
import * as Styles from "./styles"

const {useEffect, useState} = React
const { Container, Header, Title, Row}  = Styles;

const baseURL : string | undefined  = process.env.REACT_APP_BASE_URL

export const List:React.FC = () => {
  const [list, setList] = useState<any[]>([]);

  const getList = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/events`
      );
      setList(res.data);
    } catch (e) {
      throw new Error("error fetching data");
    }
  };


  useEffect(() => {
    getList();
  }, []);

  return (
    <Container>
       <Header>
         <Title>Event List</Title>
       </Header>
       <Row>
        {list.map((item: any) => (
          <EventList {...item} key={item.id} />
        ))}
      </Row>
    </Container>
  )
}

