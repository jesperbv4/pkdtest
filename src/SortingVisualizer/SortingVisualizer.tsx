import React, {useState, createContext, useEffect} from "react";



interface Props {
    children: React.ReactNode;
};

type Items = {
    items: number[]
    setItems?: React.Dispatch<React.SetStateAction<number[]>>
};

export const ItemsContext = createContext<Items>( { items:[] } )



const AlgoContext: React.FC<Props> = ({children}) => {
    const [items, setItems] = useState<number[]>([]);

    useEffect(()=>{
        const newItems = random_permutation(10);
        setItems(newItems);
        
    }, []);
    
    return <ItemsContext.Provider value={{items, setItems}}>
        {children}
    </ItemsContext.Provider>
};

export default AlgoContext

/**
 * Takes a number and makes a permutation 
 * @param length number: the length for the Array
 * @returns Array: an Array with a permutation of the numbers from 0-(number-1)
 */
function random_permutation(length: number): Array<number> {

    function getRandomInt(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
    }
    function swap(A: Array<number>, i: number, j: number): void {
        const temp = A[i];
        A[i] = A[j];
        A[j] = temp;
    }
    
    const result = Array<number>(length)
    for (let i = 0; i < length; i++) {
        result[i] = i;
    }
    for (let i = 0; i < length - 1; i++) {
        const j = getRandomInt(i,length)
        swap(result, i, j);
    }
    
    return result;
}

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

