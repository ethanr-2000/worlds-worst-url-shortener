import * as React from "react"
import { useEffect } from "react"
import { useLocation } from 'react-router-dom'
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner"
import { getUrl } from "../utils/api"

const urlHelper = (url) => {
  if (!url || url.match(/url.ethanr.co.uk/)) {
    return "https://url.ethanr.co.uk/"
  }
  if (!(url.startsWith("https://") || url.startsWith("http://"))) {
    return "https://" + url
  }
  return url
}

function Redirect() {
  const path = useLocation().pathname.replace("/", "")

  useEffect(() => {
    getUrl(path).then(destinationUrl => window.location.href = urlHelper(destinationUrl))
  }, [path]);

  return (
    <Container className="min-vh-100 d-flex align-items-center">
      <div className="w-100" style={{marginTop: "-10%"}}>
        <Row>
          <h1 className="text-center">Thank you for using the world's worst url shortener</h1>
        </Row>
        <Row>
          <Spinner className="m-auto mt-5" animation="border" role="status"/>
        </Row>
      </div>
    </Container>
  )
}

export default Redirect
