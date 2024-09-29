document.getElementById('taskInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addTask();
    }
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    const todoList = document.getElementById('todoList');
    const li = document.createElement('li');
    li.textContent = taskText;

    const completeButton = document.createElement('button');
    completeButton.textContent = '완료';
    completeButton.addEventListener('click', function () {
        moveToDone(li);
    });

    li.appendChild(completeButton);
    todoList.appendChild(li);
    taskInput.value = '';
}

function moveToDone(taskItem) {
    const doneList = document.getElementById('doneList');
    taskItem.removeChild(taskItem.querySelector('button'));

    const deleteButton = document.createElement('button');
    deleteButton.textContent = '삭제';
    deleteButton.addEventListener('click', function () {
        taskItem.remove();
    });

    taskItem.appendChild(deleteButton);
    doneList.appendChild(taskItem);
}
