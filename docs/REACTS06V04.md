# VIDEO 04 - UseContext: Ejemplo con Login

En este vídeo seguiremos practicando con UseContext. Ahora lo usaremos para mantener un login dentro de nuestra aplicación y poder comunicarlo a todos los componentes que queramos.

Nuestro componente App.js quedará de la siguiente manera:

```jsx
import './App.css';
import ApisInfoGroup from './components/ApisInfoGroup';
import useCounter from './hooks/useCounter';
import React from 'react';
import Login from './components/Login/Login';

// Contextos
export const ThemeContext = React.createContext();
export const LoginContext = React.createContext();

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
  const [userState, setUserState] = React.useState();

  const updateUserInfo = (username) => {
    setUserState(username);
  }

  const loginProviderValue = {
    currentUsername: userState,
    updateUserInfo: updateUserInfo,
  }

  return (
    <LoginContext.Provider value={loginProviderValue}>
      <div className="App">
        <h2>Login:</h2>

        <Login></Login>

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
    </LoginContext.Provider>
  );
}

export default App;
```

Nuestro componente Login.js:

```jsx
import React from "react";
import "./Login.css";
import { LoginContext } from "../../App";

const Login = () => {
  const login = React.useContext(LoginContext);

  // Referencias 
  const usernameRef = React.useRef();
  const passwordRef = React.useRef();

  // Estado
  const [error, setError] = React.useState();

  const doLogin = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const username = usernameRef.current.value;
    const password = passwordRef.current.value;

    if (username === "admin") {
      if (password === "1234") {
        setError(null);
        login.updateUserInfo(username);
      } else {
        setError("Contraseña incorrecta");
      }
    } else {
      setError("Usuario inexistente");
    }
  }

  return <>
    <p>Usuario: {login.currentUsername}</p>

    {login.currentUsername ?
      <button onClick={() => login.updateUserInfo(null)}>Logout</button> :

      <form onSubmit={doLogin}>
        <p><input ref={usernameRef} placeholder="Nombre de usuario" type="text" /></p>
        <p><input ref={passwordRef} placeholder="Contraseña" type="password" /></p>

        <button>Login</button>

        <p className="error">{error}</p>
      </form>

    }
  </>
}

export default Login;
```

Y por último te dejamos el componente StarswarsInfo.js que hará uso del LoginContext:

```jsx
import React from "react";
import useFetch from "../hooks/useFetch";
import { ThemeContext } from "../App";
import { LoginContext } from "../App";

const StarwarsInfo = () => {

  const login = React.useContext(LoginContext);

  const API_URL = "https://swapi.dev/api/people/1";

  const [info] = useFetch(API_URL);

  const theme = React.useContext(ThemeContext);

  return (
    <div style={{ background: theme.background, color: theme.fontColor }}>
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

      <h3>Usuario: {login.currentUsername}</h3>

    </div>
  );
}

export default StarwarsInfo;
```
