import { useState } from "react";

interface Props {
    title: string
    initialN: number
}

const SimpleState = (props: Props) => {

    const {title, initialN} = props;

    const [valor, setValor] = useState(initialN)

    const addNumber = () => {
        setValor(valor + 1)
    }

    return (<>
        <h1>{title}</h1>
        <h2>{valor}</h2>
        <button onClick={addNumber}>Añadir</button>
    </>)
}

export default SimpleState