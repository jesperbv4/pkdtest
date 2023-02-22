import React, {useState, useEffect} from "react";

type States = Array<State>
type Focus = number | null;
type State = {
    value: Array<number>,
    current: Focus,
    ref: Focus
}

const initState = {value: [], current: null, ref: null};

let frame = 0;
const frames: States = [initState];
const Test: React.FC = () => {
    const [items, setItems] = useState<number[]>([]);
    
    useEffect(()=>{
        const newItems = random_permutation(10);
        setItems(newItems);
    }, []);

    function handleClick() {
        insertionSort([...items]);
        console.log(frames)
    }

    function stepBack() {
        if(frame > 0) {
            const newFrame = frames[frame].value;
            frame --;
            setItems(newFrame);
        } else {frame = 0;};
        
    };

    function stepForw() {
        if(frame < frames.length-1) {
            const newFrame = frames[frame].value;
            frame ++;
            setItems(newFrame);  
        } else {frame = frames.length - 1};
        
    }

    function get_id(idx:number): string {
        const curr = frames[frame].current
        const ref = frames[frame].ref
        if(idx === curr && curr !== null) {
            return "current"
        } else if(idx === ref && ref !== null) {
            return "ref"
        } else {
            return "normal"
        }
    }

    return (
        <div className="array-bar">
            <button onClick={stepBack}>Back</button>
            <button onClick={stepForw}>Next</button>
            {items.map((value, idx) => (
                <div className="array-container" id={get_id(idx)} key={idx}>
                    {value}
                </div>
            ))}
            <button onClick={handleClick}>Sort</button>
        </div>
    )
};

export default Test



/**
 * Takes a number and makes a permutation 
 * @param length number: the length for the Array
 * @returns Array: an Array with a permutation of the numbers from 0-(number-1)
 */
export function random_permutation(length: number): Array<number> {

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

function saveFrame(A: number[], curr: Focus, ref: Focus): void {
    frames.push({
        value:[...A], 
        current:curr, 
        ref:ref
    });
}

export function insertionSort(list: number[]): number[] {
    let current:Focus = null;
    let ref:Focus = null;
    const save = () => saveFrame([...list], current, ref)
    save();
    
    IndexIterator:
    for (let i = 1; i < list.length; i++) {
        const valueToSort = list[i];
        current = i;
        save();
        InsertionIterator:
        for (let j = i - 1; j >= 0; j--) {
            ref = j;
            save();
            if (valueToSort >= list[j]) {
                list[j + 1] = valueToSort;
                ref = null;
                save();
                continue IndexIterator;
            } else {
                list[j + 1] = list[j];
                list[j] = valueToSort;
                ref = null;
                save();
                current = current - 1;
                
                continue InsertionIterator;
            }
        }
    }

    return list;
}