
interface Props {
    lista: {
        id: number
        name: string
        series: string
        image: string   
    }[]
}



const UserList:React.FC<Props> = ({lista}) => {
    return (
        <>
            {
                lista.map((personaje:any) => {
                    
                    const {id, name, series, image} = personaje

                    return (
                        <article key={id} className="person">
                            <img src={image} alt={name} />
                            <h4>{name}</h4>
                            <p>{series} series</p>
                        </article>
                    )
                })
            }
        </>
    )
}


export default UserList