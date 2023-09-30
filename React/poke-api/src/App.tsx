import { useState, useEffect } from "react"
import LoadingScreen from "./components/LoadingScreen";
import PokemonType from "./types";

import Pokemon from "./components/Pokemon";
import PokemonData from "./components/PokemonData";

function App() {

  const getRandomEndPoint = () => `https://pokeapi.co/api/v2/pokemon/${Math.floor(Math.random() * 1017) + 1 }`
  const [endPoint, setEndPoint] = useState(getRandomEndPoint());
  const [loading, setLoading] = useState(true)
  const [pokemon, setPokemon] = useState({})
  
  function randomize() {
    setEndPoint(getRandomEndPoint)
  }
  
  const fetchData = async() => {
    setLoading(true)
    try{
      const response = await fetch(endPoint)
      const data = await response.json()

      setPokemon({
        name      : data.name,
        sprite    : data.sprites.front_default,
        abilities : data.abilities,
        types     : data.types
      } as PokemonType)

      setLoading(false)
    }
    catch(err){
      console.log(err)
      setLoading(false)
    }
  }

  useEffect(() => {
    
    fetchData()

    setTimeout(randomize, 5000)

    return () => {
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [endPoint])



  if(loading){
    return (
      <LoadingScreen/>
    )
  }
  
  else{
    return (
      <div className="mx-auto md:w-4/5 rounded-2xl bg-gray-200 p-5 mt-5 flex flex-col shadow-md">
        <Pokemon pokemon={pokemon as PokemonType}/>

        <PokemonData pokemon={pokemon as PokemonType}/>
      </div>
    )
  }
}

export default App
