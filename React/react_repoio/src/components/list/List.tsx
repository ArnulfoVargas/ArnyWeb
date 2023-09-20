function List() {
    return(
        <div className="px-12 py-3">
            <ul className="[&>*:nth-child(2n)]:text-red-600 font-bold list-disc">
                <li>Elemento 1</li>
                <li>Elemento 2</li>
                <li>Elemento 3</li>
                <li>Elemento 4</li>
                <li>Elemento 5</li>
                <li>Elemento 6</li>
                <li>Elemento 7</li>
                <li>Elemento 8</li>
                <li>Elemento 9</li>
                <li>Elemento 10</li>
                <li>Elemento 11</li>
                <li>Elemento 12</li>
            </ul>
        </div>
    )
}

export default List;