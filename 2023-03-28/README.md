# 2023-03-28 : Sequelize -- Configuração II e passo a passo

## 1. Iniciar o projeto Node e instalar as dependências na pasta

Além do `npm init -y` para criar o projeto Node, teremos que instalar as dependências. Para essa tarefa específica, é necessário, vamos ter que instalar:
 - O `sequelize` que irá permitir a manipulação do banco SQL pelo JavaScript,
 - O `mysql2` que é o drive do dialeto que iremos usar, e
 - O `sequelize-cli`, que permitirá administrarmos o banco de dados através de linhas de comando `npx`. Essa dependência é usada como dependência de desenvolvimento apenas.

## 2. Criar arquivos de configuração
Os arquivos de configuração contém as informações necessárias sobre senhas, endereços e locais necessários para que todas as conexões possam ser realizadas com sucesso. Ao menos dois arquivos de configuração serão necessários:
- `config/database.js`, é um objeto literal que contém as informações gerais de conexão do banco de dados, como o endereço do servidor `host` a porta `port` o usuário `username` e senha `password`, o nome do bando de dados `database` e o dialeto de SQL `dialect`.
- `.sequelizerc`, é um objeto literal que contém ao menos a propriedade `config`, com o caminho do arquivo `config/database.js` e o `"migrations-path"` que é o caminho da pasta `migrations`.

## 3. Criar o index do database
Esse arquivo tem o nome de `index.js` e fica na raíz da pasta de banco de dados `database`. Sempre que acionado o banco de dados, a seleção cairá diretamente nesse arquivo, que irá garantir que haja conexão e comunicação com o banco de dados.

Essa é a sintaxe básica do arquivo:

```js
// carrega a classe Sequelize como dependência
const Sequelize = require('sequelize');

// Carrega os modelos que estão na pasta
const [nome do modelo] = require('../models/[arquivo do modelo]');

// Carrega as condigurações do banco
const [nome das configuracoes] = require('../config/database');


// Estabelece a conexão
const [nome da conexao] = new Sequelize([variavel de configuracoes]);

// Conecta cada modelo
[nome do modelo].init([nome da conexao]);


// exporta a conexão
module.exports = [nome da conexao];
```

## 4. Conecta ao banco de dados no arquivo do app

Basta inserir: `require([caminho da pasta de banco de dados])` no arquivo `app.js`.

## 5. Criar o banco de dados
Ao rodar `npx sequelize db:create`, será criado o banco de dados informado no arquivo de configuração.

## 6. Criar tabelas
- Inserir o caminho de `migrations-path` no `.sequelizerc`
- Criar a migration de criação das tabelas
    - Criar o template com `npx sequelize migration:create --name=[nome da migration]`
    - Editar o template. A arrow function `up` e `down` contém as instruções a serem realizadas em caso de sucesso ou fracasso da migration. No caso da criação de tabela, é corriqueiro que o sucesso seja a criação de uma tabela e, o fracasso, o contrário disso, ou seja: deletar a tabela.

### 6.1 Função de criação de tabelas
Os callbacks das migrations recebem `queryInterface` (responsável pelos comandos do SQL) e `Sequelize` (que contém os tipos de variáveis). A estritura é a seguinte:
```js
async up (queryInterface, Sequelize) {
    await queryInterface.createTable(
        [nome da tabela],
        {
            [nome da coluna]: { [configuracoes]} 
        }
    )
}
``` 


## 6. Criando os modelos
- Cria a classe do modelo
- Inicializa no arquivo index do banco de dados