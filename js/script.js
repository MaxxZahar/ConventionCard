// const c1 = document.getElementById('1cbid');
// c1.addEventListener('click', function(){openList(c1.id)}, {once: true});
let card;
const wrapper = document.querySelector('.wrapper');
// addListeners(wrapper, true);
document.querySelector('.header__sequence').addEventListener('dblclick', cleanHeader);
let cHCInterval = setInterval(changeHeaderColor, 2000);
// receiveCard();
fetch('../php/getdata.php')
    .then(response => response.json())
    .then(json => sort(json))
    .then(json => card = json)
    .then(() => createStartList())
    .then(() => loadFooter())
    .catch(err => console.log('Request failed', err));




function openList(id){
    console.log('open', id);
    console.log(card);
    const bid = id.slice(0, -3);
    let filtered = card.filter(obj => obj.id.startsWith(bid));
    filtered = filtered.filter(obj => obj.id.length - bid.length > 0 && obj.id.length - bid.length < 4);
    createTemplate(filtered, bid);
    const template = document.getElementById(bid);
    const element = document.getElementById(id);
    // element.classList.add('card__bid_active');
    element.parentNode.classList.add('card__item_active');
    addBidToHeader(element.innerHTML);
    element.parentNode.insertAdjacentElement('afterend', template.content.firstElementChild.cloneNode(true));
    element.addEventListener('click', function(){closeList(id)}, {once: true});
    addListeners(element.parentNode);
}

function closeList(id){
    console.log('close', id);
    const element = document.getElementById(id);
    removeBidFromHeader(element.innerHTML);
    // element.classList.remove('card__bid_active');
    element.parentNode.classList.remove('card__item_active');
    element.parentNode.nextSibling.remove();
    element.addEventListener('click', function(){openList(id)}, {once: true});
}

function addListeners(element, root = false){
    let list;
    if (root){
        list = element.querySelector('.card');
    } else {
        list = element.nextSibling;
    }
    const items = list.querySelectorAll('li');
    for (let i = 0; i < items.length; i++){
        if (!items[i].firstElementChild.classList.contains('card__bid_last')){
            items[i].firstElementChild.addEventListener('click', function(){openList(items[i].firstElementChild.id)}, {once: true});
        }
    }
}

function addBidToHeader(bid){
    const header = document.querySelector('.header__sequence');
    if (header.innerHTML == 'Sequence'){
        header.innerHTML = '';
    }
    header.innerHTML += bid + ' - ';
    const spades = header.querySelector('.spades');
    if (spades){
        spades.classList.remove('spades');
        spades.classList.add('spades_white');
    }
}

function removeBidFromHeader(bid){
    const header = document.querySelector('.header__sequence');
    const index = header.innerHTML.indexOf(bid);
    if (index == 0){
        header.innerHTML = 'Sequence';
        cHCInterval = setInterval(changeHeaderColor, 2000);
    } else if (index > 0){
        header.innerHTML = header.innerHTML.substring(0, index - 1);
    }
}

function cleanHeader(){
    const header = document.querySelector('.header__sequence');
    header.innerHTML = 'Sequence';
    cHCInterval = setInterval(changeHeaderColor, 2000);
}

function changeHeaderColor(){
    const colors = ['rgb(108, 206, 108)', 'rgb(94, 201, 250)', 'rgb(253, 107, 131)', 'rgb(70,70,70)', 'rgb(253, 160, 39)'];
    const header = document.querySelector('.header__sequence');
    const index = Number(header.dataset.state);
    if (header.innerHTML == 'Sequence'){
        header.style.color = colors[index];
        if (index < colors.length - 1){
            header.dataset.state = index + 1;
        } else {
            header.dataset.state = 0;
        }
    } else {
        clearInterval(cHCInterval);
    }
}

function createTemplate(dataArray, bid){
    if (!document.getElementById(`${bid}`)){
        document.querySelector('body').insertAdjacentHTML('beforeend', `<template id='${bid}'><ul class='card card_child-list'></ul></template>`);
        dataArray.map(dataObject => createListItem(dataObject, bid));
    };
}

function displayBid(currentBid, rootBid = 'root'){
    const l = rootBid === 'root' ? 0 : rootBid.length;
    const cut = currentBid.substring(l);
    const level = cut[0];
    switch(cut[1]){
        case 'c':
            return `<span class='clubs'>${level}&clubsuit;</span>`;
        case 'd':
            return `<span class='diamonds'>${level}&diamondsuit;</span>`;
        case 'h':
            return `<span class='hearts'>${level}&heartsuit;</span>`;
        case 's':
            return `<span class='spades'>${level}&spadesuit;</span>`;
        case 'n':
            return `<span class='notrump'>${level}NT</span>`;
        default:
            return 0;
    }
}

function sort(systemCard){
    systemCard.forEach(obj => obj.id = obj.id.replace(/n/g, 'z'));
    systemCard.sort((a, b) => {
        if (a.id < b.id) return -1;
        if (a.id > b.id) return 1;
        return 0;
    });
    systemCard.forEach(obj => obj.id = obj.id.replace(/z/g, 'n'));
    return systemCard;   
}

function createListItem(dataObject, bid){
    let classes = 'card__bid';
    if (dataObject.last === '1'){
        classes += ' card__bid_last';
    }
    if (dataObject.alert === '1'){
        classes += ' card__bid_alert';
    }
    const template = document.getElementById(`${bid}`);
    template.content.firstChild.insertAdjacentHTML('beforeend', `<li class='card__item'>
    <div class='${classes}' id='${dataObject.id + 'bid'}'></div>
    <div class='card__description'>${dataObject.text}</div>
    <div class='card__priority' data-value='${dataObject.priority}'>${dataObject.forcing}</div>
    </li>`);
    template.content.getElementById(`${dataObject.id + 'bid'}`).insertAdjacentHTML('beforeend', displayBid(dataObject.id, bid));
}

function createStartList(){
    wrapper.insertAdjacentHTML('beforeend', "<ul class='card' id='rootlist'></ul>");
    const filtered = card.filter(obj => obj.id.length < 4);
    console.log(filtered);
    filtered.map(dataObject => {
        let classes = 'card__bid';
        if (dataObject.last === '1'){
            classes += ' card__bid_last';
        }
        if (dataObject.alert === '1'){
            classes += ' card__bid_alert';
        }
        const rootList = document.getElementById('rootlist');
        rootList.insertAdjacentHTML('beforeend', `<li class='card__item'>
        <div class='${classes}' id='${dataObject.id + 'bid'}'></div>
        <div class='card__description'>${dataObject.text}</div>
        <div class='card__priority' data-value='${dataObject.priority}'>${dataObject.forcing}</div>
        </li>`);
        document.getElementById(`${dataObject.id + 'bid'}`).insertAdjacentHTML('beforeend', displayBid(dataObject.id));
    });
    addListeners(wrapper, true);
}

function loadFooter(){
    document.querySelector('body').insertAdjacentHTML('beforeend', '<footer><div class="footer"><h1>System card</h1></div></footer>');
}

// function receiveCard(){
//     const getData = new XMLHttpRequest();
//     getData.open("GET", "../php/getdata.php?bid=" + 'request');
//     getData.responseType = 'json';
//     getData.send();
//     getData.onload = function(){
//         console.log(getData.response);
//         card = getData.response;
//     }
//     getData.onerror = function(){
//         alert('Something went wrong!');
//     }
// }

