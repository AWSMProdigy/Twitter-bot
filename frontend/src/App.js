// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'

function App() {
  console.log("Hallo");
  const[tweet, setTweet] = useState([]);
  const[user, setUser] = useState("");

  useEffect(() => getTweet(), [user])

  function getTweet(){
    axios.get('/api/tweet', {
      params: {
        user,
      },
    }).then(response => {
      console.log(response.data);
      setTweet(response.data.tweet[0].text);
    })
    .catch(error => console.log(error.message))
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <input id="userToGrab" onChange={e=>setUser(e.target.value)}></input> 
        <button onClick={getTweet}></button>
        <h3>{user}</h3>
        <h3 id="lastTweet">{tweet}</h3>
      </header>
    </div>
  );
}

export default App;
