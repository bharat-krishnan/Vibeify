import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';

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

 // function selectedPlaylist(playlist) {
 //   setMainPlaylist(playlist)
    // calcAverageStats(playlist) TO IMPLEMENT
  //}

  // ONCE AVERAGE STATS CALCULATED, DISPLAY WITH FUNC HERE


  return (
    <div className="App">
      {!token ? <a href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>Login to Spotify</a> : <button onClick={logout}> Log Out</button>}
      <button onClick={getPlaylist}>Fetch Your Playlists</button>
      {displayPlaylists}
    </div>
    
  );
}

export default App;
