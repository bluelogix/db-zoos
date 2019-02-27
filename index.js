const express = require('express');
const helmet = require('helmet');


const zooRouter = require('./routers/zoo-router.js');
const bearRouter = require('./routers/bears-router.js');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoos', zooRouter)
server.use('/api/bears', bearRouter)



const port = 3300;
server.listen(port, function() {
  console.log(`\n=== Web API Listening on http://localhost:${port} ===\n`);
});

