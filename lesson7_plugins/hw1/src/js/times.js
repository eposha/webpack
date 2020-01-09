import { generateNumbersRange } from './utilities.js'

const tableTimesElem = document.querySelector('.times');
export const getTimesBlocks = () => {
    const result = [];

    generateNumbersRange(1, 23)
        .map(blockNumber => {
            let setTime = '';
            blockNumber < 10 ? setTime = `0${blockNumber}` : setTime = blockNumber;

            result.push(`<div 
                    class="times__blocks" 
                    data-block-number='${blockNumber}'
                    ><span class="clock">${setTime}:00</span></div>`)
        });
    return result.join('');
}

const renderTableTimes = () => tableTimesElem.innerHTML = getTimesBlocks()

renderTableTimes();