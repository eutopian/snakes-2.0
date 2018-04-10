require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const userController = require('./user/userController');
const mongoUsername = process.env.MONGOUSER
const mongoPassword = process.env.MONGOPASS
const mongoApp = process.env.MONGOAPP
const mongoNum = process.env.MONGONUM
const mongoClient = process.env.MONGOCLIENT

app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(`mongodb://${mongoUsername}:${mongoPassword}@${mongoNum}.mlab.com:${mongoClient}/${mongoApp}`);
mongoose.connection.once('open', () => {
  console.log('Connected to Database');
});

app.post('/', userController.createUser)

app.use(express.static(__dirname +'./../'));
app.listen(3000); 

module.exports = app;
