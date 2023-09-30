import PokemonAbilities from "./PokemonAbilities"
import PokemonTypes from "./PokemonTypes"
import PokemonType from "../types"

interface Props {
    pokemon : PokemonType
}

const PokemonData = (props: Props) => {

    const {types, abilities} = props.pokemon

  return (
    <div className="flex md:flex-row flex-col md:w-1/2 w-full mx-auto mb-5 justify-between">
        <PokemonAbilities abilities={abilities}/>
        <PokemonTypes types={types}/>
    </div>
  )
}

export default PokemonData