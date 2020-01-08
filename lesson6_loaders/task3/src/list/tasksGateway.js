const baseUrl = 'https://crudcrud.com/api/2883a47ac4fa4e25bec99dce7d2e1795/tasks';

function mapTasks(tasks) {
    return tasks.map(({ _id, ...rest }) => ({ ...rest, id: _id }));
};

function getTasksList() {
    return fetch(baseUrl)
        .then(response => response.json())
        .then(tasks => mapTasks(tasks))
};

function creatTask(taskData) {
    return fetch(baseUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(taskData),
    })
};

function updateTask(taskId, updatedTaskData) {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(updatedTaskData),
    })
};

function deleteTask(taskId) {
    return fetch(`${baseUrl}/${taskId}`, {
        method: 'DELETE',
    })
};

export { getTasksList, creatTask, updateTask, deleteTask };
