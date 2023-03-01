# VIDEO 03 - UseContext: Ejemplo con Themes

En este vídeo veremos UseContext:

<https://es.reactjs.org/docs/hooks-reference.html#usecontext>

**useContext** es un hook de React que permite acceder al valor de un contexto en un componente de React. Un contexto es una forma de proporcionar datos globales a través de la jerarquía de componentes de una aplicación sin tener que pasar props manualmente a través de varios niveles de componentes. 

**useContext** permite que un componente acceda directamente al valor de un contexto en lugar de tener que pasar props desde un componente padre. Esto puede ser útil para manejar datos o estados globales en una aplicación de React.

En este vídeo haremos uso de useContext para poder cambiar entre modo oscuro y light dentro de nuestra aplicación.

Nuestro componente App.js quedará así:

```jsx
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
```

Como habrás visto hemos creado un nuevo componente ApisInfoGroup para englobar los dos componentes:

```jsx
import PokemonInfo from "./PokemonInfo";
import StarwarsInfo from "./StarWarsInfo";

const ApisInfoGroup = () => {
  return <>
    <PokemonInfo></PokemonInfo>
    <StarwarsInfo></StarwarsInfo>
  </>
}

export default ApisInfoGroup;
```

Por otro lado nuestro componente PokemonInfo.js quedará así:

```jsx
import React from "react";
import useFetch from "../hooks/useFetch";
import { ThemeContext } from "../App";

const PokemonInfo = () => {

  const API_URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

  const [info] = useFetch(API_URL);

  const theme = React.useContext(ThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.fontColor }}>
      <p>Información de Pikachu:</p>

      {info ?
        <div>
          <p>Tema actual: {theme.name}</p>
          <p>Nombre: {info.name}</p>
          <p>Altura: {info.height}</p>
          <p>Peso: {info.weight}</p>
          <img alt="Imagen de pikachu" src={info.sprites.front_default} />
        </div>
        : <p>Cargando...</p>
      }

    </div>
  );
}

export default PokemonInfo;
```

El componente StarswarsInfo se ve afectado de igual manera, por lo que en vez de dejarte todo el código te indicamos los pasos a seguir:

Tendrás que importar el contexto:

```jsx
import { ThemeContext } from "../App";
```

Hacer uso de él:

```jsx
const theme = React.useContext(ThemeContext);
```

Y poner un div que cambie de estilos en base al theme:

```jsx
<div style={{ background: theme.background, color: theme.fontColor }}>
```
