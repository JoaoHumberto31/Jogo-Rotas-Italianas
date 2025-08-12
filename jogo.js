const pug = document.querySelector('.pug');
const pizza = document.querySelector('.pizza');
const sol = document.querySelector('.sol');
const background = document.querySelector('.game-board');
const pontoEl = document.getElementById('ponto');
const morteEl = document.getElementById('morte');

let pontos = 0;
let mortes = 0;
let jogoAtivo = true; // controla se o jogo ainda está rodando

const jump = () => {
    pug.classList.add('jump');
    setTimeout(() => {
        pug.classList.remove('jump');
    }, 500);
};

// Contador de pontos por tempo de sobrevivência
const contadorPontos = setInterval(() => {
    if (jogoAtivo) {
        pontos++;
        pontoEl.textContent = `Pontos: ${pontos}`;
    }
}, 1000); // 1 ponto a cada segundo

const loop = setInterval(() => {
    const pizzaPosition = +window.getComputedStyle(pizza).left.replace('px', '');
    const pugPosition = +window.getComputedStyle(pug).bottom.replace('px', '');
    const solPosition = +window.getComputedStyle(sol).left.replace('px', '');

    // Colisão
    if (pizzaPosition <= 118 && pizzaPosition > 0 && pugPosition < -8) {
        mortes++;
        morteEl.textContent = `Mortes: ${mortes}`;

        // Para o jogo
        jogoAtivo = false;

        sol.style.animation = 'none';
        sol.style.left = `${solPosition}px`;

        pizza.style.animation = 'none';
        pizza.style.left = `${pizzaPosition}px`;

        pug.style.animation = 'none';
        pug.style.bottom = `${pugPosition}px`;

        sol.src = './img/Lua.png';
        sol.style.width = '190px';
        background.style.background = 'linear-gradient(#060057, #0051ffa6)';

        pug.src = './img/pugViniTriste.png';
        pug.style.width = '90px';
        pug.style.marginLeft = '80px';
        pug.style.marginBottom = '80px';

        clearInterval(loop);
    }
}, 5);

document.addEventListener('keydown', (event) => {
    if (event.code == 'Space' && jogoAtivo) {
        jump();
    }
});