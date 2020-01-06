import "core-js/modules/web.dom-collections.iterator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { errorDate, duration, checkEvent } from './validate.js';
import { renderEvents } from './renderEvent.js';
import { updateEvent } from './updateEvent.js';
import { close } from './utilities.js';
import { createEvents, getEventsList, deleteEvents } from './eventsGateaway.js';
const btnSend = document.querySelector('.submit-button');
const btnClose = document.querySelector('.close');
const btnUpdateEvent = document.querySelector('.submit-button');
const serverStatusElem = document.querySelector('.status-server');
export const addEvent = event => {
  event.preventDefault();

  if (btnUpdateEvent.classList.contains("update")) {
    updateEvent(event);
    return;
  }

  ;
  let listEvents = JSON.parse(localStorage.getItem('httpRequest'));
  let inputName = document.querySelector('.input__name');
  let inputDescription = document.querySelector('.description-input');
  let form = document.querySelector('.popup__form');
  const formData = [...new FormData(form)].reduce((acc, _ref) => {
    let [field, value] = _ref;
    return _objectSpread({}, acc, {
      [field]: value
    });
  }, {});
  let startDate = new Date(formData.startDate + 'T' + formData.startTime);
  let endDate = new Date(formData.endData + 'T' + formData.endTime);
  if (!errorDate(startDate.getTime(), endDate.getTime())) return;
  if (!duration(startDate, endDate)) return;
  if (!checkEvent()) return;
  const newEvent = formData;
  newEvent.id = listEvents.length;
  newEvent.createDate = new Date();
  newEvent.startDateEvent = startDate;
  newEvent.endDateEvent = endDate;
  createEvents(newEvent).then(() => getEventsList()).then(newTasksList => {
    serverStatusElem.classList.remove('status-server__off');
    localStorage.setItem('httpRequest', JSON.stringify(newTasksList));
    renderEvents();
  }).catch(() => {
    serverStatusElem.classList.add('status-server__off');
    const localStore = JSON.parse(localStorage.getItem('httpRequest'));
    localStore.push(newEvent);
    localStorage.setItem('httpRequest', JSON.stringify(localStore));
    renderEvents();
  });
  inputName.value = '';
  inputDescription.value = '';
  close(event);
};
btnSend.addEventListener('click', addEvent);
btnClose.addEventListener('click', close);