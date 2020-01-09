import { renderTasks } from './renderer';
import { setItem } from './storage';
import { getTasksList, creatTask } from './tasksGateway';

function onCreateTask() {
  const taskTitleInputElem = document.querySelector('.task-input');
  const text = taskTitleInputElem.value;

  if (!text) return;

  const newTask = {
    text,
    done: false,
    createDate: new Date().toISOString(),
  };

  creatTask(newTask)
    .then(() => getTasksList())
    .then((newTasksList) => {
      setItem('tasksList', newTasksList);
      renderTasks();
      taskTitleInputElem.value = '';
    });
}

export default onCreateTask;
