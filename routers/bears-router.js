const bearRouter = require('express').Router();
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


  // GET
  bearRouter.get('/', (req, res) => {
    db('bears')
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(error => {
      res.status(500).json(error)
    })
  });

  //GET BY ID
  bearRouter.get('/:id', (req, res) => {
    db('bears')
    .where({ id: req.params.id })
    .then(bear => {
      res.status(200).json(bear)
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }) 

//POST 
bearRouter.post('/', (req, res) => {
    db('bears')
    .insert(req.body)
    .then(bearId => {
      const [id] = bearId
      db('bears')
      .where({ id })
      .first()
      .then(bear => {
        res.status(201).json(bear)
      })
    })
    .catch(err => {
      res.status(500).json({err: 'Error adding a new bear' })
    })
  })
  
  
  //DELETE
  bearRouter.delete('/:id', (req, res) => {
    db('bears')
    .where({ id: req.params.id })
    .del()
    .then(count => {
      if(count > 0 ) {
        res.status(200).json({ message: 'deleted correctly' })
      } else {
        res.status(404).json({ message: 'bear cannot be found'})
      }
    })
    .catch(err => {
      res.status(500).json(err)
    })
    
  });
  
  
  //PUT
  bearRouter.put('/:id', (req, res) => {
   db('bears')
   .where({ id: req.params.id })
   .update(req.body)
   .then(count => { 
     if(count) {
       db('bears')
       .where({ id: req.params.id })
       .first()
       .then(bear => {
         res.status(200).json(bear)
       })
     } else {
       res.status(404).json({ message: 'Bear not found'})
     }
   })
   .catch(error => {
     res.status(500).json(error)
   })
  });

module.exports = bearRouter;