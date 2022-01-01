import axios from 'axios';
import * as React from 'react'
import { useParams } from 'react-router-dom';
import Detail from '../../pages/Detail/Detail';
import * as Styles from "./styles"

const {useEffect, useState} = React
const { Container, Header, Date, Top, Description, Bottom}  = Styles;

const baseURL : string | undefined  = process.env.REACT_APP_BASE_URL

interface EventType {
  title: string;
  date: string;
  detail: string;
  location: string;
}

export const EventDetail:React.FC = () => {

  const [event, setEvent] = useState<any>([]);
  const { id } = useParams();



  const getList = async () => {
    try {
      const res = await axios.get(
        `${baseURL}/api/event/${id}`
      );
      setEvent(res.data);
    } catch (e) {
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const {date, title, detail, location} = event ;

  return (
    <Container>
      <Top>
      <Date>
        {date}
      </Date>
      <Header>
        {title}          
      </Header>
      </Top>
      <Description>
        {detail}
      </Description>
      <Bottom>
       Location: {location}
      </Bottom>
    
    </Container>
  )
}

