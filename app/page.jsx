"use client";
import React, { useState, useEffect } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(
      Array.from({ length: 150 }, () => Math.floor(Math.random() * 700 + 5))
    );
  }, []);

  function resetArray() {
    setArray(
      Array.from({ length: 150 }, () => Math.floor(Math.random() * 700 + 5))
    );
  }

  function selectionSort(arr) { 
    let n = arr.length;
        
    for(let i = 0; i < n; i++) {
        let min = i;
        // Finding idx of smallest value
        for(let j = i+1; j < n; j++){
            if(arr[j] < arr[min]) {
                min=j; 
            }
        }
        if (min != i) {
            // Swapping
            let tmp = arr[i]; 
            arr[i] = arr[min];
            arr[min] = tmp;      
        }
    }
    return arr;
  }

  function bubbleSort(arr) { 

  }

  function mergeSort(arr) { 

  }

  function quickSort(arr) { 

  }

  function selectionSortCall() { 
    setArray(prevArray => selectionSort([...prevArray]))
  }

  return (
    <>
      <div className="flex justify-between mx-40 my-5">
      <button className="font-bold" onClick={resetArray}>
        reset
      </button>
      <button className="font-bold" onClick={selectionSortCall}>
        selection sort
      </button>
      <button className="font-bold" onClick={bubbleSort}>
        bubble sort
      </button>
      <button className="font-bold" onClick={mergeSort}>
        merge sort
      </button>
      <button className="font-bold" onClick={quickSort}>
        quick sort
      </button>
      </div>

      <div className="flex justify-between px-2">
        {array.map((value, idx) => (
          <div
            className="w-1.5 bg-cyan-600 mx-px"
            key={idx}
            style={{ height: `${value}px` }}
          >

          </div>
        ))}
      </div>
    </>
  );
}
