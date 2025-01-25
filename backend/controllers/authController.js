const registerUser = (req, res) => {
  res.send('user register');
};

const loginUser = (req, res) => {
  res.send('user login');
};

module.exports = {
  registerUser,
  loginUser,
};
