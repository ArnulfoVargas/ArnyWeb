import Tarjeta from "./components/Tarjeta";

const MainApp = () => {

    const ShowPerson = (name: string, age: number, status: boolean, extra?:any) => {
        return (
            <>
                <h1>Hola soy {name}</h1>
                <h3>Tengo {age} anios</h3>
                <p>Actualmente estoy {status ? "vivo" : "muerto"} </p>
                {
                    extra 
                    ?  <p>{extra.toString()}</p>
                    : " "
                }
            </>
        )
    }

    return <>
        <h1>Hola Mundo React</h1>
        <p>Buenas tardes</p>

        {
            ShowPerson("Arnulfo", 19, true)
        }

        <Tarjeta/>
    </>
}

export default MainApp;