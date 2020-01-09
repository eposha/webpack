import { checkForUpdate } from './validate.js';
import { selectedId, eventTarget } from './popup.js';
import { close } from './utilities.js';
import { getEventsList, deleteEvents } from './eventsGateaway.js';
import { renderEvents } from './renderEvent.js';

const popupDel = document.querySelector(`.delete-ivent`);

export const deleteEvent = (event) => {
    let listEvents = JSON.parse(localStorage.getItem('httpRequest'))
    const startDate = document.querySelector(`.start-date`);
    const startTime = document.querySelector('.start-time')
    let strat = new Date(startDate.value + 'T' + startTime.value);

    event.preventDefault();
    if (!checkForUpdate(strat.getTime())) return;
    const delHtml = document.querySelector(`[id='${selectedId}'`);
    if (delHtml == null) alert(`you cannot delete an event that does not exist`);

    deleteEvents(selectedId)
        .then(() => getEventsList())
        .then(newTasksList => {
            localStorage.setItem('httpRequest', JSON.stringify(newTasksList));

            const classEvent = eventTarget.closest('.event').dataset.idNumber;
            const delEventElems = document.querySelectorAll(`div[data-id-number='${classEvent}']`);
            const arrayElems = Array.prototype.slice.call(delEventElems);
            arrayElems.map(elem => elem.remove());
        })
        .catch(() => {
            let elem = listEvents.find(elem => elem.id == selectedId)
            listEvents[listEvents.indexOf(elem)] = {}
            localStorage.setItem('httpRequest', JSON.stringify(listEvents));

            const classEvent = eventTarget.closest('.event').dataset.idNumber;
            const delEventElems = document.querySelectorAll(`div[data-id-number='${classEvent}']`);
            const arrayElems = Array.prototype.slice.call(delEventElems);
            arrayElems.map(elem => elem.remove());

        })
    close(event);

}
popupDel.addEventListener('click', deleteEvent);