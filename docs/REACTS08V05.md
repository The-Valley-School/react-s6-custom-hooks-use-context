# VIDEO 05 - React.Lazy y React.Suspense: Ejemplo básico

En este vídeo aprenderemos a usar React.Lazy y React.Suspense:

[https://reactjs.org/docs/code-splitting.html](https://reactjs.org/docs/code-splitting.html) 

React.lazy y React.suspense son características de React que se utilizan para cargar componentes de forma dinámica en lugar de cargarlos todos al principio.

React.lazy permite cargar componentes de forma dinámica mediante una función import() soportada por JavaScript. Esto significa que un componente específico solo se cargará cuando se necesite, en lugar de cargarse en el momento en que se carga la página.

React.suspense es un componente que se puede utilizar para especificar cómo se manejará la carga mientras se espera a que un componente dinámico se cargue. Por ejemplo, se puede mostrar un spinner o un mensaje de carga mientras se espera a que el componente dinámico se cargue.

Juntos, React.lazy y React.suspense permiten una mejor gestión de la carga y una mejor experiencia del usuario en aplicaciones React de gran tamaño o con componentes que solo se utilizan en ciertas partes de la aplicación.

En este video hemos creado un componente pesado **LongTest.js** que quedaría así:

```jsx
const LongText = () => {
  return (<>
    <p>{loremIpsumText[0]}</p>
  </>);
}

export default LongText;

// Ejemplo para demostrar qué pasa con componentes pesados
const loremIpsumText = [
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper mattis elit, at eleifend neque faucibus sed. Vestibulum consequat ligula sed dapibus vulputate. Sed facilisis molestie velit eget sollicitudin. Aenean maximus vel nisi ut imperdiet. In condimentum metus nec vehicula feugiat. Praesent sollicitudin, lectus vitae pulvinar condimentum, tellus ipsum pharetra arcu, eget eleifend nisi tortor id lacus. Vivamus porta mi non dignissim vulputate. Duis condimentum, dui eget consequat ultricies, est massa tincidunt dolor, ut laoreet odio ex quis ex.", "Pellentesque neque diam, malesuada et vestibulum nec, mollis ac lacus. Proin pretium sapien nec ipsum commodo dictum. Integer odio erat, bibendum at velit non, sodales pharetra nulla. Duis nibh massa, aliquet in convallis venenatis, efficitur nec libero. Cras ut varius libero, at pulvinar arcu. Morbi mollis urna auctor ligula faucibus, et placerat libero commodo. Praesent feugiat sagittis justo a elementum. Sed aliquet urna dui, vel molestie arcu semper ac. Praesent sit amet elementum dui, at suscipit ante.", "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis ullamcorper mattis elit, at eleifend neque faucibus sed. Vestibulum consequat ligula sed dapibus vulputate. Sed facilisis molestie velit eget sollicitudin. Aenean maximus vel nisi ut imperdiet. In condimentum metus nec vehicula feugiat. Praesent sollicitudin, lectus vitae pulvinar condimentum, tellus ipsum pharetra arcu, eget eleifend nisi tortor id lacus. Vivamus porta mi non dignissim vulputate. Duis condimentum, dui eget consequat ultricies, est massa tincidunt dolor, ut laoreet odio ex quis ex.", "Pellentesque neque diam, malesuada et vestibulum nec, mollis ac lacus. Proin pretium sapien nec ipsum commodo dictum. Integer odio erat, bibendum at velit non, sodales pharetra nulla. Duis nibh massa, aliquet in convallis venenatis, efficitur nec libero. Cras ut varius libero, at pulvinar arcu. Morbi mollis urna auctor ligula faucibus, et placerat libero commodo. Praesent feugiat sagittis justo a elementum. Sed aliquet urna dui, vel molestie arcu semper ac. Praesent sit amet elementum dui, at suscipit ante.",
];
```

(No hemos copiado todos los textos del array loremIpsumText para que no quede demasiado grande el snippet)

Y dentro de nuestro App.js hemos importado dinámicamente LongText.js:

```jsx
import './App.css';
import ApisInfoGroup from './components/ApisInfoGroup';
import useCounter from './hooks/useCounter';
import React from 'react';
import Login from './components/Login/Login';

// Antiguo import previo a usar lazy
// import LongText from './components/LongText/LongText';

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

// Componentes dinámicos
const LongTextLazy = React.lazy(() => import('./components/LongText/LongText'));

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

        <h2>Componente lazy:</h2>
        <React.Suspense fallback={<div>Cargando...</div>}>
          <LongTextLazy></LongTextLazy>
        </React.Suspense>

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
