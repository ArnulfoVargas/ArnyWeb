interface Props{
    cuantity    : number,
    counter     : number,
    setCounter  : React.Dispatch<React.SetStateAction<number>>
}

const Button = (props: Props) => {

    function click(){
        props.setCounter(props.counter + props.cuantity)
    } 

    return (
        <div className="w-28 h-14 bg-red-400 rounded-2xl hover:bg-red-500 
                        transition-colors duration-200 active:bg-red-600 shadow-xl
                        flex justify-center items-center cursor-pointer select-none 
                        hover:border-gray-100 hover:border-2"
            onClick={click}
                        >

            <h3 className="text-gray-200 text-2xl cursor-pointer select-none"
                        >
                {props.cuantity > 0? "+" : ""}{props.cuantity}
            </h3>
        </div>
    )
}

export default Button;