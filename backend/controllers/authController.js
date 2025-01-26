const {
  validateRegisterUserInput,
  validateLoginUserInput,
} = require('../middlewares/validations');
const { StatusCodes } = require('http-status-codes');
const { hashPassword, comparePassword } = require('../utils/passwordUtils');
const User = require('../models/userModel');
const {
  BadRequestError,
  UnauthenticatedError,
} = require('../errors/customError');
const { createJWT } = require('../utils/tokenUtils');

const registerUser = async (req, res) => {
  // validate user input
  const validData = validateRegisterUserInput(req.body);

  const { username, password } = validData;

  // check if the user already registered
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new BadRequestError(`user already registered`);
  }

  // hash the password
  const hashedPassword = await hashPassword(password);
  validData.password = hashedPassword;

  // create user
  const user = await User.create(validData);

  // create jwt token
  const token = createJWT({ userId: user._id, username: user.username });

  // filter user data to send
  const userInfo = user.toJSON();

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'user registered', user: { ...userInfo, token } });
};

const loginUser = async (req, res) => {
  // validate user data
  const validData = validateLoginUserInput(req.body);

  const { username, password } = validData;

  // check if the user exists
  const user = await User.findOne({ username });

  // check if the password is correct
  const isValidUser = user && (await comparePassword(password, user.password));

  if (!isValidUser) throw new UnauthenticatedError('invalid credentials');

  // setting up token
  const token = createJWT({ userId: user._id, username: user.username });

  // filter user data to send
  const userInfo = user.toJSON();

  res
    .status(StatusCodes.OK)
    .json({ msg: 'user logged in', user: { ...userInfo, token } });
};

module.exports = {
  registerUser,
  loginUser,
};
