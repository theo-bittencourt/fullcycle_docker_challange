const express = require('express');
const { faker } = require('@faker-js/faker');

const app = express();
const port = 3000;

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
};

const mysql = require('mysql');
const connection = mysql.createConnection(config);
connection.query(
  `create table if not exists people (id int primary key auto_increment, name varchar(255))`
);
connection.end();

app.get('/', (req, res) => {
  const connection = mysql.createConnection(config);

  connection.query(
    `INSERT INTO people(name) values("${faker.name.findName()}")`
  );

  let allNames = null;

  connection.query(`SELECT * FROM people`, (err, results) => {
    allNames = results.map((person) => person.name);

    res.send(`
      <h1>Full Cycle</h1>
      <ul>
        ${
          (allNames || []).map((name) => '<li>' + name + '</li>').join('')
        }
      </ul>
    `);
  });

  connection.end();
});

app.listen(port, () => {
  console.log('Rodando na porta ' + port);
});
