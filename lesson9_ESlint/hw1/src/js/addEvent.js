import { errorDate, duration, checkEvent } from './validate';
import { renderEvents } from './renderEvent';
import { updateEvent } from './updateEvent';
import { close } from './utilities';
import { createEvents, getEventsList } from './eventsGateaway';

const btnSend = document.querySelector('.submit-button');
const btnClose = document.querySelector('.close');
const btnUpdateEvent = document.querySelector('.submit-button');

const serverStatusElem = document.querySelector('.status-server');

export const addEvent = (event) => {
  event.preventDefault();
  if (btnUpdateEvent.classList.contains('update')) {
    updateEvent(event);
    return;
  }
  const listEvents = JSON.parse(localStorage.getItem('httpRequest'));
  const inputName = document.querySelector('.input__name');
  const inputDescription = document.querySelector('.description-input');

  const form = document.querySelector('.popup__form');
  const formData = [...new FormData(form)]
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});
  const startDate = new Date(`${formData.startDate}T${formData.startTime}`);
  const endDate = new Date(`${formData.endData}T${formData.endTime}`);


  if (!errorDate(startDate.getTime(), endDate.getTime())) return;
  if (!duration(startDate, endDate)) return;
  if (!checkEvent()) return;


  const newEvent = formData;
  newEvent.id = listEvents.length;
  newEvent.createDate = new Date();
  newEvent.startDateEvent = startDate;
  newEvent.endDateEvent = endDate;

  createEvents(newEvent)
    .then(() => getEventsList())
    .then((newTasksList) => {
      serverStatusElem.classList.remove('status-server__off');
      localStorage.setItem('httpRequest', JSON.stringify(newTasksList));
      renderEvents();
    })
    .catch(() => {
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
