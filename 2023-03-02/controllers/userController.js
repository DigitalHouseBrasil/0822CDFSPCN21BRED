const userModel = require('../models/User');

function login(req, res) {
  const sentData = req.body;
  const isAuth = userModel.authUser(req, sentData);
  isAuth ? res.send(req.session) : res.send('não')
};

module.exports = {
  login,
};
