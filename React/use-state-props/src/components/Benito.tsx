import { useState } from "react";

interface Props {
    name: string,
    firstAdjecttive?: string,
}

const Benito = (props: Props) => {

    const [adjectives, setAdjectives] = useState(props.firstAdjecttive ? props.firstAdjecttive + ", " : '')

    const click = () => {
        const input = document.getElementById("inputField");
        const data = input!.value;

        if (data === '' || data === " ") return

        setAdjectives(adjectives + data + ', ');

        input!.value = '';
    }

    return (
        <div className="flex flex-col w-1/2 bg-gray-200 rounded-2xl p-5 shadow-xl">
            <h1 className="font-sans text-5xl font-semibold text-gray-600 select-none text-center">{props.name} es...</h1>
            
            <span className="mt-2 mb-5">
                <p className="font-sans text-3xl font-normal text-gray-600 select-none lowercase inline">{props.name} es </p>
                <p className="font-sans text-3xl font-normal text-gray-600 select-none lowercase inline">{adjectives}</p>
            </span>

            <input className="rounded-2xl md:w-1/3 h-10 mb-3 text-gray-600
                                text-2xl px-3" type="text" id="inputField"/>

            <div className="w-28 h-14 bg-red-400 rounded-2xl hover:bg-red-500 
                            transition-colors duration-200 active:bg-red-600 shadow-xl
                            flex justify-center items-center cursor-pointer select-none 
                            hover:border-gray-100 hover:border-2"
                             onClick={click}>

                <p className="text-gray-200 text-2xl cursor-pointer select-none">Agregar</p>
            </div>
        </div>
    )
}

export default Benito;