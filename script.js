import { todo } from './constants.js';
const heading = document.querySelector('#top');
const space = document.querySelector('#space');
const noticeButton = document.querySelector('#noticeButton');
const ul = document.querySelector('ul');
const container = document.querySelector('#container');
const checkbox = document.querySelectorAll('.checkbox');
const deleteAll = document.querySelector('#deleteAll');
const clock = document.querySelector('#clock');
let toDoList = [];
const localStorage = window.localStorage;
if (localStorage.getItem(todo)) { //вау
    toDoList = JSON.parse(localStorage.getItem(todo));
    createNewDoing();
}
// проверка ну пустую строку в графе
noticeButton.addEventListener('click', function () {
    let toDo = {
        doing: space.value,
        checkbox: false,
        delete: false
    };
    if (toDo.doing.length > 0) {
        toDoList.push(toDo);
        createNewDoing();
        deleteBlock();
    }
    else {
        alert('Ваша строка не должна быть пустая. Заполните ее, пожалуйста!');
    }
    localStorage.setItem(todo, JSON.stringify(toDoList));
});
// новая строка списка
function createNewDoing() {
    let pr = "";
    toDoList.forEach((el, index) => {
        pr += ` 
      <li id = 'item${index}' class = 'li_item'> 
        <div class = 'checkTrash'>
          <div class = 'checkText'> 
              <input type = 'checkbox' class = 'checkbox'  id = 'item${index}' ${el.checkbox ? 'checked' : ''}> 
              <label for = 'item${index}' class = 'label'>${el.doing}</label> 
          </div> 
          <div>
            <img src = 'free-icon-garbage-158725.png' class = 'trash'> 
          </div>
        </div> 
        </li>`;
        space.value = "";
        ul.innerHTML = pr;
    });
}
// сохранение состояния checkbox 
container.addEventListener('change', function (e) {
    let targetTag = e.target.getAttribute('id');
    toDoList.forEach((el, index) => {
        if ('item' + toDoList.indexOf(el) == targetTag) {
            el.checkbox = !el.checkbox;
            localStorage.setItem(todo, JSON.stringify(toDoList));
        }
    });
});
// удаление блока
function deleteBlock() {
    const deleteButton = document.querySelectorAll('.trash');
    deleteButton.forEach(el => {
        el.addEventListener('click', function (e) {
            const liItemsAll = document.querySelectorAll('.li_item');
            var liItemIndex = Array.from(liItemsAll).indexOf(e.target);
            const liItem = e.target.closest('.li_item');
            if (liItem != undefined) {
                // const liItemIndex = liItemIndex.indexOf(e.target);
                if (liItemIndex !== undefined) {
                    // const indexToRemove = parseInt(liItemIndex);
                    toDoList.splice(liItemIndex, 1);
                    liItem.remove();
                    localStorage.setItem(todo, JSON.stringify(toDoList));
                }
            }
        });
    });
}
deleteBlock();
// создание кнопки "удалить все"
deleteAll.addEventListener('click', function (e) {
    let liItem = document.querySelectorAll('.li_item');
    liItem.forEach(el => {
        el.remove();
    });
    toDoList = [];
    localStorage.setItem(todo, JSON.stringify(toDoList));
});
// создание часов
window.onload = function () {
    window.setInterval(function () {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        let hoursTime = '';
        let minutesTime = '';
        let secondsTime = '';
        if (hours < 10) {
            hoursTime = '0' + hours;
        }
        if (minutes < 10) {
            minutesTime = '0' + minutes;
        }
        if (seconds < 10) {
            secondsTime = '0' + seconds;
        }
        let time = hours + ':' + minutes + ':' + seconds;
        clock.innerText = time;
    }, 1000);
};
