"use client";
import React, {useState} from 'react';

export default function SortingVisualizer() {

  const [array, setArray] = useState(Array.from({ length: 100 }, () => Math.floor(Math.random() * 1001 + 10)));

  function resetArray() {
    setArray(Array.from({ length: 100 }, () => Math.floor(Math.random() * 1001 + 10)));
  }

  return (
    <main>
      <button className="font-bold" onClick={resetArray}> reset </button>
        {array.map((value, idx) => (
          <div className="" key={idx}>{value}</div>
        ))}
        
    </main>
  );

}


  
