# 2023-02-14: CRUD

Aplicação proposta:

 - Aplicar o conceito de CRUD (Create, Read, Update e Detete) com uma aplicação muito simples que cadastra, lista, altera e deleta mensagens quaisquer.
 - No Express:
    - Create: `.post()`
    - Read: `.get()`
    - Update: `.put()`
    - Delete: `.delete()`

Esse métodos homônimos dos "verbos HTTP", que são os métodos GET, PUT, DELETE, POST, mas poucos navegadores possuem implementados os métodos PUT e DELETE, por isso, na camada de view, cosumamos usar um método de override para usar o POST para essas finalidades.

Sempre que desejamos trafegar com informações sigilosas ou com algum grau de seguraça, vamos usar o POST, pois a informação trafega pelo body das requisições e não pela URL.

## Status

Concluído ✅

## Instruções para utilizar os arquivos

 - Acesse esta pasta pelo repositório local, em seu computador
 - Instale as dependências com `npm i`
 - Execute o arquivo `app.js` com o `node` ou o `nodemon`