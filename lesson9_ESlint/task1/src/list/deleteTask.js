import { renderTasks } from './renderer';
import { setItem } from './storage';
import { getTasksList, deleteTask } from './tasksGateway';

function onDeleteTask(event) {
  const isDeleteBtn = event.target.classList.contains('list-item__delete-btn');
  if (!isDeleteBtn) return;

  const taskId = event.target.parentNode.firstElementChild.dataset.id;

  deleteTask(taskId)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
    });
}

export default onDeleteTask;
