import React, { useState, useEffect, useRef } from "react";

const Game = ({ min, max }) => {
  let [usedNums, setUsedNums] = useState([]);
  let [pokemon, setPokemon] = useState(null);
  let [message, setMessage] = useState("");
  let [submission, setSubmission] = useState("");
  let [names, setNames] = useState([]);
  const nextBtn = useRef();
  const answerRow = useRef();
  const title = useRef();
  const pokemonImage = useRef();
  const answerInput = useRef();
  const playAgainBtn = useRef();
  const modal = useRef();

  const getPokemon = async () => {
    const res = await fetch("/api/getPokemon", {
      method: "POST",
      body: JSON.stringify({ min, max, used: usedNums }),
    });
    const data = await res.json();
    if (data.message) {
      setMessage(data.message);
    } else {
      setPokemon(data.pokemon);
      setTimeout(() => {
        pokemonImage.current.classList.remove("invis");
      }, 200);
    }
  };

  const getNames = async () => {
    const res = await fetch("/api/getNames", {
      method: "POST",
      body: JSON.stringify({ min, max }),
    });
    const data = await res.json();
    setNames(data);
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
      modal.current.showModal();
      playAgainBtn.current.focus();
      setMessage("Game Over!");
    }
  };

  const handleNext = async () => {
    pokemonImage.current.classList.add("shadow", "invis");
    setSubmission("");
    title.current.innerText = `Who's that Pokemon?`;
    answerRow.current.classList.remove("hidden");
    nextBtn.current.classList.add("hidden");
    await getPokemon();
    answerInput.current.focus();
  };

  const handleNewGame = () => {
    setUsedNums([]);
    modal.current.close();
    setMessage("");
    handleNext();
  };

  useEffect(() => {
    const startGame = async () => {
      getPokemon();
      getNames();
      answerInput.current.focus();
    };
    startGame();
  }, []);

  return (
    <div>
      <div className="flexCol">
        <h1 ref={title} className="heading text-center">
          Who's that Pokemon?
        </h1>
        <div className="flexCol center grow">
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
            list="namesList"
            value={submission}
            ref={answerInput}
            onChange={(e) => setSubmission(e.target.value)}
          />
          <datalist id="namesList">
            {names.map((n, i) => (
              <option value={n} key={n + i} />
            ))}
          </datalist>
          <button type="submit">Submit</button>
        </form>
        <button className="hidden" ref={nextBtn} onClick={() => handleNext()}>
          Next
        </button>
      </div>
      <dialog ref={modal}>
        <div className="flexCol center w-100 g-2">
          <h2 className="heading">{message}</h2>
          <p className="text">You got {usedNums.length} right!</p>
          <button
            ref={playAgainBtn}
            className="w-100"
            onClick={() => handleNewGame()}
          >
            Play Again?
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default Game;
