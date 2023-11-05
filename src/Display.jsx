import { useState, useEffect } from "react";
import { ArrayVis } from "./ArrayVis";
import "./App.css";

export function Display({ arrays, algorithm, isRecursion }) {
  let [step, changeStep] = useState(0);
  let [prevStep, changePrevStep] = useState(0);
  let [oneLine, changeOneLine] = useState(true);

  function nextStepfn() {
    if (step + 1 > arrays.length - 1) {
    } else {
      if (arrays[step + 1][0].element) {
        changePrevStep(step + 1);
      }
      changeStep(step + 1);
    }
  }

  function prevStepfn() {
    if (step - 1 < 0) {
    } else {
      //previous step is an array
      if (arrays[step - 1][0].element) {
        changeStep(step - 1);
      } else {
        //previous step is a paragraph
        //if the current step is an array, we need to find whats the most recent index of the array before the current one
        if (arrays[step][0].element) {
          let steps;
          for (steps = step - 1; steps >= 0; steps--) {
            //found the array
            if (arrays[steps][0].element) {
              break;
            }
          }
          changePrevStep(steps);
          changeStep(step - 1);
        } else {
          changeStep(step - 1);
        }
      }
    }
  }

  function handleKeyPress(event) {
    if (event.code === "ArrowRight") {
      nextStepfn();
    } else if (event.code === "ArrowLeft") {
      prevStepfn();
    }
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyPress);
    return () => {
      window.removeEventListener("keydown", handleKeyPress);
    };
  });

  //if one sorting algortihm has more steps and the algorithm is changed, step will be greater than the length
  if (step >= arrays.length) {
    let steps;
    for (steps = arrays.length - 1; steps >= 0; steps--) {
      if (arrays[steps][0].element) {
        break;
      }
    }
    changePrevStep(steps);
    changeStep(arrays.length - 1);
  } else if (!arrays[prevStep][0].element) {
    console.log(arrays.length, prevStep, step, arrays[step][0].element);
    let steps;
    if (arrays[step][0].element) {
      changePrevStep(step);
    } else {
      for (steps = step - 1; steps >= 0; steps--) {
        console.log(arrays[steps][0].element, steps);
        if (arrays[steps][0].element) {
          break;
        }
      }
      changePrevStep(steps);
    }
  }

  if (oneLine) {
    let display = arrays.filter(
      (arr, index, algorithm) => index >= prevStep && index <= step
    );
    return (
      <>
        <div className="Display">
          <h3>{algorithm}</h3>
          <div className="DisplayArrays">
            {display.map((arr, index) => {
              if (!arr[0].element) {
                return <p className="arrayDescriptionText">{arr[0].value}</p>;
              } else {
                let count = 1;
                let specialIndices = [];
                while (
                  index + count <= display.length - 1 &&
                  !arrays[prevStep + index + count][0].element
                ) {
                  if (
                    arrays[prevStep + index + count][0].specialIndices == []
                  ) {
                  } else {
                    specialIndices.push({
                      step: prevStep + index + count,
                      specialIndicesArr:
                        arrays[prevStep + index + count][0].specialIndices,
                        swap: arrays[prevStep + index + count][0].swap
                    });
                  }
                  count++;
                }
                return (
                  <ArrayVis
                    array={arr.map((val) => val.value)}
                    specialIndices={specialIndices}
                    step={step}
                  ></ArrayVis>
                );
              }
            })}
          </div>
          <div className="DisplayButtons">
            <button id="previousArrayButton" onClick={() => prevStepfn()}>
              Previous Step
            </button>
            <button id="nextArrayButton" onClick={() => nextStepfn()}>
              Next Step
            </button>
            <button
              id="changeOneLineButton"
              onClick={() => {
                changeOneLine(false);
              }}
            >
              View Multiple Lines
            </button>
          </div>
        </div>
      </>
    );
  } else {
    let display = arrays.filter((arr, index, algorithm) => index <= step);
    return (
      <>
        <div className="Display">
          <h3>{algorithm}</h3>
          <div className="DisplayArrays">
            {display.map((arr, index) => {
              if (!arr[0].element) {
                return <p>{arr[0].value}</p>;
              } else {
                let count = 1;
                let specialIndices = [];
                while (
                  index + count <= arrays.length - 1 &&
                  !arrays[index + count][0].element
                ) {
                  if (arrays[index + count][0].specialIndices == []) {
                  } else {
                    specialIndices.push({
                      step: index + count,
                      specialIndicesArr:
                        arrays[index + count][0].specialIndices,
                      swap: arrays[index + count][0].swap,
                    });
                  }
                  count++;
                }
                return (
                  <ArrayVis
                    array={arr.map((val) => val.value)}
                    specialIndices={specialIndices}
                    step={step}
                  ></ArrayVis>
                );
              }
            })}
          </div>
          <div className="DisplayButtons">
            <button id="previousArrayButton" onClick={() => prevStepfn()}>
              Previous Step
            </button>
            <button id="nextArrayButton" onClick={() => nextStepfn()}>
              Next Step
            </button>
            <button
              id="changeOneLineButton"
              onClick={() => {
                changeOneLine(true);
              }}
            >
              Only View Line at a time
            </button>
          </div>
        </div>
      </>
    );
  }
}
