import React, { useState, useEffect, useRef } from "react";

const Game = ({ min, max }) => {
  let [usedNums, setUsedNums] = useState([]);
  let [pokemon, setPokemon] = useState(null);
  let [message, setMessage] = useState("");
  let [submission, setSubmission] = useState("");
  const nextBtn = useRef();
  const answerRow = useRef();
  const title = useRef();
  const pokemonImage = useRef();
  const playAgain = useRef();
  const answerInput = useRef();
  const playAgainBtn = useRef();

  const getPokemon = async () => {
    const res = await fetch("http://localhost:3000/api/getPokemon", {
      method: "POST",
      body: JSON.stringify({ min, max, used: usedNums }),
    });
    const data = await res.json();
    if (data.message) {
      setMessage(data.message);
    } else {
      setPokemon(data.pokemon);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    title.current.innerText = `Its ${pokemon.name}!`;
    pokemonImage.current.classList.remove("shadow");
    if (submission.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setUsedNums((prev) => [...prev, pokemon.number]);
      answerRow.current.classList.add("hidden");
      nextBtn.current.classList.remove("hidden");
      nextBtn.current.focus();
    } else {
      answerRow.current.classList.add("hidden");
      playAgain.current.classList.remove("hidden");
      playAgainBtn.current.focus();
      setMessage("Game Over!");
    }
  };

  const handleNext = async () => {
    pokemonImage.current.classList.add("shadow");
    setSubmission("");
    title.current.innerText = `Who's that Pokemon?`;
    answerRow.current.classList.remove("hidden");
    nextBtn.current.classList.add("hidden");
    await getPokemon();
    answerInput.current.focus();
  };

  const handleNewGame = () => {
    setUsedNums([]);
    setMessage("");
    playAgain.current.classList.add("hidden");
    handleNext();
  };

  useEffect(() => {
    const startGame = async () => {
      getPokemon();
      answerInput.current.focus();
    };
    startGame();
  }, []);

  return (
    <div className="flexCol">
      <h1 ref={title} className="heading text-center">
        Who's that Pokemon?
      </h1>
      <div className="flexCol center">
        {pokemon === null ? (
          <div>Loading...</div>
        ) : (
          <img
            ref={pokemonImage}
            src={pokemon.image.large}
            className="shadow"
          />
        )}
      </div>
      <form
        ref={answerRow}
        className="flexRow"
        onSubmit={(e) => handleSubmit(e)}
      >
        <input
          className="grow"
          type="text"
          value={submission}
          ref={answerInput}
          onChange={(e) => setSubmission(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
      <button className="hidden" ref={nextBtn} onClick={() => handleNext()}>
        Next
      </button>
      <div className="flexCol center w-100 hidden" ref={playAgain}>
        <p className="text">{message}</p>
        <button
          ref={playAgainBtn}
          className="w-100"
          onClick={() => handleNewGame()}
        >
          Play Again?
        </button>
      </div>
    </div>
  );
};

export default Game;
