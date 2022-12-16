/* ABORDAGEM SIMPLIFICADA
const botaoAsh = document.querySelector('#btn__ash');
const botaoPikachu = document.querySelector('#btn__pikachu');
const botaoCharmander = document.querySelector('#btn__charmander');

const areaImagens = document.querySelector('.area__imagens');

function criarImagemAsh() {
  const imagemExiste = document.querySelector('.img__personagem');

  if (imagemExiste) {
    areaImagens.removeChild(imagemExiste);
  }

  const imgAsh = document.createElement('img');

  imgAsh.classList.add('img__personagem');
  imgAsh.src = './ash.png';
  imgAsh.alt = 'Um menino alto usando boné';

  areaImagens.appendChild(imgAsh);
}

function criarImagemPikachu() {
  const imagemExiste = document.querySelector('.img__personagem');

  if (imagemExiste) {
    areaImagens.removeChild(imagemExiste);
  }

  const imgPikachu = document.createElement('img');

  imgPikachu.classList.add('img__personagem');
  imgPikachu.src = './pikachu.png';
  imgPikachu.alt = 'Um monstrinho amarelo';

  areaImagens.appendChild(imgPikachu);
}

function criarImagemCharmander() {
  const imagemExiste = document.querySelector('.img__personagem');

  if (imagemExiste) {
    areaImagens.removeChild(imagemExiste);
  }

  const imgCharmander = document.createElement('img');

  imgCharmander.classList.add('img__personagem');
  imgCharmander.src = './charmander.png';
  imgCharmander.alt = 'Um monstrinho com fogo no rabo';

  areaImagens.appendChild(imgCharmander);
}

botaoAsh.addEventListener('click', criarImagemAsh);
botaoPikachu.addEventListener('click', criarImagemPikachu);
botaoCharmander.addEventListener('click', criarImagemCharmander);
*/

/*
UMA ÚNICA FUNÇÃO
*/

const botaoAsh = document.querySelector('#btn__ash');
const botaoPikachu = document.querySelector('#btn__pikachu');
const botaoCharmander = document.querySelector('#btn__charmander');

const areaImagens = document.querySelector('.area__imagens');

function criarImagem(caminhoDaImagem, textoAlt) {
  const imagemExiste = document.querySelector('.img__personagem');

  if (imagemExiste) {
    areaImagens.removeChild(imagemExiste);
  }

  const img = document.createElement('img');

  img.classList.add('img__personagem');
  img.src = `${caminhoDaImagem}`;
  img.alt = `${textoAlt}`;

  areaImagens.appendChild(img);
}

botaoAsh.addEventListener('click', () => criarImagem('./ash.png', 'Um garoto usando boné'));
botaoPikachu.addEventListener('click', () => criarImagem('./pikachu.png', 'Um monstrinho amarelo'));
botaoCharmander.addEventListener('click', () =>
  criarImagem('./charmander.png', 'Um monstrinho vermelho'),
);
