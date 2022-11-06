// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import React from 'react';

function App() {
  const[tweet, setTweet] = useState([]);
  const[user, setUser] = useState("");
  const[myVar, setVar] = useState();

  var userToGrab = React.createRef();
  let count;

  useEffect(() =>{
    if(count === 0){
      count++;
    }
    else{
      clearInterval(myVar);
      setVar(setInterval(() => getTweet(), 15000));
    }
  }, [user])

  function handleButton(){
    if(userToGrab.current.value === ""){
      alert("Please enter a user")
    }
    else{
      setUser(userToGrab.current.value);
      userToGrab.current.value = "";
    }
  }


  function getTweet(){
    console.log(user);
    if(user === ""){
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
