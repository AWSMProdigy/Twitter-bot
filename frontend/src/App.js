// import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react';
import axios from 'axios'
import React from 'react';

function App() {
  const[tweet, setTweet] = useState("");
  const[user, setUser] = useState("");
  const[myVar, setVar] = useState();
  const[count, setCount] = useState(0);
  const[bg, setBG] = useState("#282c34");
  const[keywords, setKeywords] = useState([]);

  var userToGrab = React.createRef();
  var keyToGrab = React.createRef();

  useEffect(() =>{
    if(count === 0){
      setCount(1);
    }
    else{
      axios.get('/api/tweet', {
        params: {
          user,
        },
      }).then(response => {
        console.log("User found!");
        setTweet(response.data.tweet[0].text);
        clearInterval(myVar);
        setVar(setInterval(() => getTweet(), 15000));
      }, response => {
        console.log(response);
        setTweet("");
        alert("User does not exist or has no tweets");
        clearInterval(myVar);
      })
    }
  }, [user])

  //Runs every time tweet changes
  useEffect(() => {
    if(count === 0){
      setCount(1);
    }
    //IF tweet includes Zelda, show greeen
    else{
      if(keywords.some(v => (tweet.toLowerCase().includes(v)))){
        setBG("#1dd10c");
      }
      //If not, show red
      else{
        setBG("#da1616");
      }
    }
  }, [tweet])

  function handleButton(e){
    e.preventDefault();
    if(userToGrab.current.value === ""){
      alert("Please enter a user")
    }
    else{
      setUser(userToGrab.current.value);
      userToGrab.current.value = "";
    }
  }


  function getTweet(){
    if(user === ""){
      return;
    }
    axios.get('/api/tweet', {
      params: {
        user,
      },
    }).then(response => {
      console.log(response.data);
      if(response.data.tweet[0].text){
          setBG("#282c34");
          setTweet(response.data.tweet[0].text);
      }
    })
  }

  function addKeyword(e){
    e.preventDefault();
    if(keyToGrab.current.value === ""){
      alert("Please enter a keyword")
    }
    else{
      let newkey = keywords;
      newkey.push(keyToGrab.current.value)
      setKeywords(keywords, keyToGrab.current.value);
      console.log(keywords)

      keyToGrab.current.value = "";
    }
  }

  function clearKeywords(){
    setKeywords([]);
  }
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: bg}}>
        <form onSubmit={handleButton}>
          <label>Enter User: </label>
          <input id="userInput" ref={userToGrab}></input>
          <input type="submit"></input>
        </form>
        <form onSubmit={addKeyword}>
          <label>Enter keyword to search for: </label>
          <input id="keywordInput" ref={keyToGrab}></input>
          <input type="submit"></input>
        </form>
        <button onClick={clearKeywords}></button>
        <h3>{user}</h3>
        {keywords.map((keyword) => 
          <h3 key={keyword}>{keyword}</h3>
        )}
        <h3 id="lastTweet">{tweet}</h3>
      </header>
    </div>
  );
}

export default App;
