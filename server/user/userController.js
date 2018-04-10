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

module.exports = userController;