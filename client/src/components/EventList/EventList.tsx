import * as React from 'react'
import { Link } from 'react-router-dom';
import * as Styles from "./styles"

const {useEffect, useState} = React
const { Container, Header, Date}  = Styles;

interface ListProps {
  title?: string,
  detail?: string, 
  date?: string,
  location?: string
  id?: string
}

export const EventList:React.FC<ListProps> = ({title, detail, date, location, id}) => {
  return (
    <Container>
      <Link 
        to={`/detail/event/${id}`}
        style={{ textDecoration: "none", color: 'black', display: 'flex', flexDirection: 'column', gap: '30px' }}
      >
      <Date>
        {date}
      </Date>
      <Header>
        {title}          
      </Header>
      </Link>
    </Container>
  )
}

