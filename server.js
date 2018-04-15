const { createServer } = require('http');
const next = require('next');

const app = next({
  dev: process.env.NODE_ENV !== 'production'
});

const routes = require('./routes');
const handler = app.getRequestHandler(routes)

app.prepare().then( () => {
  createServer(handler).listen( 3000, (err) => {
    if (err) throw err;
    console.log('Wapgate locked on localhost:3000');
  });
});