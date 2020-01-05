const redlineElem = document.querySelector('.redline');
let correctIndent;
const getCorrectIndent = () => {

    const dayOfweek = new Date().getDay() - 1;

    dayOfweek < 0 ? correctIndent = 6 : correctIndent = dayOfweek;
}

getCorrectIndent();

export const setTimeRedline = () => {
    let result;
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const minutesInHours = now.getHours() * 60 + minutes;

    hours < 1 ? result = minutes : result = minutesInHours;

    return result;
}

export const moveRedline = () => {
    const widthTableSectionElem = document.querySelector('.table-sections__section').offsetWidth;
    redlineElem.style.top = `${setTimeRedline() + 163}px`;
    redlineElem.style.left = `${widthTableSectionElem * correctIndent + 70}px`;
}