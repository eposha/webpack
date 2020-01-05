import { check, generateNumbersRange } from './utilities.js'
import { renderEvents } from './renderEvent.js'
import { moveRedline } from './redline.js'

const daysElem = document.querySelector('.days');
const nameDays = ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'];

let increasDataAttrib = 0;
let timeNow = new Date();

const getMonday = () => {
    while (timeNow.getDay() !== 1) {
        timeNow.setDate(timeNow.getDate() - 1);
    };
}
getMonday();

//current month

const monthElem = document.querySelector('.header-date');
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
let monthForPopup;
let yearForBlockElem;

export const setCurrentMonth = () => {
    const daysNumbElems = document.querySelectorAll('.days__numbe');

    const arrWithoutFirstArg = [...daysNumbElems].splice(1);
    let checkOneMonthOnWeek = false;

    for (let arg of arrWithoutFirstArg) {
        if (arg.textContent == 1) {
            checkOneMonthOnWeek = true
        };
    };

    let incr = 0;
    let setPreviosMonth = () => {
        let result = '';
        if (checkOneMonthOnWeek == true) {
            if ((new Date(timeNow).getMonth() + 1) > 11) {
                result = months[0];
                incr = 1;
                yearForBlockElem = timeNow.getFullYear() + +incr;
            } else {
                result = months[new Date(timeNow).getMonth() + 1];
            };
        };
        return result;
    };

    let currentMonth = months[new Date(timeNow).getMonth()];
    monthElem.textContent = `${currentMonth} - ${setPreviosMonth()} ${timeNow.getFullYear() + +incr}`;
    monthForPopup = new Date(timeNow).getMonth() + 1;
}

setCurrentMonth();

// days

export const getDays = () => {
    let result = [];

    generateNumbersRange(0, 6)
        .map(sectionNumber => {
            let newDay = new Date(timeNow);
            newDay.setDate(newDay.getDate() + sectionNumber);

            result.push(
                `<div class="wrapper">
                    <span class="week-day">${nameDays[new Date(newDay).getDay()]}</span>
                    <div 
                        class="days__numbe" 
                        data-block-number='${sectionNumber + increasDataAttrib}'
                    >${new Date(newDay).getDate()}</div>
                </div>`);
        });
    return result.join('');
}

export const renderDays = () => {
    daysElem.innerHTML = getDays();
}

renderDays();

//tables

const tableSectionsElem = document.querySelector('.table-sections');

let time = 0;
const createTime = () => {
    time++;
    return time;
}

export const getSectionBlock = () => {
    let result = [];
    let day = document.querySelector('.days__numbe').innerHTML;
    let dayForRender = document.querySelector('.days__numbe').innerHTML;

    const daysNumbElems = document.querySelectorAll('.days__numbe');
    const arrWithoutFirstArg = [...daysNumbElems].splice(1);
    const findFirstDay = arrWithoutFirstArg.find(arg => arg.textContent == 1);
    createTime();
    if (findFirstDay === undefined) {
        generateNumbersRange(1, 7)
            .map(sectionNumber => {
                result.push(
                    `
                    <div 
                        id="${new Date(timeNow).getFullYear()+'-'}${new Date(timeNow).getMonth() + 1+'-'}${check(dayForRender++)}"
                        class="table-sections__section" 
                        data-block-number='${sectionNumber + increasDataAttrib}'
                        data-date-number='${day++}'
                        data-month-number='${new Date(timeNow).getMonth() + 1}'
                        data-year-number='${new Date(timeNow).getFullYear()}'
                        data-time-number='${time}'
                    ></div>`
                );
            });
    } else {
        const firstDate = arrWithoutFirstArg.indexOf(findFirstDay) + 1;
        generateNumbersRange(1, firstDate)
            .map(sectionNumber => {
                result.push(
                    `
                <div 
                id="${new Date(timeNow).getFullYear()+'-'}${new Date(timeNow).getMonth() + 1+'-'}${dayForRender++}"
                    class="table-sections__section" 
                    data-block-number='${sectionNumber + increasDataAttrib} '
                    data-date-number='${day++}'
                    data-month-number='${new Date(timeNow).getMonth() + 1}'
                    data-year-number='${new Date(timeNow).getFullYear()}'
                ></div>`
                );
            });

        let sectionElemFromFirstDate = document.querySelectorAll('.days__numbe')[firstDate].textContent;

        let monthNum = new Date(timeNow).getMonth() + 2;
        if (new Date(timeNow).getMonth() + 2 >= 12) {
            monthNum = 1;
        };

        const nextYearForBlock = document.querySelector('.header-date').textContent.slice(-4);

        generateNumbersRange(1, 7 - firstDate)
            .map(sectionNumber => {
                let daysNum = sectionElemFromFirstDate;
                let monthsNum = monthNum;
                let yearNum = nextYearForBlock;
                result.push(
                    `
                <div 
                    id="${yearNum+'-'}${monthsNum+'-'}${check(daysNum++)}"
                    class="table-sections__section" 
                    data-block-number='${sectionNumber + increasDataAttrib + 2}'
                    data-date-number='${sectionElemFromFirstDate++}'
                    data-month-number='${monthNum}'
                    data-year-number='${nextYearForBlock}'
                ></div>`
                );
            });
    };
    return result.join('');
}


