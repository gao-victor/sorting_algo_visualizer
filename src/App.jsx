import "./App.css";
import { useEffect, useState } from "react";
import { Algorithm } from "./Algorithm.jsx";
import { ArrayInput } from "./ArrayInput.jsx";

function App() {
  function start() {
    selectAlgorithm("nothing");
    changeCompute(false);
  }

  let [algorithm, selectAlgorithm] = useState("nothing");
  let [initialArray, setInitialArray] = useState([4, 6, 3, 7, 2, 8]);
  let [compute, changeCompute] = useState(false);

  return (
    <div className="App">
      <h1>This is a visualizer for sorting algorithms!</h1>
      <h3>Edit the Array to be Sorted</h3>
      <ArrayInput
        className="arrEle"
        initialArray={initialArray}
        setInitialArray={setInitialArray}
        start={start}
      ></ArrayInput>
      <h3>Select Algorithm to Use!</h3>
      <div className="algorithmOptions">

      <p
        onClick={() => {
          selectAlgorithm("selectionSort");
          changeCompute(true);
        }}
        className="options"
      >
        Selection Sort
      </p>
      <p
      className="options"
        onClick={() => {
          selectAlgorithm("bubbleSort");
          changeCompute(true);
        }}
      >
        Bubble Sort
      </p>
      <p
        className="options"
        onClick={() => {
          selectAlgorithm("mergeSort");
          changeCompute(true);
        }}
      >
        Merge Sort
      </p>
      </div>
      <Algorithm
        id={algorithm}
        initialArray={initialArray}
        compute={compute}
      ></Algorithm>
      <button
        onClick={() => {
          start();
        }}
        className="clear"
      >
        Click this to clear
      </button>
    </div>
  );
}

export default App;
