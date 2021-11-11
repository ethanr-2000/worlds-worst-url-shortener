import * as React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'

const NavigationBar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" style={{marginBottom:20}}>
      <Container>
        <Navbar.Brand>World's Worst Url Shortener</Navbar.Brand>
      </Container>
    </Navbar>
  )
}

export default NavigationBar
