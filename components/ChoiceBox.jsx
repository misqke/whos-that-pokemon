import React, { useEffect, useState, useRef } from "react";
import shuffleArray from "../util/shuffleArray";
import styles from "../styles/ChoiceBox.module.scss";

const ChoiceBox = ({ question, submit }) => {
  const [options, setOptions] = useState([]);
  const [answer, setAnswer] = useState("");
  const buttonsRef = useRef();

  const handleClick = (e) => {
    buttonsRef.current.classList.add(styles.answer);
    if (e.target.innerText !== answer) {
      e.target.classList.add(styles.wrong);
    }
    submit(e.target.innerText);
  };

  useEffect(() => {
    setAnswer(question.answer.name);
    const correct = question.answer.name;
    const choices = question.choices;
    const possibleAnswers = [correct, ...choices];
    const shuffledAnswers = shuffleArray(possibleAnswers);
    setOptions(shuffledAnswers);
  }, [question]);

  return (
    <div className={styles.container}>
      {options.map((option) => (
        <button
          className={styles.optionBtn}
          key={option}
          onClick={handleClick}
          ref={option === answer ? buttonsRef : null}
        >
          {option}
        </button>
      ))}
    </div>
  );
};

export default ChoiceBox;
