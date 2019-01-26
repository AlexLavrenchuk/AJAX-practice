

class CustomHttp {
    get(url, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.send();
        xhr.addEventListener('load', () => callback(xhr.responseText));
    }

    post(url, data, callback) {
        const xhr = new XMLHttpRequest();
        xhr.open('POST', url);
        xhr.setRequestHeader('Content-type', 'application/json');
        xhr.send(data);
        xhr.addEventListener('load', () => callback(xhr.responseText));
    }
}

const http = new CustomHttp();
const httpUser = new CustomHttp();

let links = document.links;
let nav = document.querySelector('nav');

http.get('https://jsonplaceholder.typicode.com/users', (response) => {
    let responseServer = JSON.parse(response);
    responseServer.forEach((user, i) => {
        links[i].textContent = user.name;
        links[i].parentElement.setAttribute('data-userId', `${++i}`);
        addPrevView(user);
    });
});

/**
 * @docs addPrevView - adds a markup string to the document
 * @param {Object} user 
 * @returns {void}
 */
function addPrevView(user) {
    let userName = document.querySelector(`[data-userid="${user.id}"] a`);
    let prev = prevTemplate(user);
    userName.insertAdjacentHTML('beforebegin', prev);
}

/**
 * @docs prevTemplate - create markup for previews
 * @param {Object} user 
 * @returns {string}
 */
function prevTemplate(user) {
    return `
        <ul class='prevMenu'>
            <li>${user.phone}</li>
            <li>${user.email}</li>
            <li>${user.username}</li>
        </ul>
    `;
}

//hover block
nav.addEventListener("mouseover", (e) => {
    e.preventDefault();

    if (e.target.nodeName === 'A') {
        let id = e.target.parentElement.dataset.userid;
        let prevMenu = document.querySelector(`[data-userid="${id}"] .prevMenu`);
        prevMenu.style.display = "block";
    }
});

//hover none
nav.addEventListener("mouseout", (e) => {
    e.preventDefault();

    if (e.target.nodeName === 'A') {
        let id = e.target.parentElement.dataset.userid;
        let prevMenu = document.querySelector(`[data-userid="${id}"] .prevMenu`);
        prevMenu.style.display = "none";
    }
});

//we trace event on click in navigation, we add the menu
nav.addEventListener('click', (e) => {
    e.preventDefault();

    if (e.target.nodeName === "BUTTON" && e.target.innerText !== 'x') {
        e.target.innerText = 'x';
        let id = e.target.parentElement.getAttribute('data-userId');

        httpUser.get(`https://jsonplaceholder.typicode.com/users/${id}`, (response) => {
            let user = JSON.parse(response);

            addMenuView(user);
        });    
    }
});

//we trace event on click in all document, we check availability of the menu if there is we delete.
document.body.addEventListener('click', (e) => { 
    e.preventDefault();

    if (document.querySelector('.menuMore')) {
        let menu = document.querySelector('.menuMore');
        menu.previousElementSibling.innerHTML = "more";
        menu.parentElement.removeChild(menu);
    }
});

/**
 * @docs addMenuView - adds markup to the page, sets the id
 * @param {Object} user 
 * @returns {void}
 */
function addMenuView(user) {
    let button = document.querySelector(`[data-userid="${user.id}"] button`);
    let menu = menuTemplate(user);
    button.insertAdjacentHTML('afterend', menu);
}

/**
 * @docs menuTemplate
 * @param {Object} user 
 * @returns {string} 
 */
function menuTemplate(user) {

    return `<ul class='menuMore' data-id="${user.id}">`
            + ObjectToHtml(user) +
            '</ul>';
}

/**
 * @docs ObjectToHtml - filling the markup with data
 * @param {Object} user 
 * @returns {string}
 */
function ObjectToHtml(user){
    if (!user) return 'null';

    let str= "";

    for(let key in user) {
        if (typeof user[key] === "string") str += "<li>" + key + " : " + user[key] + "</li>";
        if (typeof user[key] === "object") str += "<li>" + key + ObjectToHtml(user[key]) + "</li>";
    }

    return str.slice();
}

//---------------------------------------------------------------------------------------------------

//  <-- class ES6 -->

//--------------------
// 1. Реализовать конструктор в ES6 синтаксисе (также используйте аргументы по умолчанию):

// function Component(tagName) {
//   this.tagName = tagName || 'div';
//   this.node = document.createElement(tagName);
// }
// Пример вызова:
// const comp = new Component('span');

class Component {
    constructor(tagName) {
        this.tagName = tagName || 'div';
        this.node = document.createElement(tagName);
    }
}

//--------------------
// 2. Реализовать конструктор и методы в ES6 синтаксисе:

// function Component(tagName) {
//   this.tagName = tagName || 'div';
//   this.node = document.createElement(tagName);
// }

// Component.prototype.setText = function (text) { 
//   this.node.textContent = text;
// };

class Component2 {
    constructor(tagName) {
        this.tagName = tagName || 'div';
        this.node = document.createElement(tagName);
    }
    setText(text) {
        this.node.textContent = text;
    }
}

const comp = new Component2('span');
comp.setText("hello");

//--------------------
// 3. Создать класс калькулятора который будет принимать стартовое значение и у него 
// будут методы сложить, вычесть, умножить , разделить. Также у него должны быть 
// геттер и сеттер для получения и установки текущего числа с которым производятся вычисления.

class Calc {
    constructor(number) {
        if (check(number)) return console.error('Error');
        this.number = number || 0;
    }

    get myVal() {
        return this.number;
    }

    set myVal(newNumber) {
        if (check(newNumber)) return console.error('Error');

        this.number = newNumber;
    }

    plus(number) {
        if (check(number)) return console.error('Error');
        this.number += number
    }

    minus(number) {
        if (check(number)) return console.error('Error');
        this.number -= number
    }

    multiply(number) {
        if (check(number)) return console.error('Error');
        this.number *= number
    }

    divide(number) {
        if (check(number)) return console.error('Error');
        this.number /= number
    }
}
const check = (value) => {
        if (typeof value !== 'number') return true;
        if (isNaN(value)) return true;
        return false;
};