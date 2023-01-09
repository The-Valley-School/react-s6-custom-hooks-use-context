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
