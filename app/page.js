"use client";
import React, {useState, useEffect} from 'react';

export default function SortingVisualizer() {

  const [array, setArray] = useState([]);

  useEffect(() => {
    setArray(Array.from({ length: 100 }, () => Math.floor(Math.random() * 1001 + 10)));
  }, []);
  
  function resetArray() {
    setArray(Array.from({ length: 100 }, () => Math.floor(Math.random() * 1001 + 10)));
  }


  return (
    <>
      <button className="font-bold" onClick={resetArray}> reset </button>

      {array.map((value, idx) => (
          <div className="" key = {idx}>
            {value}
          </div>
        ))}
        
    </>
  );

}


  
