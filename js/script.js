// const c1 = document.getElementById('1cbid');
// c1.addEventListener('click', function(){openList(c1.id)}, {once: true});
const wrapper = document.querySelector('.wrapper');
addListeners(wrapper, true);

function openList(id){
    console.log('open', id);
    const template = document.getElementById(id.slice(0, -3));
    const element = document.getElementById(id);
    // element.classList.add('card__bid_active');
    element.parentNode.classList.add('card__item_active');
    element.parentNode.insertAdjacentElement('afterend', template.content.firstElementChild.cloneNode(true));
    element.addEventListener('click', function(){closeList(id)}, {once: true});
    addListeners(element.parentNode);
}

function closeList(id){
    console.log('close', id);
    const element = document.getElementById(id);
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