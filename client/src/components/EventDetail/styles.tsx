import styled from "styled-components"

export const Container = styled.div`
 position: relative;
 top: 120px;
 display: flex;
 width: min(80vw, 1000px);
 height: min(60vh, 1000px);
 background-color: #548CFF;
 border-radius: 20px;
 margin-top: 100px;
 padding: 20px;
 margin: 0 auto;
 filter: drop-shadow(0 0 0.12rem black);
 flex-direction: column;
 gap: 50px;
 `
 export const Top = styled.div`
   display: flex;
   gap: 100px;
   align-items: center;
 `

export const Header = styled.h1`
  font-size: 28px;
  text-transform: uppercase;
  color: black;

`

export const Date = styled.p`
  color: black;
  text-transform: uppercase;
  font-size: 28px;
`


export const Description = styled.p`
  margin-top: 50px;
  font-size: 18px;
  `

export const Bottom = styled.p`
  font-size: 18px;

`

