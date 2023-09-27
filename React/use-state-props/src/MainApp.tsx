import Benito from "./components/Benito";
import Counter from "./components/Counter";

const MainApp = () => {
    return (
        <div className="flex gap-5 px-10 py-5">
            <Counter/>

            <Benito name="Benito Juarez" firstAdjecttive="presidente"/>
        </div>
    )
}

export default MainApp;