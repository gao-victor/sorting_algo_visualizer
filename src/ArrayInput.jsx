import { createRef, useRef, useState } from "react";
import { ArrayVis } from "./ArrayVis";
import "./App.css"

export function ArrayInput({ initialArray, setInitialArray, start }) {
  let arrayValues = useRef([]);

  function changeArray() {
    let canChange = true;
    let newArray = [];
    for (let i = 0; i < arrayValues.current.length; i++) {
      if (arrayValues.current[i] === null) {
        break;
      }
      if (arrayValues.current[i].value == "") {
        arrayValues.current[i].value = "need to add a value";
        canChange = false;
      } else {
        const number = parseInt(arrayValues.current[i].value);
        if (isNaN(number)) {
          arrayValues.current[i].value = "not a proper number";
          canChange = false;
        } else {
          newArray.push(number);
        }
      }
    }
    if (canChange) {
      setInitialArray(newArray);
    }
  }

  function addElement(array) {
    setInitialArray([...array, 0]);
  }

  function removeElement(array) {
    setInitialArray((prevArray) => {
      if (prevArray.length <= 1){
        return prevArray;
      }
      else{
        return prevArray.filter((ele, index) => {
          return index < prevArray.length-1;
        })
      }
    }
    );
  }

  return (
    <div className="ArrayInput">
      <div className="ArrayInputArray">
      {initialArray.map((val, index) => {
        return (
          <input className="ArrayInputElement"
            type="text"
            placeholder={val}
            ref={(el) => {
              arrayValues.current[index] = el;
            }}
          ></input>
        );
      })}
      </div>
      <div className="ArrayInputButtons">

      <button
        id="addElementButton"
        onClick={() => {
          addElement(initialArray);
          start();
        }}
      >
        Add Element
      </button>
      <button
        id="removeElementButton"
        onClick={() => {
          removeElement(initialArray);
          start();
        }}
      >
        Remove Element
      </button>
      <button
        id="changeArrayBtn"
        onClick={() => {
          changeArray();
          start();
        }}
      >
        changeArray
      </button>
      </div>
    </div>
  );
}
