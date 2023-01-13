import './App.css';
import ApisInfoGroup from './components/ApisInfoGroup';
import useCounter from './hooks/useCounter';
import React from 'react';

// Contextos
export const ThemeContext = React.createContext();

const themes = {
  light: {
    name: "Light",
    background: "#FFF",
    fontColor: "#000",
  },
  dark: {
    name: "Dark",
    background: "#000",
    fontColor: "#FFF",
  }
}

function App() {

  const [counter, handleIncrement, handleDecrement] = useCounter(25);
  const [secondCounter, secondHandleIncrement, secongHandleDecrement] = useCounter(70);

  // Estados
  const [themeState, setThemeState] = React.useState(themes.dark);

  return (
    <div className="App">
      <h2>Temas (contextos)</h2>
      <p>Tema actual: {themeState.name}</p>
      <button onClick={() => setThemeState(themeState === themes.light ? themes.dark : themes.light)}>Cambiar tema</button>


      <h2>Contador 1:</h2>

      <p>Valor actual: {counter}</p>
      <button onClick={handleDecrement}>Decrementar</button>
      <button onClick={handleIncrement}>Aumentar</button>

      <h2>Contador 2:</h2>

      <p>Valor actual: {secondCounter}</p>
      <button onClick={secongHandleDecrement}>Decrementar</button>
      <button onClick={secondHandleIncrement}>Aumentar</button>

      <h2>Peticiones a la API</h2>

      <ThemeContext.Provider value={themeState}>
        <ApisInfoGroup></ApisInfoGroup>
      </ThemeContext.Provider>


    </div>
  );
}

export default App;
