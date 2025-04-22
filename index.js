
const doneList = JSON.parse(localStorage.getItem('doneList')) || [];
const list = JSON.parse(localStorage.getItem('todo')) || [];
function readInput() {
    const taskInput = document.querySelector('.input-task')
    const dateInput = document.querySelector('.input-date')
    const timeInput = document.querySelector('.input-time')

    const task = taskInput.value
    const date = dateInput.value
    const time = timeInput.value

    if (!task || !date || !time) {
        alert("Please fill in all fields.");
        return;
    }
    
    const inputObj = {
        task,
        date,
        time,
        notified: false
    }
    
    list.push(inputObj)
    displayList()
}

function displayList() {
    let htmlList = ""

    list.forEach((task, i) => {
        const counter = getCountDown(task.date, task.time, task.task)
        const html = `<div class="items">
        <span class="task">${task.task}</span>
        <span>${task.date}</span>
        <span>${task.time}</span> 
        <span>${counter}</span>
        <button class="done-btn" onclick="del(${i})">Done</button></div>`
        htmlList += html
    })
    document.querySelector('.list').innerHTML = htmlList
}

function getCountDown(date, time, task) {
    const target = new Date(`${date}T${time}`)
    const now = new Date();
    const diff = target - now
    if (diff <= 0) {
        return `Time for ${task}`
    }

    const hours = Math.floor(diff / 1000 / 60 / 60);
    const minutes = Math.floor((diff / 1000 / 60) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return  `<span>${pad(hours)}:${pad(minutes)}:${pad(seconds)}</span>`


    
    
}

function pad(n){
    return n < 10 ? '0' + n : n
}

function add() {
    readInput();
    localStorage.setItem('todo', JSON.stringify(list))
    
}
function del(index) {
    doneList.push(list[index])
    localStorage.setItem('doneList', JSON.stringify(doneList))
    list.splice(index, 1)
    localStorage.setItem('todo', JSON.stringify(list))
    displayList()
    console.log(doneList)
}
function popup() {
    let existingPopup = document.querySelector('.popup-container');
    if (existingPopup) existingPopup.remove();

    const popupContainer = document.createElement('div');
    popupContainer.classList.add('popup-container');

    let html = `<h2 class="done-header">Done tasks</h2>
                <button class="close-popup" onclick="closePopup()" >Close</button>`;
    doneList.forEach((task, i) => {
        html += `<p class="done-list"> <img class="tick" src="./pictures/green-tick.png" alt=""> ${task.task} <button onclick="erase(${i})">Delete</button></p>`;
    });

    popupContainer.innerHTML = html;
    document.body.appendChild(popupContainer);
}
function closePopup(){
    let existingPopup = document.querySelector('.popup-container');
    if (existingPopup) existingPopup.remove();
    
}
function erase(index) {
    doneList.splice(index, 1);
    localStorage.setItem('doneList', JSON.stringify(doneList));
    popup();
}
setInterval(displayList, 1000);
