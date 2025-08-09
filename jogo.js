const pug = document.querySelector('.pug');
const pizza = document.querySelector('.pizza');

const jump = () => {
    pug.classList.add('jump')

    setTimeout(() =>{
        pug.classList.remove('jump')
    }, 500)
}

const loop = setInterval(() => {

    const pizzaPosition = +window.getComputedStyle(pizza).left.replace('px', '')
    const pugPosition = +window.getComputedStyle(pug).bottom.replace('px', '');

    if(pizzaPosition <= 118 && pizzaPosition > 0 && pugPosition < -8) {

        pizza.style.animation = 'none';
        pizza.style.left = `${pizzaPosition}px`;

        pug.style.animation = 'none';
        pug.style.bottom = `${pugPosition}px`;
        

        pug.src = './img/pugViniTriste.png'
        pug.style.width = '90px'
        pug.style.marginLeft = '80px'
        pug.style.marginBottom = '80px'

        clearInterval(loop)

    }

}, 5);

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space'){
        jump();
    }
})       