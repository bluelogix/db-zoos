const express = require('express');
const helmet = require('helmet');
// const router = Router();
const knex = require('knex');

const server = express();

server.use(express.json());
server.use(helmet());

const knexConfig = {
  client: 'sqlite3',
  useNullAsDefault: true,
  connection: {
    filename: './data/lambda.sqlite3'

  }
}
const db = knex(knexConfig)

////////// ENDPOINTS //////////

//POST 
server.post('/api/zoos', (req, res) => {
  db('zoos')
  .insert(req.body)
  .then(zooId => {
    const [id] = zooId
    db('zoos')
    .where({ id })
    .first()
    .then(zoo => {
      res.status(200).json(zoo)
    })
  })
  .catch(err => {
    res.status(500).json(err)
  })
})





// GET
server.get('/api/zoos', (req, res) => {
  db('zoos')
  .then(zoos => {
    res.status(200).json(zoos)
  })
  .catch(error => {
    res.status(500).json(error)
  })
});

const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

