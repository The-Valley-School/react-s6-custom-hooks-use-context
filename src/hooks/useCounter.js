import React from "react";

const useCounter = (initialCount = 0) => {

  const [counter, setCounter] = React.useState(initialCount);

  const handleIncrement = () => {
    let newValue = counter + 1;
    newValue = newValue > 100 ? 100 : newValue;
    setCounter(newValue);
  }

  const handleDecrement = () => {
    let newValue = counter - 1;
    newValue = newValue < 0 ? 0 : newValue;
    setCounter(newValue);
  }


  // Retornamos funcionalidades
  return [counter, handleIncrement, handleDecrement];
}

export default useCounter;