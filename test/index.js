const app = require('./../server/server.js');
const request = require('supertest')(app);
const expect = require('chai').expect;
const User = require('./../server/user/userModel');
const bcrypt = require('bcryptjs');
const sinon = require('sinon');

describe('Tests', () => {
  beforeEach((done) => {
    User.remove({}, () => {
      User.create({
        username: 'david',
        password: 'aight'
      }, (err, user) => {
        id = user.id;
        done();
      });
    });
  });

  describe('Creating users', () => {

    it('POST request to "/" route with correctly formatted body creates a user', (done) => {
      request
        .post('/')
        .send({"username": "test1", "password" : "password1"})
        .type('form')
        .end((err, res) => {
          User.findOne({username: 'test1'}, (err, user) => {
            expect(err).to.be.null;
            expect(user).to.exist;
            done();
          });
        });
    });
  });
});
