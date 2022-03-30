import React, { useEffect, useRef } from "react";

import styles from "../styles/Canvas.module.scss";

const Canvas = ({ question, hidden }) => {
  const canvasRef = useRef();

  useEffect(() => {
    const pokemon = question.answer;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    canvas.width = document.querySelector("#box").scrollWidth < 500 ? 150 : 250;
    canvas.height =
      document.querySelector("#box").scrollWidth < 500 ? 150 : 250;
    const pokemonImg = new Image();
    pokemonImg.crossOrigin = "anonymous";
    pokemonImg.src = pokemon.img.large;
    pokemonImg.onload = () => {
      ctx.drawImage(
        pokemonImg,
        0,
        0,
        pokemonImg.width,
        pokemonImg.height,
        0,
        0,
        canvas.width,
        canvas.height
      );
      if (hidden) {
        const scannedImage = ctx.getImageData(
          0,
          0,
          canvas.width,
          canvas.height
        );
        const scannedData = scannedImage.data;
        for (let i = 0; i < scannedData.length; i += 4) {
          scannedData[i] = 0;
          scannedData[i + 1] = 0;
          scannedData[i + 2] = 0;
        }
        const newImage = new ImageData(
          scannedData,
          canvas.width,
          canvas.height
        );
        ctx.putImageData(newImage, 0, 0);
      }
    };
  }, [hidden]);

  return <canvas className={styles.canvas} ref={canvasRef}></canvas>;
};

export default Canvas;
