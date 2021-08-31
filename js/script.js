const c1 = document.getElementById('1cbid');
c1.addEventListener('click', function(){
    console.log(c1.id.slice(0, -3));
    const template = document.getElementById(c1.id.slice(0, -3));
    c1.parentNode.insertAdjacentElement('afterend', template.content.firstElementChild.cloneNode(true));
    c1.addEventListener('click', function(){
    
    });
}, {once: true});