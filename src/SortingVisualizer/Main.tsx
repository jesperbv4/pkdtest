import { useContext , useEffect, useState} from "react";
import AlgoContext from "./SortingVisualizer";
import { ItemsContext } from './SortingVisualizer'



const Main = () => {
    const {items} = useContext(ItemsContext);
    
    return (
        <div className="array-bar">
            {items.map((value, idx) => (
                <div className="array-container" key={idx}>
                    {value}
                    
                </div>
                
            ))}
            <button onClick={Sort}>Click me!</button>
        </div>
    )
}

export default Main;

function insertionSort<T>(list: T[]): T[] {

    IndexIterator:
    for (let i = 1; i < list.length; i++) {

        const valueToSort = list[i];

        InsertionIterator:
        for (let j = i - 1; j >= 0; j--) {
            if (valueToSort >= list[j]) {
                list[j + 1] = valueToSort;
                continue IndexIterator;
            } else {
                list[j + 1] = list[j];
                list[j] = valueToSort;
                continue InsertionIterator;
            }
        }
    }

    return list;
}