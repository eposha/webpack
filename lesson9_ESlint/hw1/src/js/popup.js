import { check, generateNumbersRange } from './utilities';
// import './popup.scss';

// popup

export let selectedId;
export let selectedElem;

const inputName = document.querySelector('.input__name');
const startDate = document.querySelector('.start-date');
const endDate = document.querySelector('.end-date');
const startTime = document.querySelector('.start-time');
const endTime = document.querySelector('.end-time');
const description = document.querySelector('.description-input');

const btnUpdate = document.querySelector('.submit-button');
const btnDel = document.querySelector('.delete-ivent');
const selectColor = document.querySelector('.select__color');

export let eventTarget;

const selectDay = (event) => {
  eventTarget = event.target;
  const popup = document.querySelector('.popup');
  popup.classList.add('popup-on');
  const listEvents = JSON.parse(localStorage.getItem('httpRequest'));
  if (event.target.classList.value === 'table-sections__section') {
    btnUpdate.classList.remove('update');
    btnDel.classList.remove('delete-ivent__on');

    const getYear = event.target.dataset.yearNumber;
    const getMonth = event.target.dataset.monthNumber;
    const getDay = event.target.dataset.dateNumber;
    const getTime = event.target.closest('.table-sections__line').dataset.timeSet;

    inputName.value = '';
    startDate.value = `${getYear}-${check(getMonth)}-${check(getDay)}`;
    endDate.value = startDate.value;
    startTime.value = `${`${check(getTime - 1)}:00`}`;
    endTime.value = `${`${check(getTime)}:00`}`;
    description.value = '';
    return;
  }
  if (event.target.classList.contains('add-event')) {
    const dateNow = new Date();
    inputName.value = '';
    startDate.value = `${dateNow.getFullYear()}-${check(dateNow.getMonth() + 1)}-${check(dateNow.getDate())}`;
    endDate.value = `${dateNow.getFullYear()}-${check(dateNow.getMonth() + 1)}-${check(dateNow.getDate())}`;
    startTime.value = `${`${check(dateNow.getHours())}:00`}`;
    endTime.value = `${`${check(dateNow.getHours() + 1)}:00`}`;
    description.value = '';
  } else {
    btnUpdate.classList.add('update');
    btnDel.classList.add('delete-ivent__on');
    const getId = event.target.dataset.idNumber;
    const eventObj = listEvents.find((elem) => elem.id == getId);
    const startEventTime = new Date(eventObj.startDateEvent);
    const endEventTime = new Date(eventObj.endDateEvent);
    const year = startEventTime.getFullYear();
    const months = check(startEventTime.getMonth() + 1);
    const day = check(startEventTime.getDate());
    const valueStratHour = check(startEventTime.getHours());
    const valueStartMin = check(startEventTime.getMinutes());
    const valueEndHour = check(endEventTime.getHours());
    const valueEndMin = check(endEventTime.getMinutes());

    inputName.value = eventObj.name;
    startDate.value = `${year}-${months}-${day}`;
    endDate.value = startDate.value;
    startTime.value = `${`${valueStratHour}:${valueStartMin}`}`;
    endTime.value = `${`${valueEndHour}:${valueEndMin}`}`;
    description.value = eventObj.description;
    selectColor.value = eventObj.color;
    selectedElem = eventObj;
    selectedId = getId;
  }
};

const timeListElemStart = document.querySelector('.start-time');
const timeListElemEnd = document.querySelector('.end-time');
const popupWindow = document.querySelector('.table-sections');

const btnAdd = document.querySelector('.add-button');

popupWindow.addEventListener('click', selectDay);
btnAdd.addEventListener('click', selectDay);

const TimeElem = () => {
  const resultTime = [];

  generateNumbersRange(0, 23)
    .map((timeList) => {
      let setTime = '';
      let setSec = 0;
      let cell = '00';
      for (let i = 0; i < 4; i++) {
        timeList < 10 ? setTime = `0${timeList}` : setTime = timeList;
        resultTime.push(
          `<option 
            value="${setTime}:${cell}"
            data-block-number='${timeList}'>${setTime}:${cell}</option> `,
        );
        setSec += 15;
        cell = setSec;
      }
    });

  return resultTime.join('');
};

export const renderTimeList = () => {
  timeListElemStart.innerHTML = TimeElem();
  timeListElemEnd.innerHTML = TimeElem();
};
