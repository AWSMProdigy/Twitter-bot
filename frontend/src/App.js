// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import React from 'react';

function App() {
  console.log("Hallo");
  const[tweet, setTweet] = useState([]);
  const[user, setUser] = useState("");

  useEffect(() => getTweet(), [user])

  var userToGrab = React.createRef();
  var myVar;

  function handleButton(){
    console.log("Button pressed");
    var inputUser;
    if(userToGrab.current.value == null){
      inputUser = user;
    }
    else{
      inputUser = userToGrab.current.value;
    }
    clearInterval(myVar);
    myVar = setInterval(() => setUser(inputUser), 15000);
  }


  function getTweet(){
    console.log(user);
    if(user == ""){
      setUser("Wario64");
      return;
    }
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
        <input ref={userToGrab}></input> 
        <button onClick={handleButton}></button>
        <h3>{user}</h3>
        <h3 id="lastTweet">{tweet}</h3>
      </header>
    </div>
  );
}

export default App;
