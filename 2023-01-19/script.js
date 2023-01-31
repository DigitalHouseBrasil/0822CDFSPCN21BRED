const formulario = document.querySelector('#formulario');
const btnMostrarSenha = document.querySelector('#mostrar');
const ul = document.querySelector('#erros');

const inputSenha = document.querySelector('#senha');
console.log(inputSenha);

const inputNome = document.querySelector('#nome');

const aceitoTermos = document.querySelector('#aceito');

btnMostrarSenha.addEventListener('click', () => {
    if (inputSenha.type === 'password') {
        inputSenha.type = 'text';
        btnMostrarSenha.textContent = 'Esconder senha';
    } else {
        inputSenha.type = 'password';
        btnMostrarSenha.textContent = 'Mostrar senha';
    }
});

formulario.addEventListener('submit', (evento) => {
    evento.preventDefault();
    console.log('Submit');

    const senha = inputSenha.value;
    console.log(senha);

    const erros = validarSenha(senha);

    ul.innerHTML = '';
    if (erros.length > 0) {
        erros.forEach((erro) => {
            const li = document.createElement('li');
            li.textContent = erro;
            ul.appendChild(li);
        });
    } else if (aceitoTermos.checked) {
        formulario.submit();
    }
});

inputNome.addEventListener('focus', () => {
    inputNome.style.outline = 0;
    inputNome.style.borderLeft = 0;
    inputNome.style.borderTop = 0;
    inputNome.style.borderRight = 0;
});

inputNome.addEventListener('blur', () => {
    inputNome.style.border = '1px solid #ccc';
});

inputSenha.addEventListener('input', () => {
    const erros = validarSenha(inputSenha.value);

    ul.innerHTML = '';

    if (erros.length > 0) {
        inputSenha.style.outlineColor = 'red';
        erros.forEach((erro) => {
            const li = document.createElement('li');
            li.textContent = erro;
            ul.appendChild(li);
        });
    } else {
        inputSenha.style.outlineColor = 'green';
    }
});

function validarSenha(senha) {
    const erros = [];

    // Reg Exp

    if (senha.length < 8) {
        erros.push('Senha deve ter pelo menos 8 caracteres');
    }
    if (/[a-z]/g.test(senha) === false) {
        erros.push('Senha precisa de pelo menos uma letra minúscula');
    }
    if (/[A-Z]/g.test(senha) === false) {
        erros.push('Senha precisa de pelo menos uma letra maiúscula');
    }
    if (/[0-9]/g.test(senha) === false) {
        erros.push('Senha precisa de pelo menos um número');
    }
    if (/[!@#$%&*]/g.test(senha) === false) {
        erros.push('Senha precisa de pelo menos um caractere especial');
    }

    return erros;
}

// submit, focus, blur, input