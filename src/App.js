import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import spotifyLogo from './spotifyLogo.png';

function App() {

  const clientID = "cde8a1157dd042849d33ad0bfff58a3e"
  const redirectURI = "http://localhost:3000/"
  const authEndpoint = "https://accounts.spotify.com/authorize"
  const responseType = "token"
  
  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [mainPlaylist, setMainPlaylist] = useState({})

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

  const getPlaylist = async (e) => {
    axios.get(`https://api.spotify.com/v1/me/playlists`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setPlaylists(response.data.items)
    })
  }
  const displayPlaylists = playlists.map(playlist => {
    return (
      <button key={playlist.id}>{playlist.name}</button>
    )
  })

  const profileStatusButton = !token ? 
    <a className = "waves-effect waves-light btn green rounded"
        href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>login to spotify</a> :
    <button className = "waves-effect waves-light btn green rounded" onClick = {logout}>Log Out</button>


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
      <button onClick={getPlaylist}>Fetch Your Playlists</button>
      {displayPlaylists}
    </div>
    
  );
}

export default App;
