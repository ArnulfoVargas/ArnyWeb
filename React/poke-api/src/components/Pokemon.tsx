import PokemonType from "../types";

interface Props {
    pokemon : PokemonType
}

const Pokemon = (props: Props) => {
  return (
    <div className="flex flex-col items-center mb-5 gap-2">
        <h1 className="text-gray-700 text-4xl font-sans font-bold capitalize ">{props.pokemon.name}</h1>
        <img src={props.pokemon.sprite} alt={"Pokemon " + props.pokemon.name} className="md:w-1/6"/>
    </div>
  )
}

export default Pokemon;