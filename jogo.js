const pessoa = document.querySelector('.pessoa1');
const tijolo = document.querySelector('.tijolo');
const sol = document.querySelector('.sol');
const background = document.querySelector('.game-board');
const pontoEl = document.getElementById('ponto');
const morteEl = document.getElementById('morte');
const reiniciarId = document.getElementById('reiniciar');
const inicioId = document.getElementById('inicio');

let pontos = 0;
let mortes = 0;
let jogoAtivo = true;

// pulo
const jump = () => {
  pessoa.classList.add('jump');
  setTimeout(() => pessoa.classList.remove('jump'), 500);
};


// arrumar para inciar depois que clicar no botao start do card

// pontos
setInterval(() => {
  if (jogoAtivo) {
    pontos++;
    pontoEl.textContent = `Pontos: ${pontos}`;
  } else {
    reiniciarId.style.visibility = 'visible';
    inicioId.style.visibility = 'visible';
  }
}, 1000);

// loop de colisão (recriável)
let loop;
function startLoop() {
  loop = setInterval(() => {
    const tijoloPosition = +getComputedStyle(tijolo).left.replace('px','');
    const pessoaPosition = +getComputedStyle(pessoa).bottom.replace('px','');
    const solPosition = +getComputedStyle(sol).left.replace('px','');

    // --- condição: sol chegou no canto esquerdo ---
    if (solPosition <= 0) {
      jogoAtivo = false;
      reiniciarId.style.visibility = 'visible';
      inicioId.style.visibility = 'visible';

      // congelar posições
      sol.style.animation = 'none';
      sol.style.left = '0px';

      tijolo.style.animation = 'none';
      tijolo.style.left = `${tijoloPosition}px`;

      pessoa.style.animation = 'none';
      pessoa.style.bottom = `${pessoaPosition}px`;

      clearInterval(loop);
      return; // evita checar colisão depois
    }

    // --- colisão com tijolo ---
    if (tijoloPosition <= 118 && tijoloPosition > 0 && pessoaPosition < 70) {
      mortes++;
      morteEl.textContent = `Mortes: ${mortes}`;
      jogoAtivo = false;

      // congelar posições
      sol.style.animation = 'none';
      sol.style.left = `${solPosition}px`;

      tijolo.style.animation = 'none';
      tijolo.style.left = `${tijoloPosition}px`;

      pessoa.style.animation = 'none';
      pessoa.style.bottom = `${pessoaPosition}px`;

      // visual de "morte"
      sol.src = './img/Lua.png';
      sol.style.width = '190px';
      background.style.background = 'linear-gradient(#060057, #0051ffa6)';

      pessoa.src = './img/pessoa-triste.png';
      pessoa.style.width = '90px';
      pessoa.style.marginLeft = '25px';
      pessoa.style.marginBottom = '0px';

      clearInterval(loop);
    }
  }, 5);
}
startLoop();

// reiniciar rodada (sem perder pontos/mortes)
function iniciarJogo() {
  jogoAtivo = true;
  reiniciarId.style.visibility = 'hidden';
  inicioId.style.visibility = 'hidden';
  pontos = 0;
  pontoEl.textContent = 'Pontos: 0';
  pontoEl.textContent = `Pontos: ${pontos}`;

  // limpar posições inline que travam a animação (keyframes usam "right")
  tijolo.style.left = '';
  tijolo.style.right = '';
  sol.style.left = '';
  sol.style.right = '';
  pessoa.style.bottom = '';

  // resetar animações (toggle + reflow para garantir restart)
  tijolo.style.animation = 'none';
  sol.style.animation = 'none';
  void tijolo.offsetWidth; // força reflow
  void sol.offsetWidth;
  
  pessoa.style.animation = '';

  tijolo.style.animation = 'tijolo-animation 1.5s linear infinite';
  sol.style.animation = 'sol-animation 20s linear infinite';
  
  // restaurar sprites/estilos
  sol.src = './img/sol.png';
  sol.style.width = '240px';
  background.style.background = 'linear-gradient(#ffae00, #fbff00)';

  pessoa.src = './img/pessoa-correndo.gif';
  pessoa.style.width = '140px';
  pessoa.style.marginLeft = '0';
  pessoa.style.marginBottom = '0';

  // recriar o loop de colisão
  startLoop();
}

// botão
reiniciarId.addEventListener('click', () => {
  iniciarJogo();
});

inicioId.addEventListener('click', () => {
  window.location.href = 'telaInicial.html'
})

// espaço para pular
document.addEventListener('keydown', (event) => {
  if (event.code === 'Space' && jogoAtivo) jump();
});
