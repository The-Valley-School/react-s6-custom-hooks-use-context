# VIDEO 02 - Custom Hook con fetch

En esta sesión veremos como encapsular la lógica de fetch dentro de un cusotm hook y usarlo en aquellos sitios que nos sea necesario.

Nuestro nuevo custom hook (useFetch.js) queda de la siguiente manera:

```jsx
import React from "react";

const useFetch = (apiUrl) => {

  const [info, setInfo] = React.useState(null);

  // Se ejecuta una vez a la creación del componente
  React.useEffect(() => {

    fetch(apiUrl)
      .then(data => data.json())
      .then(dataParsed => setInfo(dataParsed));

  }, [apiUrl]);

  return [info];
}

export default useFetch;
```

Y por otro lado tendremos nuestro componente PokemonInfo.js:

```jsx
import React from "react";
import useFetch from "../hooks/useFetch";

const PokemonInfo = () => {

  const API_URL = "https://pokeapi.co/api/v2/pokemon/pikachu";

  const [info] = useFetch(API_URL);

  return (
    <div>
      <p>Información de Pikachu:</p>

      {info ?
        <div>
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

Y nuestro componente StarwarsInfo.js:

```jsx
import React from "react";
import useFetch from "../hooks/useFetch";

const StarwarsInfo = () => {

  const API_URL = "https://swapi.dev/api/people/1";

  const [info] = useFetch(API_URL);

  return (
    <div>
      <p>Información de Luke Skywalker:</p>

      {info ?
        <div>
          <p>Nombre: {info.name}</p>
          <p>Altura: {info.height}</p>
          <p>Peso: {info.mass}</p>
          <p>Color de ojos: {info.eye_color}</p>
          <p>Color de pelo: {info.hair_color}</p>
        </div>
        : <p>Cargando...</p>
      }

    </div>
  );
}

export default StarwarsInfo;
```

Para poder hacer uso de nuestros nuevos componentes, recuerda pintarlos en el App.js

```jsx
import './App.css';
import PokemonInfo from './components/PokemonInfo';
import StarwarsInfo from './components/StarWarsInfo';
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
      <button onClick={secondHandleIncrement}>Aumentar</button>+

      <h2>Peticiones a la API</h2>
    
      <PokemonInfo></PokemonInfo>
      <StarwarsInfo></StarwarsInfo>
    </div>
  );
}

export default App;
```
