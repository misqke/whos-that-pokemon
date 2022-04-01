import React, { useState, useEffect, useRef } from "react";
import styles from "../styles/InputBox.module.scss";

const InputBox = ({ question, names, submit }) => {
  const [input, setInput] = useState("");
  const inputRef = useRef();
  const btnRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.length === 0) {
      return;
    }
    submit(input);
    btnRef.current.classList.add(styles.disabled);
    if (input.toLowerCase() !== question.answer.name.toLowerCase()) {
      inputRef.current.classList.add(styles.wrong);
    }
  };

  useEffect(() => {
    setInput("");
    inputRef.current.focus();
    inputRef.current.classList.remove(styles.wrong);
    btnRef.current.classList.remove(styles.disabled);
  }, [question]);

  return (
    <form onSubmit={handleSubmit} className={styles.container}>
      <input
        ref={inputRef}
        className={styles.input}
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button ref={btnRef} className={styles.btn} type="submit">
        Submit
      </button>
    </form>
  );
};

export default InputBox;
