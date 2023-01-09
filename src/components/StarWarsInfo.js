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
