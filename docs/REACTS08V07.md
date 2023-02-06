# VIDEO 07 - Ejercicio: Aplicar UseContext, CustomHooks y React.Lazy/React.Suspense

En este video te explicamos el ejercicio que debes hacer en esta sesión. 

En resumen, deberás replicar el código que hemos visto durante la sesión y aplicarle algunas modificaciones.

Estos son los pasos que debes seguir:

1. Crear un proyecto replicando el código que hemos ido viendo en los vídeos. Tienes fragmentos de todos los componentes. Te aconsejamos que intentes escribir tú mismo el código en vez de copiar y pegar.
2. Lleva los dos contadores a un componente nuevo Counter.js (ahora están sueltos dentro del App.js)
3. Utilizar el contexto de temas (ThemeContext) dentro de todos los componentes de manera que todos cambien de color cuando se cambie el tema. Los componentes que deberán hacer uso del ThemeContext son:
    1. Login.js
    2. LongText.js
    3. Counter.js
    4. StarwarsInfo.js (ya lo tenía implementado)
    5. PokemonInfo.js (ya lo tenía implementado)
    6. ApisInfoGroup NO HACE FALTA, ya que sus hijos (StarwarsInfo y PokemonInfo) ya hacen uso de los temas
4. Utilizar el contexto de login (LoginContext) dentro de todos los componentes, de manera que si el usuario no está logado, no podrá ver el contenido del componente. Los únicos componentes que podrán verse sin que el usuario esté logado son:
    1. Login (necesitaremos poder logarnos de alguna manera 😛)
    2. Botón de cambio de tema (esto está en App.js)

Nuestra aplicación deberá quedar tal que así cuando el usuario no esté logado y esté en modo oscuro:

![ejercicio 6 dark.png](/docs/assets/ejercicio_6_dark.png)

Y así en caso de que esté en modo light:

![ejercicio 6 light.png](/docs/assets/ejercicio_6_light.png)

**MUY IMPORTANTE:**

Recuerda que para que un componente pueda hacer uso de un contexto, ese componente debe estar envuelto por un Provider, por ejemplo para el contexto de Login hemos envuelto todo el contenido que hay dentro de App.js

Más o menos Algo así:

```jsx
<LoginContext.Provider value={loginProviderValue}>
	...
	<Login></Login>
	...
	<ApisInfoGroup></ApisInfoGroup>
  ...
</LoginContext.Provider>
```

De esta manera todos los componentes que estén dentro del LoginContext.Provider podrán consumir el LoginContext.