import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <h1>API Test</h1>
      <Joke/>
      <Pokemon />
      <AllPokemon />
    </div>
  );
}

const Pokemon = props =>{
  const [data, setData] = useState([]);
  const getString = e =>{
    axios.get("https://pokeapi.co/api/v2/pokemon/?limit=807")
      .then(res =>{
          console.log(res.data.results)
          setData(res.data.results);
        }
      )
      .catch(err => console.log(err));
  }


  return(
    <div>
      {
        data.map((item, i) =>
          <div key={i}>
            <p className="text-center">{item.name}</p>
          </div>        
        )
      }
      <button onClick={getString}>Get Pokemon</button>
    </div>
  );
}

const AllPokemon = e =>{
  //const [pokemon, setPokemon] = useState("");
  const [datae, setDatae] = useState([{pokemon:"os"}, {pokemon:"ou"}]);

  const addPokemon = e =>{
    e.preventDefault();
    let apiString = "https://pokeapi.co/api/v2/pokemon/"
    for(let i=1; i<10; i++){

      let tempDatae = [...datae];
      let apiThisSearch = apiString + i.toString();
      axios.get(apiThisSearch)
      Promise.all(tempDatae)
        .then(res =>{
            tempDatae.push({pokemon:res.data.name});
            setDatae(tempDatae);
          }
        )
        .catch(err => console.log(err));
    } 
    console.log("this is the table: "+datae)
  }


  return(
    <div>
      <ul>

      </ul>
      <button onClick={addPokemon}>Get All Pokemon</button>
    </div>
  );
}

const Joke = props =>{

  const [isVisible, setVisibility] = useState(false);
  const [setup, setSetup] = useState("defJ");
  const [punchline, setPunchline] = useState("defPL");
  const getJoke = e =>{
    axios.get("https://official-joke-api.appspot.com/random_joke")
      .then(res => {
        console.log(res.data)
        setSetup(res.data.setup);
        setPunchline(res.data.punchline);
      })
      .catch(err => console.log(err));
  }

  useEffect(() => {
    getJoke();
  }, []);


  return(
    <div>
      <p>{setup}</p>
      {
        isVisible ? <p>{punchline}</p> : <p>...</p>
      }
      <button onClick={e=>setVisibility(!isVisible)}>show</button>
      <button onClick={getJoke}>Get Joke</button>
    </div>
  );
}

export default App;
