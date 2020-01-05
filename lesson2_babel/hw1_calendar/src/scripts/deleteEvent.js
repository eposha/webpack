import { checkForUpdate } from './validate.js';
import { selectedId } from './popup.js';
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
            localStorage.setItem('httpRequest', JSON.stringify(newTasksList))
            delHtml.parentNode.removeChild(delHtml);
        })
        .catch(() => {
            let elem = listEvents.find(elem => elem.id == selectedId)
            listEvents[listEvents.indexOf(elem)] = {}
            localStorage.setItem('httpRequest', JSON.stringify(listEvents))
            delHtml.parentNode.removeChild(delHtml);
            if (eventTarget.classList !== 'event') {
                const classEvent = eventTarget.closest('.event');
                classEvent.remove();
            } else {
                eventTarget.remove();
            }
            renderEvents()
        })
    close(event);

}
popupDel.addEventListener('click', deleteEvent);