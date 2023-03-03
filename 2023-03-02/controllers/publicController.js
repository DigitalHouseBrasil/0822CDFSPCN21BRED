function showLoginForm(req, res) {
  res.render('loginForm');
}

function showRegisterForm(req, res) {
  res.render('registerForm');
}

module.exports = {
  showLoginForm,
  showRegisterForm,
};
