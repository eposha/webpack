export const check = elem => {
  let num = elem;
  num < 10 ? num = "0".concat(num) : num;
  return num;
};
export const generateNumbersRange = (from, to) => {
  const result = [];

  for (let i = from; i <= to; i++) {
    result.push(i);
  }

  ;
  return result;
};
export const close = event => {
  event.preventDefault();
  const popup = document.querySelector(".popup");
  popup.classList.remove('popup-on');
};