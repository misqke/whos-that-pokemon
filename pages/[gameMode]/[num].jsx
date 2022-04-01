import React, { useState } from "react";
import axios from "axios";
import Canvas from "../../components/Canvas";
import ChoiceBox from "../../components/ChoiceBox";
import InputBox from "../../components/InputBox";
import styles from "../../styles/Game.module.scss";

const Game = ({ gameMode, questionList, names }) => {
  const [answer, setAnswer] = useState("");
  const [questionNumber, setQuestionNumber] = useState(0);
  const [currentQuestion, setCurrentQuestion] = useState(
    questionList[questionNumber]
  );
  const [hidden, setHidden] = useState(true);
  const [score, setScore] = useState(0);
  const [timer, setTimer] = useState({
    show: false,
    time: 3,
  });

  const handleAnswer = (name) => {
    setAnswer(name);
    setHidden(false);
    if (timer.show === true) {
      return;
    }
    if (name.toLowerCase() === currentQuestion.answer.name.toLowerCase()) {
      setScore((prev) => prev + 1);
    }
    if (questionNumber < questionList.length - 1) {
      setTimer({ show: true, time: 3 });
      const tick = setInterval(() => {
        setTimer((prev) => ({ ...prev, time: prev.time - 1 }));
      }, 1000);
      setTimeout(() => {
        setQuestionNumber((prev) => prev + 1);
        setAnswer("");
        setCurrentQuestion(questionList[questionNumber + 1]);
        setHidden(true);
        clearInterval(tick);
        setTimer({ show: false, time: 3 });
      }, 3000);
    }
  };

  return (
    <div className={styles.container}>
      <div id="box" className={styles.innerContainer}>
        <div className={styles.imgBox}>
          <Canvas question={currentQuestion} hidden={hidden} />
          <div className={styles.circle}></div>
        </div>
        <h1 className={styles.title}>
          {!answer
            ? "Who's that Pokemon?"
            : `It's ${currentQuestion.answer.name} !`}
        </h1>
        <div className={styles.answerBox}>
          {gameMode === "choice" ? (
            <ChoiceBox question={currentQuestion} submit={handleAnswer} />
          ) : (
            <InputBox
              question={currentQuestion}
              submit={handleAnswer}
              names={names}
            />
          )}
        </div>
        <div className={styles.score}>
          <p>
            Question: <span>{questionNumber + 1}</span> / {questionList.length}
          </p>
          <p>
            Score: <span>{score}</span>
          </p>
        </div>
        {timer.show === true && (
          <div className={styles.timer}>{timer.time}</div>
        )}
      </div>
    </div>
  );
};

export default Game;

export const getServerSideProps = async (context) => {
  const { num, gameMode } = context.params;
  const min = Number(num.slice(0, 3));
  const max = Number(num.slice(3));
  const res = await axios.get(
    `${
      process.env.MODE === "development"
        ? "http://localhost:8000"
        : "https://misqke-pokemon-api.herokuapp.com/"
    }/api/random/?minNum=${min}&maxNum=${max}`
  );

  return {
    props: {
      questionList: res.data.pokemon,
      names: res.data.names,
      gameMode,
    },
  };
};
