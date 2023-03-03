const usersRepository = require('../repositories/usersRepository');

function authUser(req, sentData) {

  const usersDatabase = usersRepository.findAll();

  const userFromDatabase = usersDatabase.find(
    user => user.username == sentData.username && user.password == sentData.password
  )
  
  if (userFromDatabase) {
    req.session.userData = userFromDatabase;
    return true
  } else {
    return false
  }

};

module.exports = {
  authUser,
};
