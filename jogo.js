const pug = document.querySelector('.pug');
const pizza = document.querySelector('.pizza');

const jump = () => {
    pug.classList.add('jump')

    setTimeout(() =>{
        pug.classList.remove('jump')
    }, 500)
}

const loop = setInterval(() => {

    const pizzaPosition = pizza.offsetleft;

    if(pizzaPosition <= 118 && pug <= -40) {

        pizza.style.animation = 'none';

    }

}, 10);

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space'){
        jump();
    }
})       