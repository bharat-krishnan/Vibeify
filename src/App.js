import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';

function App() {

  const clientID = "058ffdb2354e43729cc7cb8e921e49c3"
  const redirectURI = "http://localhost:3000/"
  const authEndpoint = "https://accounts.spotify.com/authorize"
  const responseType = "token"
  
  const [token, setToken] = useState("")

  useEffect(() => {
    const hash = window.location.hash
    let tok = window.localStorage.getItem("token")

    if (!tok && hash) {
      tok = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]
      window.location.hash = ""
      window.localStorage.setItem("token", tok)
    }

    setToken(tok)
 
  }, [])

  function logout() {
    setToken("")
    window.localStorage.removeItem("token")
  }



  return (
    <div className="App">
      {!token ? <a href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>Login to Spotify</a> : <button onClick={logout}> Log Out</button>}
    </div>
  );
}

export default App;
