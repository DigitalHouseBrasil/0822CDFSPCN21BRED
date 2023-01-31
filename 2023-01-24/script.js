const btnPesquisar = document.querySelector('.btn-pesquisar');

btnPesquisar.addEventListener('click', () => {
    const titulo = document.querySelector('#titulo').value;
    const genero = document.querySelector('#genero').value;
    const ano = document.querySelector('#ano').value;
    const nota = document.querySelector('#nota').value;

    const query = new URLSearchParams();
    query.set('titulo', titulo);
    query.set('genero', genero);
    query.set('ano', ano);
    query.set('nota', nota);

    location.href = `./index.html?${query.toString()}`;
});

const ul = document.querySelector('.filmes');
let filmes = [];
let filmesFavoritos = [];

if (localStorage.getItem('filmesFavoritos')) {
    filmesFavoritos = JSON.parse(localStorage.getItem('filmesFavoritos')); // string => obj
}

const query = new URLSearchParams(location.search);
// const titulo = query.get('titulo') || '';
// const genero = query.get('genero') || '';
// const ano = query.get('ano') || '';
// const nota = query.get('nota') || '';

// const queryBackend = new URLSearchParams();
// queryBackend.set('titulo', titulo);
// queryBackend.set('genero', genero);
// queryBackend.set('ano', ano);
// queryBackend.set('nota', nota);

// console.log(queryBackend.toString())

fetch(`http://localhost:3000/filmes?${query.toString()}`)
    .then(resposta => resposta.json())
    .then(filmesRecebidos => filmes = filmesRecebidos)
    .then(mostrarNaTela);

function mostrarNaTela() {
    ul.innerHTML = '';
    filmes.forEach(filme => {
        ul.innerHTML += `
            <li>
                <h2>${filme.titulo}</h2>
                <p>Gênero: ${filme.genero}</p>
                <p>Ano: ${filme.ano}</p>
                <p>Avaliação: ${filme.nota} <i class="bi-star-fill"></i></p>
                <footer>
                    <i class="bi-heart-fill ${filmesFavoritos.includes(filme.id) ? 'favorito' : ''} " onclick="adicionarAosFavoritos('${filme.id}')"></i>
                </footer>
            </li>
        `
    });
}

function adicionarAosFavoritos(id) {
    if (filmesFavoritos.includes(id)) {
        filmesFavoritos = filmesFavoritos.filter(filme => filme !== id);
    } else {
        filmesFavoritos.push(id);
    }

    localStorage.setItem('filmesFavoritos', JSON.stringify(filmesFavoritos)); // obj => string

    mostrarNaTela();
}