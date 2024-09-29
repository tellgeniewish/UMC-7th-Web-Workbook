function addTask() {
    const input = document.getElementById('userInput');
    if (input.value.trim() !== '') {
      const todo = document.getElementById('todo');
      const li = document.createElement('li');
      li.textContent = input.value;

      const finishBtn = document.createElement('button');
      finishBtn.textContent = '완료';
      finishBtn.onclick = function () {
        completeTask(li, input.value);
      };
      li.appendChild(finishBtn);
      todo.appendChild(li);
      input.value = '';
    }
}
  
function completeTask(item, task) {
    const finish = document.getElementById('finish');
    const li = document.createElement('li');
    li.textContent = task;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '삭제';
    deleteBtn.onclick = function () {
      li.remove();
    };
    li.appendChild(deleteBtn);
    finish.appendChild(li);
    item.remove();
}

// 엔터 키 입력을 감지하는 함수
document.getElementById("userInput").addEventListener("keydown", function(event) {
    if (event.key === "Enter") { // 엔터 키가 눌렸을 때
        event.preventDefault(); // 기본 엔터 동작 방지 (예: 폼 제출)
        addTask(); // 입력값 기록 함수 호출
    }
});