interface Props {
    abilities : [object]
}

const PokemonAbilities = (props: Props) => {

  return (
    <div className="md:w-1/3 w-full">
        <h1 className="font-sans text-2xl md:text-3xl text-gray-700 font-bold text-center">Abilities</h1>

        <ol>
        {
            props.abilities.map((obj, i) => {
                return <>
                    <li className="m-1 text-xl font-sans text-gray-500 capitalize list-decimal"
                        key={i}>{obj.ability.name}</li>
                </>
            })
        }
        </ol>
    </div>
  )
}

export default PokemonAbilities