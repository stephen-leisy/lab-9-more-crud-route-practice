const express = require('express');
const app = express();

app.use(express.json());

app.use('/api/v1/ghosts', require('./controllers/ghosts'));
app.use('/api/v1/monsters', require('./controllers/monsters'));

app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;
