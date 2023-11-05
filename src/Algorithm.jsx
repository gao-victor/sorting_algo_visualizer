import { ArrayVis } from "./ArrayVis.jsx";
import { Display } from "./Display.jsx";

export function Algorithm({ id, initialArray, compute }) {
  let isRecursion;

  let recurAlgos = {
    bubbleSort: false,
    selectionSort: false,
    mergeSort: true,
  };

  if (recurAlgos[id]) {
    isRecursion = true;
  } else {
    isRecursion = false;
  }

  const sortingAlgorithms = {
    nothing: () => {},
    selectionSort: selectionSort,
    bubbleSort: bubbleSort,
    mergeSort: mergeSort,
  };

  const descriptions = {
    bubbleSort:
      "The idea behind bubble sort is that we will iterate through the array n-times (n:= size of the array) and each iteration gets us the ith largest element in its correct place (i:= iteration we're currently on) by having it trickle down the array. We do this by iterating from index 0 to index n-i and if there's ever an element that's smaller than the element to its right, we swap the two. BubbleSort is one of the simplest sorting algorithms and likewise computationally intensive o(n^2)",
    selectionSort:
      "Selection sort is a very simple and intuitive sorting algorithm as all we're doing is iterating through the array n-times (n:= size of the array) and each time, we find the ith smallest value and place it at index i-1 (i := the iteration we're currently on). For example the first time we iterate through the array, we are trying to find the first smallest element (or the smallest element); once we do, we put it at index 0 (1-1). Then we move on to the second smallest element by iterating through the other n-1 elements and once we find it we will place it at index 1 (2-1). Because selectionSort is so simple and we constantly have to iterate through the elements to find the ith smallest value (even if it is already at its proper index), it is very computationally expensive o(n^2)",
  };

  function appending(i) {
    switch (i) {
      case 1: {
        return "st";
      }
      case 2: {
        return "nd";
      }
      case 3: {
        return "rd";
      }
      default: {
        return "th";
      }
    }
  }
  //pass in "array" to algorithms so initial array is unaffected
  let array = initialArray.map((val) => {
    let element = { element: true, value: val };
    return element;
  });
  const newArrays = [];

  newArrays.push([...array]);

  function selectionSort(array) {
    for (let i = 0; i < array.length; i++) {
      let arrayPrev = array.map((val) => val.value);
      //temporary greatest value;
      let temp = array[i].value;
      let index = i;
      //search for minimum
      for (let j = i; j < array.length; j++) {
        if (j == i) {
          continue;
        }
        if (array[j].value < temp) {
          temp = array[j].value;
          index = j;
        }
      }
      //swap them if there's a smaller value in the ith index
      if (temp != array[i].value) {
        array[index] = array[i];
        array[i] = { element: true, value: temp };
      }
      let arrayChange = array.map((val) => val.value);
      if (arrayPrev.toString() != arrayChange.toString()) {
        newArrays.push([
          {
            element: false,
            value: `Since we're looking for the ${i + 1}${appending(
              i + 1
            )} smallest number, which is ${
              arrayPrev[index]
            } at index ${index}, we swap elements ${array[i].value} and ${
              array[index].value
            }, or indices ${index} and ${i}`,
            specialIndices: [i, index],
            swap: true,
          },
        ]);
      } else {
        newArrays.push([
          {
            element: false,
            value: `Since index ${i} has the correct value, we leave it as is`,
            specialIndices: [i],
            swap: false,
          },
        ]);
      }
      newArrays.push(
        arrayChange.map((val) => {
          let element = { element: true, value: val };
          return element;
        })
      );
    }
    newArrays.push([
      {
        element: false,
        value: "Now we're done! Array is sorted",
        specialIndices: [],
        swap: false,
      },
    ]);
  }

  function bubbleSort(array) {
    for (let i = 0; i < array.length; i++) {
      newArrays.push([
        {
          element: false,
          value: `Now checking the first ${array.length - i} numbers for swaps`,
          specialIndices: [
            ...array
              .filter((val, index) => index < array.length - i)
              .map((val, index) => index),
          ],
          swap: false,
        },
      ]);
      const prevArray = array.map((val) => val.value);
      for (let j = 0; j < array.length - i - 1; j++) {
        if (array[j].value > array[j + 1].value) {
          const tmp = array[j + 1].value;
          array[j + 1] = array[j];
          array[j] = { element: true, value: tmp };
          //push the swapped change
          newArrays.push([
            {
              element: false,
              value: `Since index ${j} is greater than the element to its right, we swap them`,
              specialIndices: [j, j + 1],
              swap: true,
            },
          ]);
          newArrays.push(array.map((val) => val));
        } else {
          newArrays.push([
            {
              element: false,
              value: `Index ${j} is smaller than the element to its right so we don't do anything`,
              specialIndices: [j],
              swap: false,
            },
          ]);
        }
      }
      //if a change has happened
      if (prevArray.toString() != array.map((val) => val.value).toString()) {
        newArrays.push([
          {
            element: false,
            value: `We now have the ${i + 1}${appending(
              i + 1
            )} largest value at index ${array.length - i - 1} `,
            specialIndices: [array.length - i - 1],
            swap: false,
          },
        ]);
      } else {
        //no change has happened so the array's already sorted
        break;
      }
    }
    newArrays.push([
      {
        element: false,
        value: "Now we're done!",
        specialIndices: [],
        swap: false,
      },
    ]);
  }

  function mergeSortRecur(arr1, arr2) {
    let array1 = [...arr1];
    let array2 = [...arr2];
    let arr1c,
      arr2c = 0;
    let sortedArr = [];
    while (arr1 < arr1.length && arr2 < arr2.length) {
      if (arr1[arr1c] >= arr2[arr2c]) {
        sortedArr.push(arr2[arr2c]);
        arr2c++;
      } else {
        sortedArr.push(arr1[arr1c]);
        arr1c++;
      }
    }
    if (arr1c == arr1.length) {
      sortedArr = [...sortedArr, ...arr2];
    } else {
      sortedArr = [...sortedArr, ...arr2];
    }
    newArrays.push(sortedArr);
    return sortedArr;
  }

  function mergeSort(array) {
    if (array.length == 1) {
      return array;
    }
  }

  sortingAlgorithms[id](array);

  //if no operation has been specified, return nothing
  if (!compute) {
    return;
  } else {
    return (
      <>
        <h3>Here's how {id} works!</h3>
        <p>{descriptions[id]}</p>
        <Display
          arrays={newArrays}
          algorithm={id}
          isRecursion={isRecursion}
        ></Display>
      </>
    );
  }
}
