const User = require('./userModel');
const userController = {};

userController.createUser = (req, res) => {
  User.create(req.body, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json({'success': 'yes'})
    }
  })
}

module.exports = userController;