interface Props{
    setCounter  : React.Dispatch<React.SetStateAction<number>>
}

const ResetButton = (props: Props) => {

    function click(){
        props.setCounter(0)
    } 

    return (
        <div className="w-28 h-14 bg-red-400 rounded-2xl hover:bg-red-500 
                        transition-colors duration-200 active:bg-red-600 shadow-xl
                        flex justify-center items-center cursor-pointer select-none mt-5
                        hover:border-gray-100 hover:border-2"
            onClick={click}
                        >

            <h3 className="text-gray-200 text-2xl cursor-pointer select-none"
                        >
                RESET
            </h3>
        </div>
    )
}

export default ResetButton;