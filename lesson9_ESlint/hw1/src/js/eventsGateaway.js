export const baseUrl = 'https://crudcrud.com/api/58ea1550503c4255a9bf1440bf8f63bc/events';

const mapTasks = (events) => events.map(({ _id, ...rest }) => ({ ...rest, id: _id }));

export const getEventsList = () => fetch(baseUrl)
  .then((response) => response.json())
  .then((events) => mapTasks(events));

export const createEvents = (eventData) => fetch(baseUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(eventData),
});

export const updateEvents = (eventsId, updateEventsData) => fetch(`${baseUrl}/${eventsId}`, {
  method: 'PUT',
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
  body: JSON.stringify(updateEventsData),
});

export const getEvents = (eventsData) => fetch(baseUrl, {
  method: 'GET',
});

export const deleteEvents = (eventId) => fetch(`${baseUrl}/${eventId}`, {
  method: 'DELETE',
});
