import * as React from "react"
import { useState } from "react"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import FormControl from "react-bootstrap/FormControl"
import InputGroup from "react-bootstrap/InputGroup"
import Button from "react-bootstrap/Button"
import { registerUrl } from "../utils/api"

function Inputs() {
  const [shortUrlInput, setShortUrlInput] = useState("")
  const [destinationUrlInput, setDestinationUrlInput] = useState("")

  return (
    <Row>
      <Col lg={5} xs={12} className="mb-3">
        <InputGroup size="lg">
          <InputGroup.Text >url.ethanr.co.uk/</InputGroup.Text>
          <FormControl id="shortUrlInput" aria-describedby="inputGroup-sizing-lg" onChange={(event) => setShortUrlInput(event.target.value)} />
        </InputGroup>
      </Col>
      <Col lg={6} xs={12} className="mb-3">
        <InputGroup size="lg">
          <InputGroup.Text>Destination Url</InputGroup.Text>
          <FormControl id="destinationUrlInput" aria-label="Small" aria-describedby="inputGroup-sizing-sm" onChange={(event) => setDestinationUrlInput(event.target.value)}/>
        </InputGroup>
      </Col>
      <Col lg={1} xs={12} className="mb-3">
        <InputGroup size="lg">
          <Button className="m-auto" variant="primary" onClick={async () => {
            await registerUrl(shortUrlInput, destinationUrlInput).then(res => window.location.reload(false))
          }}>Submit</Button>
        </InputGroup>
      </Col>
    </Row>
  )
}

export default Inputs
