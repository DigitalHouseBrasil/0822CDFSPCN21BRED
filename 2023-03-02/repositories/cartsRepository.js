const fs = require('fs');

const DATABASE_PATH = './databases/carts.json';

function readDatabase() {
  const fileBuffer = fs.readFileSync(DATABASE_PATH, 'utf8');
  const database = JSON.parse(fileBuffer);
  return database;
}

function writeDatabase(databaseToWrite) {
  const stringifyiedDatabase = JSON.stringify(databaseToWrite);
  fs.writeFileSync(DATABASE_PATH, stringifyiedDatabase, 'utf8');
}

function generateId() {
  const database = readDatabase();
  const databaseIds = database.map((data) => Number(data.id));
  const lastId = Math.max(...databaseIds);
  const nextId = databaseIds.length === 0 ? 0 : lastId + 1;
  return nextId;
}

function findAll() {
  const database = readDatabase();
  return database;
}

function findByPk(pkToFind) {
  const database = readDatabase();
  const foundData = database.find((data) => data.id == pkToFind);
  return foundData;
}

function create(newData) {
  let database = readDatabase();
  const newId = generateId();
  newData.id = newId;
  database.push(newData);
  writeDatabase(database);
}

function destroy(idToDestroy) {
  let database = readDatabase();
  const dataToDestroy = database.find((data) => data.id == idToDestroy);
  const indexToDestroy = database.indexOf(dataToDestroy);
  database.splice(indexToDestroy, 1);
  writeDatabase(database);
}

function update(idToUpdate, propertyToUpdate, newValue) {
  let database = readDatabase();
  database[idToUpdate][propertyToUpdate] = newValue;
  writeDatabase(database);
}

const defatultBank = [
  { id: 0, nome: 'Fulano', email: 'fulano@mail.com', senha: '123' },
  { id: 1, nome: 'Beltrano', email: 'beltrano@mail.com', senha: 'abc' },
];

writeDatabase(defatultBank);

create({ nome: 'Cicrano', email: 'cicrano@mail.com', senha: '123abc' });

update(0, 'nome', 'Fulano de tal');
destroy(1);
console.log(findAll());
console.log(findByPk(2));
