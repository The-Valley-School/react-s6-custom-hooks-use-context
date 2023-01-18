# VIDEO 01 - Custom Hook conceptos y ejemplo contador

En esta sesión vamos a hablar de los Custom Hooks:

[https://es.reactjs.org/docs/hooks-reference.html#usememo](https://es.reactjs.org/docs/hooks-custom.html) 

Los custom hooks en React son funciones de JavaScript que permiten reutilizar el código de estado y efectos en componentes de React. Los hooks deben comenzar con "use" y pueden ser creados por el desarrollador para encapsular lógica específica que se utiliza en varios componentes. Los componentes pueden llamar a estos hooks para acceder a la lógica encapsulada y actualizar su estado y efectos de manera apropiada. 

Para demostrar cómo se usan en este vídeo hemos llevado a cabo un ejemplo en el que hacemos dos contadores haciendo uso de un único custom hook.

Nuestro componente App.js queda de la siguiente manera:

```jsx
import './App.css';
import useCounter from './hooks/useCounter';

function App() {

  const [counter, handleIncrement, handleDecrement] = useCounter(25);
  const [secondCounter, secondHandleIncrement, secongHandleDecrement] = useCounter(70);

  return (
    <div className="App">
      <h2>Contador 1:</h2>

      <p>Valor actual: { counter }</p>
      <button onClick={handleDecrement}>Decrementar</button>
      <button onClick={handleIncrement}>Aumentar</button>

      <h2>Contador 2:</h2>

      <p>Valor actual: { secondCounter }</p>
      <button onClick={secongHandleDecrement}>Decrementar</button>
      <button onClick={secondHandleIncrement}>Aumentar</button>
    </div>
  );
}

export default App;
```

Y nuestro custom hook (useCounter.js) queda de la siguiente manera:

```jsx
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
```
