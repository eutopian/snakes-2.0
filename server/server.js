require('dotenv').config();

const express = require('express');
const http = require('http');
const app = express();
const path = require('path');

//JSON PARSER
const bodyParser = require('body-parser');

//MONGO DB
const mongoose = require('mongoose');
const mongoUsername = process.env.MONGOUSER
const mongoPassword = process.env.MONGOPASS
const mongoApp = process.env.MONGOAPP
const mongoNum = process.env.MONGONUM
const mongoClient = process.env.MONGOCLIENT

//SOCKET IO
const socketIO = require('socket.io');
const server = http.Server(app);
const io = socketIO(server);

//CONTROLLERS
const userController = require('./user/userController');

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@${mongoNum}.mlab.com:${mongoClient}/${mongoApp}`);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.post('/', userController.createUser)

app.get('/games', userController.getAllUsers);

app.use(express.static(__dirname +'./../'));

io.on('connection', function(socket) {
});

setInterval(function() {
  io.sockets.emit('message', 'hi!');
}, 1000);

app.listen(3000); 

module.exports = app;
