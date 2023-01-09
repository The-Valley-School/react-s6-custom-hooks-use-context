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
