const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  highScore: {type: Number, default: null}
});

userSchema.post('validate', (doc) => {
  if (doc.password) {
    doc.password = bcrypt.hashSync(doc.password, SALT_WORK_FACTOR)
  }
})

module.exports = mongoose.model('User', userSchema)