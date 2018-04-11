const User = require('./userModel');
const userController = {};

userController.createUser = (req, res) => {
  User.create(req.body, (err, result) => {
    console.log(req.body)
    if (err) {
      // console.log(err)
    } else {
      return res.json({'success': 'yes'})
    }
  })
}

userController.getAllUsers = (req, res) => {
  User.find({}, (err, result) => {
    if (err) {
      console.log(err)
    } else {
      return res.json(result)
    }
  })
}

module.exports = userController;