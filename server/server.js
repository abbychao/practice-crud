const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./userController');
const app = express();

app.use(express.static('client'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../client/index.html')));

app.post('/users', userController.create);
app.put('/users', userController.update);
app.get('/users', userController.getAll);
app.delete('/users', userController.deleteById);


app.listen(3000);
