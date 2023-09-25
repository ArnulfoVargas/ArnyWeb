import Button from "./Button";
import ResetButton from "./ResetButton";

interface Props{
    counter     : number,
    setCounter  : React.Dispatch<React.SetStateAction<number>>
}

const ButtonsContainer = (props:Props) => {
    return (
        <>
            <div className="flex gap-4">
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={-100}/>
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={-10}/>
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={-1}/>
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={1}/>
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={10}/>
                <Button counter={props.counter} setCounter={props.setCounter} cuantity={100}/>
            </div>

            <ResetButton setCounter={props.setCounter}/>
        </>
    )
}

export default ButtonsContainer;