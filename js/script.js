// const c1 = document.getElementById('1cbid');
// c1.addEventListener('click', function(){openList(c1.id)}, {once: true});
const wrapper = document.querySelector('.wrapper');
addListeners(wrapper);

function openList(id){
    console.log('open', id);
    const template = document.getElementById(id.slice(0, -3));
    const element = document.getElementById(id);
    element.parentNode.insertAdjacentElement('afterend', template.content.firstElementChild.cloneNode(true));
    element.addEventListener('click', function(){closeList(id)}, {once: true});
}

function closeList(id){
    console.log('close', id);
    const element = document.getElementById(id);
    element.parentNode.nextSibling.remove();
    element.addEventListener('click', function(){openList(id)}, {once: true});
}

function addListeners(parent){
    const list = parent.querySelector('.card');
    const items = list.querySelectorAll('li');
    for (let i = 0; i < items.length; i++){
        if (!items[i].classList.contains('last')){
            items[i].firstElementChild.addEventListener('click', function(){openList(items[i].firstElementChild.id)}, {once: true});
        }
    }
}