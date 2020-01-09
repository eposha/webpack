import { errorDate, duration, checkForUpdate, checkEvent } from './validate.js'
import { selectedId } from './popup.js';
import { renderEvents } from './renderEvent.js'
import { close } from './utilities.js';
import { updateEvents, getEventsList, deleteEvents } from './eventsGateaway.js';
import { eventTarget } from './popup.js';

export const updateEvent = (event) => {
    event.preventDefault();

    let listEvents = JSON.parse(localStorage.getItem('httpRequest'))

    let elem = listEvents.find(elem => elem.id == selectedId)
    let inputName = document.querySelector('.input__name');
    let inputDescription = document.querySelector('.description-input');
    let selectColor = document.querySelector('.select__color')




    let form = document.querySelector('.popup__form')
    const formData = [...new FormData(form)]
        .reduce((acc, [field, value]) => ({...acc, [field]: value }), {});
    let startDateUpdate = new Date(formData.startDate + 'T' + formData.startTime);
    let endDateUpdate = new Date(formData.endData + 'T' + formData.endTime);



    if (!errorDate(startDateUpdate.getTime(), endDateUpdate.getTime())) return;
    if (!duration(startDateUpdate, endDateUpdate)) return;
    if (!checkForUpdate(startDateUpdate.getTime())) return;
    if (!checkEvent()) return;


    const newEvent = formData;
    newEvent.startDateEvent = startDateUpdate;
    newEvent.endDateEvent = endDateUpdate;

    updateEvents(selectedId, newEvent)
        .then(() => getEventsList())
        .then(newTasksList => {
            localStorage.setItem('httpRequest', JSON.stringify(newTasksList))
        }).catch(() => {
            let elemm = listEvents.find(elem => elem.id == selectedId)
            listEvents[listEvents.indexOf(elemm)] = {
                id: selectedId,
                name: inputName.value,
                startDateEvent: startDateUpdate,
                endDateEvent: endDateUpdate,
                description: inputDescription.value,
                color: selectColor.value,
            }
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
}