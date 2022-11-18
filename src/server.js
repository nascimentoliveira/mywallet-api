import app from './app.js';

const port = process.env.PORT || 9999;

app.listen(port, function (err) {
  if (err) console.log('Failed to start the server -', err);
  console.log('APP Server listening on port', port);
});