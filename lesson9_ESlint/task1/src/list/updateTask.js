import { renderTasks } from './renderer';
import { getItem, setItem } from './storage';
import { updateTask, getTasksList } from './tasksGateway';

function onToggleTask(event) {
  const isCheckbox = event.target.classList.contains('list-item__checkbox');
  if (!isCheckbox) return;

  const taskId = event.target.dataset.id;
  const done = event.target.checked;
  const tasksList = getItem('tasksList');
  const { text, createDate } = tasksList
    .find((task) => task.id === taskId);

  const updatedTask = {
    text,
    createDate,
    done,
    finishDate: done ? new Date().toISOString() : null,
  };

  updateTask(taskId, updatedTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
}

export default onToggleTask;
