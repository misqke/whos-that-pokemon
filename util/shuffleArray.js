const shuffleArray = (arr) => {
  const copy = [...arr];
  const shuffledAnswers = [];
  while (shuffledAnswers.length < arr.length) {
    const randomIndex = Math.floor(Math.random() * copy.length);
    shuffledAnswers.push(copy[randomIndex]);
    copy.splice(randomIndex, 1);
  }
  return shuffledAnswers;
};

export default shuffleArray;
