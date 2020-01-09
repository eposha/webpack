import './index.scss';
import { renderTable, checkCurrentDay } from './days';
import { getTimesBlocks } from './times';
import { renderEvents } from './renderEvent';
import { renderTimeList } from './popup';
import { addEvent } from './addEvent';
import { deleteEvent } from './deleteEvent';
import { updateEvent } from './updateEvent';
import { createEvents, getEventsList, deleteEvents } from './eventsGateaway';


window.addEventListener('storage', renderEvents);

renderEvents();
setInterval(checkCurrentDay, 1000);
renderTimeList();
