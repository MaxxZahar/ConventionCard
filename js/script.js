// const c1 = document.getElementById('1cbid');
// c1.addEventListener('click', function(){openList(c1.id)}, {once: true});
const wrapper = document.querySelector('.wrapper');
addListeners(wrapper, true);
document.querySelector('.header__sequence').addEventListener('dblclick', cleanHeader);
let cHCInterval = setInterval(changeHeaderColor, 2000);

function openList(id){
    console.log('open', id);
    const template = document.getElementById(id.slice(0, -3));
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
            console.log(items[i].firstElementChild.id);
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