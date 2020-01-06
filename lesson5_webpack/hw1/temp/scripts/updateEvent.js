import "core-js/modules/web.dom-collections.iterator";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import { errorDate, duration, checkForUpdate, checkEvent } from './validate.js';
import { selectedId } from './popup.js';
import { renderEvents } from './renderEvent.js';
import { close } from './utilities.js';
import { updateEvents, getEventsList, deleteEvents } from './eventsGateaway.js';
import { eventTarget } from './popup.js';
export const updateEvent = event => {
  event.preventDefault();
  let listEvents = JSON.parse(localStorage.getItem('httpRequest'));
  let elem = listEvents.find(elem => elem.id == selectedId);
  let inputName = document.querySelector('.input__name');
  let inputDescription = document.querySelector('.description-input');
  let selectColor = document.querySelector('.select__color');
  let form = document.querySelector('.popup__form');
  const formData = [...new FormData(form)].reduce((acc, _ref) => {
    let [field, value] = _ref;
    return _objectSpread({}, acc, {
      [field]: value
    });
  }, {});
  let startDateUpdate = new Date(formData.startDate + 'T' + formData.startTime);
  let endDateUpdate = new Date(formData.endData + 'T' + formData.endTime);
  if (!errorDate(startDateUpdate.getTime(), endDateUpdate.getTime())) return;
  if (!duration(startDateUpdate, endDateUpdate)) return;
  if (!checkForUpdate(startDateUpdate.getTime())) return;
  if (!checkEvent()) return;
  const newEvent = formData;
  newEvent.startDateEvent = startDateUpdate;
  newEvent.endDateEvent = endDateUpdate;
  updateEvents(selectedId, newEvent).then(() => getEventsList()).then(newTasksList => {
    localStorage.setItem('httpRequest', JSON.stringify(newTasksList));
  }).catch(() => {
    let elemm = listEvents.find(elem => elem.id == selectedId);
    listEvents[listEvents.indexOf(elemm)] = {
      id: selectedId,
      name: inputName.value,
      startDateEvent: startDateUpdate,
      endDateEvent: endDateUpdate,
      description: inputDescription.value,
      color: selectColor.value
    };
    localStorage.setItem('httpRequest', JSON.stringify(listEvents));

    if (eventTarget.classList !== 'event') {
      const classEvent = eventTarget.closest('.event');
      classEvent.remove();
    } else {
      eventTarget.remove();
    }

    renderEvents();
  });
  close(event);
};