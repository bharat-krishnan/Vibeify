import {useState, useEffect} from 'react';
import axios from 'axios';
import './styles.css';
import spotifyLogo from './sl3.png';
import logo from './vibeifyLogo.png';

function App() {

  const clientID = "cde8a1157dd042849d33ad0bfff58a3e"
  const redirectURI = "http://localhost:3000/"
  const authEndpoint = "https://accounts.spotify.com/authorize"
  const responseType = "token"
  
  const [token, setToken] = useState("")
  const [playlists, setPlaylists] = useState([])
  const [mainPlaylist, setMainPlaylist] = useState({})
  const [tracks, setTracks] = useState([])

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
      <button className = "waves-effect waves-light btn pink rounded" key={playlist.id} onClick={() => {setMainPlaylist(playlist);}}> 
      <i class="large library_musicmaterial-icons">library_music</i>{playlist.name}</button>
    );
  });

  const displayMainPlaylist = () => {
    return (
      <div>
        <p>{mainPlaylist.id}</p>
        <p>{mainPlaylist.name}</p>
        <button onClick={getSongs}>Get Songs</button>
      </div>
    )
  }

  const getSongs = async (e) => {
    axios.get(`https://api.spotify.com/v1/playlists/${mainPlaylist.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then((response) => {
      setTracks(response.data.tracks.items)
    })
  }

  const profileStatusButton = !token ? 
    <a className = "waves-effect waves-light btn pink rounded"
        href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>login to spotify</a> :
    <button className = "waves-effect waves-light btn grey darken-3 rounded" onClick = {logout}>Log Out</button>

  let centerDisplay;
  
  if(!token){
    centerDisplay = (
      <div>
            <div className= "section"></div>
            <div className= "section"></div>
            <div className= "section"></div>
            <div className= "section"></div>
        <div className = "row">
        <div className = "col m6 offset-m3">
          <h1>Welcome to vibeify</h1>
          <h5>analytics on your favorite playlists</h5>
          <div className= "section"></div>
          <a className = "waves-effect waves-light btn-large pink rounded"
            href={`${authEndpoint}?client_id=${clientID}&redirect_uri=${redirectURI}&response_type=${responseType}`}>
              <img className = "logImg" src = {spotifyLogo} width = "40"></img>
              <span className = "logTxt">login to spotify</span></a>
        </div>
        <div className = "col m2 float-area">
          <img className = "floating-img" style = {{float: "right",paddingTop: 40}} height = "250" src = {logo}></img>
        </div>
      </div>
      <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
      </div>);
  }
  else{
    //should automatically display playlists first
    // getPlaylist();
    centerDisplay = ( 
    <div>
    <div className = "row">
    <div className = "col m6 offset-m3">
    <div className = "section"></div>
    <div className = "section"></div>
    <div className = "section"></div>
    <h1>Select your playlist</h1>
    <button className = "waves-effect waves-light btn-large pink rounded" onClick={getPlaylist}>fetch your playlists...</button>
         {!mainPlaylist.id && displayPlaylists}
         {mainPlaylist.id && displayMainPlaylist()}
         
         
         
         
         
     </div> 
    </div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
        <div className= "section"></div>
    </div>);
  }

  return (
    <div>
      <nav className = "z-depth-0 black">
        <div class="nav-wrapper container">
          <a href="#" className ="brand-logo">vibeify</a>
          <ul id="nav-mobile" className ="right hide-on-med-and-down">
            <li><a href="#stats" >stats explained</a></li>
            <li>{profileStatusButton}</li>
          </ul>
        </div>
      </nav>

      <div className = "container">
  
        {centerDisplay}


        <div id = "stats" className = "row">
          <div className = "col m6 offset-m3">
          <div className = "section"></div>
            <h3>stats explained</h3>
            <ul className="blackList collection blackList">
            <li className="blackList collection-item"><span style = {{fontWeight: "bold"}}>attribute: </span>
            <br></br>
            <span>sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></li>
            <li className="blackList collection-item"><span style = {{fontWeight: "bold"}}>attribute: </span>
            <br></br>
            <span>sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></li>
            <li className="blackList collection-item"><span style = {{fontWeight: "bold"}}>attribute: </span>
            <br></br>
            <span>sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></li>
            <li className="blackList collection-item"><span style = {{fontWeight: "bold"}}>attribute: </span>
            <br></br>
            <span>sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></li>
            <li className="blackList collection-item"><span style = {{fontWeight: "bold"}}>attribute: </span>
            <br></br>
            <span>sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.</span></li>

      </ul>
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default App;
