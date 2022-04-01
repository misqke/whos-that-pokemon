import React, { useState } from "react";
import Head from "next/head";
import Router from "next/router";
import styles from "../styles/Home.module.scss";
import convertNumbers from "../util/convertNumbers";

export default function Home() {
  const [gameMode, setGameMode] = useState("choice");
  const [minNum, setMinNum] = useState(1);
  const [maxNum, setMaxNum] = useState(898);

  const handlePlay = () => {
    const numbers = convertNumbers(minNum, maxNum);
    Router.push(`/${gameMode}/${numbers}`);
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Who&apos;s that Pokemon</title>
      </Head>
      <div className={styles.content}>
        <h1>Who&apos;s that Pokemon?</h1>
        <div className={styles.gameMode}>
          <h2 className={styles.heading}>Game Mode</h2>
          <div className={styles.choices}>
            <input
              type="radio"
              id="choice"
              value={"choice"}
              onChange={(e) => setGameMode(e.target.value)}
              name="game_mode"
              hidden
              checked={gameMode === "choice" ? true : false}
            />
            <label htmlFor="choice">Multiple Choice</label>
            <input
              type="radio"
              id="input"
              value={"input"}
              onChange={(e) => setGameMode(e.target.value)}
              name="game_mode"
              hidden
              checked={gameMode === "input" ? true : false}
            />
            <label htmlFor="input">Input</label>
          </div>
          <h2 className={styles.heading}>Pokemon Range</h2>
          <div className={styles.choices}>
            <input
              type="number"
              min={1}
              max={897}
              value={minNum}
              onChange={(e) => setMinNum(e.target.value)}
            />
            <input
              type="number"
              min={2}
              max={898}
              value={maxNum}
              onChange={(e) => setMaxNum(e.target.value)}
            />
          </div>
        </div>
        <button className={styles.playBtn} type="button" onClick={handlePlay}>
          Play!
        </button>
      </div>
    </div>
  );
}
