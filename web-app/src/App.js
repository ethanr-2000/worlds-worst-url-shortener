import * as React from "react"
import {useEffect, useState} from "react"
import Container from "react-bootstrap/Container"
import 'bootstrap/dist/css/bootstrap.min.css'
import NavigationBar from "./components/NavigationBar"
import Inputs from "./components/Inputs"
import UrlTable from './components/UrlTable'
import {getAll} from './utils/api'

function App() {
  const [urls, setUrls] = useState([])

  useEffect(() => {
    getAll().then(res => setUrls(res))
    }, [])

  const urlsForTable = React.useMemo(
    () => {
      if (!urls) { return }
      return urls.map(u => ({
        short: u.shortUrl,
        dest: u.destinationUrl,
      }))
    }, [urls])

  return (
    <>
    <NavigationBar/>
    <Container>
      <h3>Create your own shortened url...</h3>
      <p>Leave first box blank to auto-generate</p>
      <Inputs/>
      <br/>
      <h3>...or mess with someone else's!</h3>
      <p>Click a destination url in the table to change it</p>
      <UrlTable data={urlsForTable}/>
    </Container>
    </>
  )
}

export default App
