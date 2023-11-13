"use client";
import React, { useState, useEffect } from "react";

export default function SortingVisualizer() {
  const [array, setArray] = useState([]);

  // Creating a random array when page loads for first time
  useEffect(() => {
    resetArray();
  }, []);

  // Function to generate new array values
  function resetArray() {
    const array = [];
    for (let i = 0; i < 100; i++) {
      array.push(Math.floor(Math.random() * 500) + 5);
    }
    setArray(array);
  }

  // ------------------------------------------------SORTING ALGORITHMS------------------------------------------------ //

  // Selection Sort
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

  // Bubble Sort
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

  // Insertion Sort
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

  // Merge Sort
  async function mergeSort(arr, left, right) {
    if (left < right) {
      const middle = Math.floor((left + right) / 2);
      await mergeSort(arr, left, middle);
      await mergeSort(arr, middle + 1, right);

      // Visualize the merge
      setArray([...arr]);

      // Wait for some time before next iteration
      await new Promise((resolve) => setTimeout(resolve, 50));

      await merge(arr, left, middle, right);
    }
  }

  async function merge(arr, left, middle, right) {
    const n1 = middle - left + 1;
    const n2 = right - middle;

    const L = [];
    const R = [];

    for (let i = 0; i < n1; i++) {
      L[i] = arr[left + i];
    }
    for (let j = 0; j < n2; j++) {
      R[j] = arr[middle + 1 + j];
    }

    let i = 0;
    let j = 0;
    let k = left;

    while (i < n1 && j < n2) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
    }

    while (i < n1) {
      arr[k] = L[i];
      i++;
      k++;
    }

    while (j < n2) {
      arr[k] = R[j];
      j++;
      k++;
    }
  }

  // Quick Sort
  async function quickSort(arr, low, high) {
    if (low < high) {
      const pi = await partition(arr, low, high);

      // Visualize the partition
      setArray([...arr]);

      // Wait for some time before next iteration
      await new Promise((resolve) => setTimeout(resolve, 50));

      await quickSort(arr, low, pi - 1);
      await quickSort(arr, pi + 1, high);
    }
  }

  async function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
      if (arr[j] < pivot) {
        i++;
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;

        // Visualize the swap
        setArray([...arr]);

        // Wait for some time before next iteration
        await new Promise((resolve) => setTimeout(resolve, 50));
      }
    }

    const temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;

    return i + 1;
  }

  // Heap Sort
  async function heapSort(arr) {
    const n = arr.length;

    // Build heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
      await heapify(arr, n, i);
    }

    // One by one extract an element from heap
    for (let i = n - 1; i >= 0; i--) {
      // Move current root to end
      const temp = arr[0];
      arr[0] = arr[i];
      arr[i] = temp;

      // call max heapify on the reduced heap
      await heapify(arr, i, 0);

      // Visualize the sorting
      setArray([...arr]);

      // Wait for some time before next iteration
      await new Promise((resolve) => setTimeout(resolve, 50));
    }
  }

  async function heapify(arr, n, i) {
    let largest = i; // Initialize largest as root
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    // If left child is larger than root
    if (left < n && arr[left] > arr[largest]) {
      largest = left;
    }

    // If right child is larger than largest so far
    if (right < n && arr[right] > arr[largest]) {
      largest = right;
    }

    // If largest is not root
    if (largest !== i) {
      const swap = arr[i];
      arr[i] = arr[largest];
      arr[largest] = swap;

      // Recursively heapify the affected sub-tree
      await heapify(arr, n, largest);
    }
  }

  // ------------------------------------------------RENDERING ARRAY------------------------------------------------ //
  return (
    <>
      {/* Navbar */}
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
        <button
          className="font-bold"
          onClick={() => quickSort(array, 0, array.length - 1)}
        >
          quick Sort
        </button>
        <button
          className="font-bold"
          onClick={() => mergeSort(array, 0, array.length - 1)}
        >
          merge Sort
        </button>

        <button className="font-bold" onClick={() => heapSort(array)}>
          Heap Sort
        </button>
      </div>

      {/* Array Bars */}

      <div className="flex justify-between items-end px-2">
        {array.map((value, idx) => (
          <div
            className="w-1.5 bg-cyan-600 mx-px"
            style={{ height: `${value}px` }}
            key={idx}
          ></div>
        ))}
      </div>
    </>
  );
}
