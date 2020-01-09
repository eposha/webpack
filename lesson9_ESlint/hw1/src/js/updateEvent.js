import {
  errorDate,
  duration,
  checkForUpdate,
  checkEvent,
} from './validate';
import { selectedId, eventTarget } from './popup';
import { renderEvents } from './renderEvent';
import { close } from './utilities';
import { updateEvents, getEventsList } from './eventsGateaway';


export const updateEvent = (event) => {
  event.preventDefault();

  const listEvents = JSON.parse(localStorage.getItem('httpRequest'));

  const inputName = document.querySelector('.input__name');
  const inputDescription = document.querySelector('.description-input');
  const selectColor = document.querySelector('.select__color');


  const form = document.querySelector('.popup__form');
  const formData = [...new FormData(form)]
    .reduce((acc, [field, value]) => ({ ...acc, [field]: value }), {});
  const startDateUpdate = new Date(`${formData.startDate}T${formData.startTime}`);
  const endDateUpdate = new Date(`${formData.endData}T${formData.endTime}`);


  if (!errorDate(startDateUpdate.getTime(), endDateUpdate.getTime())) return;
  if (!duration(startDateUpdate, endDateUpdate)) return;
  if (!checkForUpdate(startDateUpdate.getTime())) return;
  if (!checkEvent()) return;


  const newEvent = formData;
  newEvent.startDateEvent = startDateUpdate;
  newEvent.endDateEvent = endDateUpdate;

  updateEvents(selectedId, newEvent)
    .then(() => getEventsList())
    .then((newTasksList) => {
      localStorage.setItem('httpRequest', JSON.stringify(newTasksList));
    }).catch(() => {
      const elemm = listEvents.find((elem) => elem.id == selectedId);
      listEvents[listEvents.indexOf(elemm)] = {
        id: selectedId,
        name: inputName.value,
        startDateEvent: startDateUpdate,
        endDateEvent: endDateUpdate,
        description: inputDescription.value,
        color: selectColor.value,
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
