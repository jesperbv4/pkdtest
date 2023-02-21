import React, {useState} from "react";
import SortingVisualizer from "./SortingVisualizer/SortingVisualizer";
import './App.css'
import './SortingVisualizer/SortViz.css'

type state = number | null;

interface IList {
  elements: {
    value:number,
    state:state 
  }[]
}


const current = 0;
const reference = 1;

function App() {

  const [element, setElement] = useState<IList["elements"]>([
    {
      value: 1,
      state: null
    },
    {
      value: 2,
      state: null
    }
  ]);

  return (
    <div>
      <h1>Algorithm sorting Wizard</h1>
        <SortingVisualizer></SortingVisualizer>
    </div>
  )

}

export default App;