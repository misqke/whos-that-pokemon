const convertNumbers = (min, max) => {
  let newMin = min.toString();
  let newMax = max.toString();
  if (newMin.length === 1) {
    newMin = `00${newMin}`;
  } else if (newMin.length === 2) {
    newMin = `0${newMin}`;
  }
  if (newMax.length === 1) {
    newMax = `00${newMax}`;
  } else if (newMax.length === 2) {
    newMax = `0${newMax}`;
  }
  return `${newMin}${newMax}`;
};

export default convertNumbers;
