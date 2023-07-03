import React, { useState } from "react";

const Game = ({ min, max }) => {
  const [usedNums, setUsedNums] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [message, setMessage] = useState("");

  const getPokemon = async () => {
    console.log(usedNums);
    const res = await fetch("http://localhost:3000/api/getPokemon", {
      method: "POST",
      body: JSON.stringify({ min, max, used: usedNums }),
    });
    const data = await res.json();
    if (data.message) {
      setMessage(data.message);
    } else {
      setPokemon(data.pokemon);
      setUsedNums((prev) => [...prev, data.pokemon.number]);
    }
  };

  return (
    <div>
      {pokemon === null ? (
        <button onClick={() => getPokemon()}>Start</button>
      ) : message != "" ? (
        <p>{message}</p>
      ) : (
        <div>
          <img src={pokemon.image.small} />
          <h2>
            {pokemon.number} {pokemon.name}
          </h2>
          <button onClick={() => getPokemon()}>Next</button>
        </div>
      )}
    </div>
  );
};

export default Game;
