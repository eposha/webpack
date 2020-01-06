import { generateNumbersRange } from './utilities.js';
const tableTimesElem = document.querySelector('.times');
export const getTimesBlocks = () => {
  const result = [];
  generateNumbersRange(1, 23).map(blockNumber => {
    let setTime = '';
    blockNumber < 10 ? setTime = "0".concat(blockNumber) : setTime = blockNumber;
    result.push("<div \n                    class=\"times__blocks\" \n                    data-block-number='".concat(blockNumber, "'\n                    ><span class=\"clock\">").concat(setTime, ":00</span></div>"));
  });
  return result.join('');
};

const renderTableTimes = () => tableTimesElem.innerHTML = getTimesBlocks();

renderTableTimes();