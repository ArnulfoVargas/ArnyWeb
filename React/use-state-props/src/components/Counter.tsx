import { useState } from "react";
import ButtonsContainer from "./ButtonsContainer";

const Counter = () => {

    const [counter, setCounter] = useState(0);

    return (
        <div className="flex flex-col w-1/2 bg-gray-200 rounded-2xl p-5 items-center shadow-xl">
            <h1 className="font-sans text-5xl font-semibold text-gray-600 select-none">Contador</h1>
            <h2 className="font-sans text-4xl font-normal text-gray-700 my-4 select-none">{counter}</h2>

            <ButtonsContainer counter={counter} setCounter={setCounter}/>

        </div>
    )
}

export default Counter;