const pug = document.querySelector('.pug');
const pizza = document.querySelector('.pizza');
const sol = document.querySelector('.sol');
const background = document.querySelector('.game-board');
const pontoEl = document.getElementById('ponto');
const morteEl = document.getElementById('morte');
const reiniciarId = document.getElementById('reiniciar');

let pontos = 0;
let mortes = 0;
let jogoAtivo = true;

// pulo
const jump = () => {
  pug.classList.add('jump');
  setTimeout(() => pug.classList.remove('jump'), 500);
};

// pontos
setInterval(() => {
  if (jogoAtivo) {
    pontos++;
    pontoEl.textContent = `Pontos: ${pontos}`;
  } else {
    reiniciarId.style.visibility = 'visible';
  }
}, 1000);

// loop de colisão (recriável)
let loop;
function startLoop() {
  loop = setInterval(() => {
    const pizzaPosition = +getComputedStyle(pizza).left.replace('px','');
    const pugPosition   = +getComputedStyle(pug).bottom.replace('px','');
    const solPosition   = +getComputedStyle(sol).left.replace('px','');

    if (pizzaPosition <= 118 && pizzaPosition > 0 && pugPosition < -8) {
      mortes++;
      morteEl.textContent = `Mortes: ${mortes}`;
      jogoAtivo = false;

      // congelar posições
      sol.style.animation = 'none';
      sol.style.left = `${solPosition}px`;

      pizza.style.animation = 'none';
      pizza.style.left = `${pizzaPosition}px`;

      pug.style.animation = 'none';
      pug.style.bottom = `${pugPosition}px`;

      // visual de "morte"
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
}
startLoop();

// reiniciar rodada (sem perder pontos/mortes)
function iniciarJogo() {
  jogoAtivo = true;
  reiniciarId.style.visibility = 'hidden';
  pontos = 0;
  pontoEl.textContent = 'Pontos: 0';
  pontoEl.textContent = `Pontos: ${pontos}`;

  // limpar posições inline que travam a animação (keyframes usam "right")
  pizza.style.left = '';
  pizza.style.right = '';
  sol.style.left = '';
  sol.style.right = '';
  pug.style.bottom = '';

  // resetar animações (toggle + reflow para garantir restart)
  pizza.style.animation = 'none';
  sol.style.animation = 'none';
  void pizza.offsetWidth; // força reflow
  void sol.offsetWidth;
  
  pug.style.animation = '';

  pizza.style.animation = 'pizza-animation 1.5s linear infinite';
  sol.style.animation = 'sol-animation 25s linear infinite';
  

  // restaurar sprites/estilos
  sol.src = './img/sol.png';
  sol.style.width = '240px';
  background.style.background = 'linear-gradient(#ffae00, #fbff00)';

  pug.src = './img/pugVIni.gif';
  pug.style.width = '240px';
  pug.style.marginLeft = '0';
  pug.style.marginBottom = '0';

  // recriar o loop de colisão
  startLoop();
}

// botão
reiniciarId.addEventListener('click', () => {
  iniciarJogo();
});

// espaço para pular
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && jogoAtivo) jump();
});