export const getSectionLines = () => {
    let i = 0;
    const blocksString = getSectionBlock(i);

    return generateNumbersRange(1, 24)
        .map(lineNumber => `
            <div 
            id="${check(lineNumber-1)}"
                class="table-sections__line" 
                data-line-number='${lineNumber + increasDataAttrib}'
                data-time-set='${lineNumber}'
            >${blocksString}</div>`).join('');
}



export const renderTable = () => {
    tableSectionsElem.innerHTML = getSectionLines();
};

renderTable()

//tableline

const tableLinesElem = document.querySelector('.lines');

export const getLinesBlocks = () => generateNumbersRange(1, 24)
    .map(blockNumber => `
            <div 
                class="lines__blocks" 
                data-line-number='${blockNumber + increasDataAttrib}'
            ></div>`)
    .join('');


export const renderLines = () => {
    tableLinesElem.innerHTML = getLinesBlocks();
}

renderLines();

//color current day
export const markCurrentDay = () => {
    const weekDaysElems = document.querySelectorAll('.days__numbe');
    let currentNumberDay;
    new Date().getDay() - 1 < 0 ? currentNumberDay = 6 : currentNumberDay = new Date().getDay() - 1;
    const findFirstDay = [...weekDaysElems].find(arg => arg.dataset.blockNumber == currentNumberDay);
    if (findFirstDay !== undefined) {
        findFirstDay.classList.add('active-day-number');
    };
}

markCurrentDay();

export const checkCurrentDay = () => {
    const current = document.querySelector('.active-day-number');
    const redlineElem = document.querySelector('.redline ');
    if (current) {
        redlineElem.style.display = 'flex';
        moveRedline();
    } else {
        redlineElem.style.display = 'none';
    };
}

//arrows

const nextArrowElem = document.querySelector('.nav-button__next');
const prevArrowElem = document.querySelector('.nav-button__prev');

export const getNextWeek = () => {
    timeNow.setDate(timeNow.getDate() + 7);
    increasDataAttrib += 7;
    renderDays();
    setCurrentMonth();
    renderTable();
    renderLines();
    markCurrentDay();
    renderEvents();
    checkCurrentDay();
}

export const getPrevWeek = () => {
    timeNow.setDate(timeNow.getDate() - 7);
    increasDataAttrib -= 7;
    renderDays();
    setCurrentMonth();
    renderTable();
    renderLines();
    markCurrentDay();
    renderEvents();
    checkCurrentDay();
}

nextArrowElem.addEventListener('click', getNextWeek);
prevArrowElem.addEventListener('click', getPrevWeek);

//today button

const addButtonElem = document.querySelector('.today-button');

export const getCurrentDay = () => {
    timeNow = new Date();
    getMonday();
    increasDataAttrib = 0;
    renderDays();
    renderTable();
    renderLines();
    setCurrentMonth();
    markCurrentDay();
    renderEvents();
    checkCurrentDay();
}

addButtonElem.addEventListener('click', getCurrentDay);