import express from 'express';
import router from './routes/index.js';

const PORT = 5000;

const app = express();
app.use(express.json());

app.use(router);

app.listen(PORT, function (err) {
  if (err) console.log('Failed to start the server -', err);
  console.log('APP Server listening on port', PORT);
});