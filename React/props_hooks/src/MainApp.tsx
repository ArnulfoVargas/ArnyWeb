import { useState } from "react"
import data from "./data/data"
import UserList from "./components/userList"


const MainApp = () => {
    
    const [people, setPeople] = useState(data)

    const updatePeople = () => {
        setPeople([])
    }

    return (
        <article className="container">
            <h3>Hay {people.length} usuarios activos</h3>
            <UserList lista={people}/>

            <button onClick={updatePeople}>Desconectar</button>
        </article>
    )
}

export default MainApp