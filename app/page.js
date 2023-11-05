"use client";
import React, { useState, useEffect } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    resetArray();
  }, []);

  function resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(array);
  }


  async function selectionSort() {
    const n = array.length;
    const sortedArr = [...array];
    for (let i = 0; i < n; i++) {
      let min = i;
      for (let j = i + 1; j < n; j++) {
        if (sortedArr[j] < sortedArr[min]) {
          min = j;
        }
      }
      if (min !== i) {
        // Swap elements
        let tmp = sortedArr[i];
        sortedArr[i] = sortedArr[min];
        sortedArr[min] = tmp;

        // Visualize the swap
        setArray([...sortedArr]);

        // Wait for some time before next iteration
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }
  }

  async function bubbleSort() {
    const n = array.length;
    const sortedArr = [...array];

    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {

        if (sortedArr[j] > sortedArr[j + 1]) {
          // Swap elements
          let tmp = sortedArr[j];
          sortedArr[j] = sortedArr[j + 1];
          sortedArr[j + 1] = tmp;

          // Visualize the swap
          setArray([...sortedArr]);

          // Wait for some time before next iteration
          await new Promise((resolve) => setTimeout(resolve, 25));
        }

      }
    }
  }

  async function insertionSort() {
    const n = array.length;
    const sortedArr = [...array];

    for (let i = 1; i < n; i++) {
      let key = sortedArr[i];
      let j = i - 1;

      // Move elements of sortedArr[0..i-1], that are greater than key, 
      // to one position ahead of their current position
      while (j >= 0 && sortedArr[j] > key) {
        sortedArr[j + 1] = sortedArr[j];
        j = j - 1;
      }
      sortedArr[j + 1] = key;

      // Visualize the sort
      setArray([...sortedArr]);

      // Wait for some time before next iteration
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }


    return (
      <>
        <div className="flex justify-between mx-40 my-5">
          <button className="font-bold" onClick={resetArray}>
            reset
          </button>
          <button className="font-bold" onClick={selectionSort}>
            selection sort
          </button>
          <button className="font-bold" onClick={bubbleSort}>
            bubble sort
          </button>
          <button className="font-bold" onClick={insertionSort}>
            insertion sort
          </button>
        </div>

        <div className="flex justify-between px-2">

          {array.map((value, idx) => (
            <div
              className="w-1.5 bg-violet-700 mx-px"
              style={{ height: `${value}px` }}
              key={idx}
            >
            </div>
          ))}


        </div>



      </>
    );
  }