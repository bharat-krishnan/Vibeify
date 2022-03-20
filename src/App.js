import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import spotifyLogo from './spotifyLogo.png';

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

  const getUserPlaylists = async (e) => {
    e.preventDefault()
    const lists = await axios.get(`https://api.spotify.com/v1/me/playlists`,
    )
  }

  const profileStatusButton = !token ? 
    <a className = "waves-effect waves-light btn green rounded"
        href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>login to spotify</a> :
    <button onClick={logout}>Log Out</button>


  return (
    <div>
      <nav className = "z-depth-0 black">
        <div class="nav-wrapper container">
          <a href="#" className ="brand-logo">vibeify</a>
          <ul id="nav-mobile" className ="right hide-on-med-and-down">
            <li><a>stats explained</a></li>
            <li>{profileStatusButton}</li>
          </ul>
        </div>
      </nav>
    </div>
  );
}

export default App;
