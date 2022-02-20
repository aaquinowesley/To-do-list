'use strict';

const getBanco = () => JSON.parse(localStorage.getItem ('todoList')) ?? [];
const setBanco = (banco) => localStorage.setItem('todoList', JSON.stringify(banco));

const createItem = (task, status, index) => {
    const item = document.createElement('label');
    item.classList.add('todo__item')
    item.innerHTML = `
    <input type="checkbox" ${status} data-index=${index}>
    <div>${task}</div>
    <input type="button" value="X" data-index=${index}>
    `;
    document.getElementById('todoList').appendChild(item);
}

const clearTask = () =>{
    const todoList = document.getElementById('todoList');
    while (todoList.firstChild){
        todoList.removeChild(todoList.lastChild);
    }
}


const RefreshScreen = () => {
    clearTask();
    const banco = getBanco();
    banco.forEach((item, index) => createItem (item.task, item.status, index));

}

const insertItem = (event) => {
    const keyboardKey = event.key;
    const text = event.target.value;
    if(keyboardKey === 'Enter'){
        const banco = getBanco();
        banco.push({'task': text, 'status': ''})
        setBanco(banco);
        RefreshScreen();
        event.target.value = '';
    }
}

const removeItem = (index) => {
    const banco = getBanco();
    banco.splice(index, 1);
    setBanco(banco);
    RefreshScreen();
}

const updateItem = (index) => {
    const banco = getBanco();
    banco[index].status = banco[index].status === '' ? 'checked' : '';
    setBanco(banco);
    RefreshScreen();
}

const clickItem = (event) => {
    const element = event.target;
    if(element.type === 'button'){
        const index = element.dataset.index;
        removeItem(index);
    } else if (element.type === 'checkbox') {
        const index = element.dataset.index;
        updateItem (index);
    }
}

document.getElementById('newItem').addEventListener('keypress', insertItem);
document.getElementById('todoList').addEventListener('click', clickItem);

RefreshScreen();