import { selectedId } from './popup';

const sixHourInMs = 21600000;
const fifteenMinInMs = 900000;

export const errorDate = (start, end) => {
  if (end < start) {
    alert('error');
    return false;
  }
  if (start - end > sixHourInMs) {
    alert('error');
    return false;
  }
  return true;
};

export const duration = (start, end) => {
  if (end.getHours() - start.getHours() > 6) {
    alert('You cannot create an event longer than 6 hours');
    return false;
  }
  if (start.getTime() - end.getTime() > sixHourInMs) {
    alert('You cannot create an event longer than 6 hours');
    return false;
  }
  return true;
};

export const checkForUpdate = (start) => {
  const now = new Date();
  if (start - now < 0) return true;
  if (start - now.getTime() < fifteenMinInMs) {
    alert('you cannot delete/update event 15 minutes before the start');
    return false;
  }
  return true;
};

export const checkEvent = () => {
  let listEvents = JSON.parse(localStorage.getItem('httpRequest'));

  if (JSON.parse(localStorage.getItem('httpRequest')).length === 1) return true;

  const startDate = document.querySelector('.start-date');
  const startTime = document.querySelector('.start-time');
  const endDate = document.querySelector('.end-date');
  const endTime = document.querySelector('.end-time');


  const beginEv = [];
  const endEv = [];
  const popupBegin = new Date(`${startDate.value}T${startTime.value}`);
  const popupEnd = new Date(`${endDate.value}T${endTime.value}`);
  listEvents = listEvents.filter((elem) => elem.id != selectedId); // eslint-disable-line eqeqeq
  for (let i = 1; i < listEvents.length; i++) {
    if (typeof listEvents[i].startDateEvent !== 'undefined') {
      beginEv.push(new Date(listEvents[i].startDateEvent).getTime());
    }
  }

  for (let i = 1; i < listEvents.length; i++) {
    if (typeof listEvents[i].endDateEvent !== 'undefined') {
      endEv.push(new Date(listEvents[i].endDateEvent).getTime());
    }
  }

  const closestBeginRight = Math.min(...beginEv.filter((v) => v > popupBegin));
  const closestEndLeft = Math.max(...endEv.filter((v) => v < popupEnd));

  if (closestBeginRight < popupEnd) {
    alert('You cannot come to next event until it ends');
    return false;
  }
  if (closestEndLeft > popupBegin) {
    alert('You cannot come to this event until the previous one has ended');
    return false;
  }

  return true;
};
