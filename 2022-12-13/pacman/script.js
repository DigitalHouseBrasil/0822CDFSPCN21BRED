const divContainer = document.querySelector('.container');
const imgPacman = document.querySelector('.pacman');

let y = 0;
let x = 0;

function paraDireita() {
  x = x + 10;
  imgPacman.style.left = x + 'px';
}

function paraEsquerda() {
  x = x - 10;
  imgPacman.style.left = x + 'px';
}

function paraCima() {
  y = y - 10;
  imgPacman.style.top = y + 'px';
}

function paraBaixo() {
  y = y + 10;
  imgPacman.style.top = y + 'px';
}

function mover(evento) {
  if (evento.keyCode === 38) {
    paraCima();
  } else if (evento.keyCode === 37) {
    paraEsquerda();
  } else if (evento.keyCode === 39) {
    paraDireita();
  } else if (evento.keyCode === 40) {
    paraBaixo();
  }
}

document.addEventListener('keydown', mover);
