# VIDEO 06 - React Lazy y React Suspense con IntersectionObserver

En este vídeo haremos un desarrollo que nos permitirá cargar unos componentes solo cuando sean visibles en pantalla, haciendo uso de la API del navegador IntersectionObserver:

[https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API](https://developer.mozilla.org/es/docs/Web/API/Intersection_Observer_API) 

El IntersectionObserver es una API de JavaScript que permite detectar cuando un elemento en una página web se cruza con el área visible del viewport (la ventana del navegador que se ve actualmente en pantalla).

Con esta API, puedes crear un observer y especificar los elementos que deseas monitorear, y luego establecer una función de devolución de llamada que se activará cada vez que uno de esos elementos se cruce con el área visible del viewport.

La API IntersectionObserver es útil para optimizar el rendimiento en una página web, ya que solo se activa cuando un elemento es visible para el usuario. Por ejemplo, puedes utilizarlo para cargar imágenes solo cuando se hacen visibles en pantalla, o para mostrar publicidad solo cuando un elemento se hace visible.

En nuestro caso lo hemos combinado con React.Lazy y React.Suspense para crear que nuestro componente ApisInfoGroup solo se pinte cuando sea visible. El componente queda así:

```jsx
import React from "react";
// import PokemonInfo from "./PokemonInfo";
// import StarwarsInfo from "./StarWarsInfo";

// Listado de componentes lazy
const PokemonInfoLazy = React.lazy(() => import("./PokemonInfo"));
const StarwarsInfoLazy = React.lazy(() => import("./StarWarsInfo"));

const ApisInfoGroup = () => {
  // Estados
  const [showComponents, setShowComponents] = React.useState(false);

  // Referencias
  const myRef = React.useRef(null);

  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((element) => {
        if (element.isIntersecting) {
          setShowComponents(true);
        }
      });
    });

    observer.observe(myRef.current);
  }, []);

  return <>

    <div ref={myRef} style={{ 'borderTop': '1px solid red' }}></div>

    {
      showComponents ?
        <React.Suspense fallback={<p>Cargando...</p>}>
          <PokemonInfoLazy></PokemonInfoLazy>
          <StarwarsInfoLazy></StarwarsInfoLazy>
        </React.Suspense> :
        <p>Componentes ocultos</p>
    }

  </>
}

export default ApisInfoGroup;
```
