# 2023-03-28 ~ 2023-04-04v - Sequelize

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

Os callbacks das migrations recebem `queryInterface` (responsável pelos comandos do SQL) e `Sequelize` (que contém os tipos de variáveis). **Antes de criar uma migração, verifique a necessidade de criar o relacionamento entre as tabelas no tópico 8.1, abaixo.** A estritura é a seguinte:

```js
async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
        [nome da tabela],
        {
            [nome da coluna]: { [configuracoes]} 
        }
    )
}
```

## 7. Criando os modelos

Um modelo é um objeto que representa, no lado do JavaScript, uma tabela do banco de dados SQL.

### 7.1 Cria a classe do modelo

A classe que representará a tabela é criada na pasta `models`. Cada arquivo que representará cada classe terá que importar, pelo menos, as classes `Model` e `DataTypes` da biblioteca `sequelize`.

```js
const { Model, DataTypes } = require('sequelize');
```

Logo após, criamos a classe extendendo a classe `Model`. Essa classe deve, obrigatoriamente, implementar o médodo estático `init()`, que receberá a conexão como argumento. Ess conexão tem o nome padrão de `sequelize`.

```js
class User extends Model {
    static init (sequelize) {
        // implementação
    }
}
```

Esse método é proveniente da superclasse `Model` e recebe dois objetos como argumento, um contendo as colunas como chave e o tipo de dados como valor. O segundo é a própria conexão, por padrão: `sequelize`. No nosso exemplo:

```js
class User extends Model {
    static init (sequelize) {
        super.init({
            name: DataTypes.STRING,
        }, {
            sequelize
        })
    }
}
```

### 7.2 Inicializa no arquivo index do banco de dados

Para esses modelos recém criados funcionarem, devem ser importados no índice do banco de dados e seu método init evocado, usando como argumento a conexão.

```js
// Importa o modelo
const User = require('../models/User');

// ...

// Evoca o método init recebendo a conexão
User.init(connection);

// 
```


## 8. Criar os relacionamentos

A criação dos relacionamentos é realizada tanto na parte do banco SQL, através das migrations, quanto nos modelos. 

### 8.1. Criação dos relacionamentos na etapa da criação das migrations
No processos detalhados no tópico 6.1, as colunas que representam chaves estrangeiras devem ser declaradas da seguinte forma:

```js
async up (queryInterface, Sequelize) {
    return queryInterface.createTable(
        [nome da tabela],

        // Demais colunas 

        {
            [nome da coluna da chave estrangeira]: { 
                references: {
                    model: '[nome da tabela original]',
                    key: '[nome da coluna original]'
                },
                onDelete: '[acao a ser realizada se a chave original for deletada]',
                onUpdate: '[acao a ser realizada se a chave original for atualizada]'
            } 
        }

        // Outras colunas
    )
}
```

No código acima, temos o parâmetro `references` que faz alusão ao comando SQL `REFERENCES`, informando um objeto contendo as informações de qual é o nome da tabela `model` e a coluna `key` de onde vêm a chave estrangeira. Ainda, devem ser incluídas as informações de o que será feito se os valores originais da chave estrangeira forem alterados `onUpdate` ou deletados `onDelete`. Todas as opções a esse respeito podem ser consultadas na documentação do Sequelize, [aqui](https://sequelize.org/docs/v6/core-concepts/assocs/#options).

### 8.2 Implementando as associações nos modelos

Quando há tabelas que possuem relacionamentos, além do método `init()`, é necessário implementar o método `associate()` no processo descrito no tipico 7.1 acima. O método `associate()` deverá ser implementado tanto na tabela que contém os valores originais quanto na tabela que conterá a chave estrangeira.

**Na tabela original**, recebe todos os modelos do banco como argumento (geralmente nomeado como `models`) e sua implementação aponta qual a tabela que recebe a chave estrangeira `models.[nome da tabela]`, além de um método de `this` que especifica qual é o tipo de relacionamento que recebe um objeto contendo um objeto que contém, no mínimo qual é nome da coluna que recebe a chave estrangeira `foreginKey` e qual será o nome que se dará para esse relacionamento `as`. Esse nome de relacionamento será útil na hora de sua utilização.

```js
class [nome da tabela] extends Model {

    // Restante do código ...

    static associate (models) {
        this.[tipo de relacionamento](
            models.[nome da tabela que tem a classe estrangeira],
            {
                foreignKey: 'categoryId',
                as: '[nome do relacionamento]'
            }
        )
    };

    // Restante do código.
}
```

**Já na tabela que recebe a chave estrangeira,** o que muda é que deve ser informado o modelo referente à tabela que contém a chave original. Além disso, on nome do relacionamento deve ser diferente. Por exemplo, em um relacionamento entre uma tabela `Categories` e `Users`, podemos nomear o relacionamento em `Categories` de `members`, já que os usuários que usarão sua chave como estrangeira serão "os membros daquela categoria"; por sua vez, na tabela `Users`, o nome do relacionamento pode ser `member`, já que cada usuário é "membro daquela categoria".

Sobre o método que aponta qual é o tipo de relacionamento geralmente serão "tem um" `.hasOne` ou "tem muitos" `.hasMany` na tabela original e "pertence a um" `.belongsTo` ou "pertence a muitos" `belongsToMany` nas tabelas que conterão a chave estrangeira e cada combinação desses pares gerarão os muitos tipos de relacionamentos: um para um, um para muitos ou muitos para muitos.


| Tabela original | Tabela que recebe a chave estrangeira | Relacionamento |
| --- | --- | --- |
| `hasOne` | `belongsTo` | um para um |
| `hasMany` | `belongsTo` | muitos para um |
| `hasOne` | `belongsToMany` | um para muitos |
| `hasMany` | `belongsToMany` | muitos para muitos |

## 8.3 Inicializa os relacionamentos no index do banco de dados

A exemplo do que foi feito com o método `init` dos modelos no tópico 7.2 acima, o método `associate` também deve ser inicializado no banco de dados. Isso deve ser feito evocando o método no arquivo, mas passando apenas o objeto de modelos que está na conexão `connection.models`  ao invés de toda a conexão.

```js
// Importa o modelo
const User = require('../models/User');

// ...

// Evoca o método init recebendo os modelos do objeto de conexão
User.associate(connection.models);

// 
```

### 8.4 Utilização dos relacionamentos

A forma mais tradicional de utilizar os relacionamentos através das associações é através dos métodos de  consulta, como `.findAll()` ou `.findByPk()`. Nesse caso, deve-se passar um objeto com o parâmetro `include` que, por sua vez, também trará um objeto com o parâmetro `association` que terá como valor o nome da associação que se deseja invocar, assim:

```js
.findAll({
        include: {
            association: '[nome da associação]'
        }
    })
```

# Status

Concluído ✅

# Instruções para utilizar os arquivos

 - Acesse esta pasta pelo repositório local, em seu computador
 - Preencha os dados referentes ao acesso de seu banco de dados no arquivo `config/database.js`, sobretudo usuário e senha.
 - Instale as dependências com `npm i`
 - Crie o banco com `npx sequelize db:create` e as migrações com `npx sequelize db:migrate`
 - Inicie o projeto com `node app.js` ou `nodemon app.js`