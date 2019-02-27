const router = require('express').Router();
const knex = require('knex');

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
router.post('/', (req, res) => {
    db('zoos')
    .insert(req.body)
    .then(zooId => {
      const [id] = zooId
      db('zoos')
      .where({ id })
      .first()
      .then(zoo => {
        res.status(201).json(zoo)
      })
    })
    .catch(err => {
      res.status(500).json({err: 'Error adding a new zoo' })
    })
  })
  
  // GET
  router.get('/', (req, res) => {
    db('zoos')
    .then(zoos => {
      res.status(200).json(zoos)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  });
  
  
  //GET BY ID
  router.get('/api/zoos/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .then(zoo => {
      res.status(200).json(zoo)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  })
  
  //DELETE
  router.delete('/api/zoos/:id', (req, res) => {
    db('zoos')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0 ) {
        res.status(200).json({ message: 'deleted correctly' })
      } else {
        res.status(404).json({ message: 'name cannot be found'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
    
  });
  
  
  //PUT
  router.put('/api/zoos/:id', (req, res) => {
   db('zoos')
   .where({ id: req.params.id })
   .update(req.body)
   .then(count => { 
     if(count) {
       db('zoos')
       .where({ id: req.params.id })
       .first()
       .then(zoo => {
         res.status(200).json(zoo)
       })
     } else {
       res.status(404).json({ message: 'zoo not found'})
     }
   })
   .catch(error => {
     res.status(500).json(error)
   })
  });

module.exports = router;
