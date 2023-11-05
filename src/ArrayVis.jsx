import { useEffect, useState } from "react";
import "./App.css";

export function ArrayVis({ array, specialIndices, step }) {
  //if this array contains special indices for the step we're on, highlight them

  useEffect(() => {
    if (
      specialIndices != [] &&
      specialIndices.some((obj) => obj.step == step) 
    ) {
      const currSpecialIndices = [
        ...specialIndices.filter((obj) => obj.step == step)[0]
          .specialIndicesArr,
      ];
      if (currSpecialIndices.length === 2 && specialIndices.filter(obj => obj.step == step)[0].swap) {
        const specialElems = document.querySelectorAll(".SpecialElement");
        const [firstElem, secondElem] = specialElems;
        if (firstElem && secondElem) {
          const firstElemRect = firstElem.getBoundingClientRect();
          const secondElemRect = secondElem.getBoundingClientRect();

          const xTranslation = secondElemRect.left - firstElemRect.left;
          const yTranslation = 50;

          // Dynamically create the transient swap animations
          const styleElem = document.head.appendChild(
            document.createElement("style")
          );
          styleElem.innerHTML = `
            @keyframes transientSwapFirstToSecond {
              50%{
                transform: translate(${xTranslation/2}px, ${-yTranslation}px);
              }
              100% {
                transform: translate(${xTranslation}px);
              }
              
            }
            @keyframes transientSwapSecondToFirst {
              50%{
                transform: translate(${-xTranslation/2}px, ${yTranslation}px);
              }
              100% {
                transform: translate(${-xTranslation}px);
              }
              
            }
          `;
          firstElem.style.animation =
            "transientSwapFirstToSecond 1.5s ease-in-out forwards ";
            secondElem.style.animation =
            "transientSwapSecondToFirst 1.5s ease-in-out forwards ";

          // Cleanup function
          return () => {
            if (firstElem) {
              firstElem.style.animation = "";
            }
            if (secondElem) {
              secondElem.style.animation = "";
            }
            if (styleElem && styleElem.parentNode) {
              styleElem.parentNode.removeChild(styleElem);
            }
          };
        }
      }
    }
  }, [specialIndices, step]);

  if (specialIndices != [] && specialIndices.some((obj) => obj.step == step)) {
    const currSpecialIndices = [
      ...specialIndices.filter((obj) => obj.step == step)[0].specialIndicesArr,
    ];
    return (
      <>
        <div className="ArrayVis">
          {array.map((val, index) => {
            if (currSpecialIndices.includes(index)) {
              return (
                <div className={"ArrayVisElement SpecialElement"}>
                  <button id={`${index + 1}th_value`} value={val.value}>
                    {val}
                  </button>
                </div>
              );
            } else {
              return (
                <div className="ArrayVisElement">
                  <button id={`${index + 1}th_value`} value={val.value}>
                    {val}
                  </button>
                </div>
              );
            }
          })}
        </div>
        <div className="ArrayVisLabels">
          {array.map((val, index) => {
            return <label htmlFor={`${index + 1}th_value`}>{index}</label>;
          })}
        </div>
      </>
    );
  } else
    return (
      <>
        <div className="ArrayVis">
          {array.map((val, index) => {
            return (
              <div className="ArrayVisElement">
                <button id={`${index + 1}th_value`} value={val.value}>
                  {val}
                </button>
              </div>
            );
          })}
        </div>
        <div className="ArrayVisLabels">
          {array.map((val, index) => {
            return <label htmlFor={`${index + 1}th_value`}>{index}</label>;
          })}
        </div>
      </>
    );
}
