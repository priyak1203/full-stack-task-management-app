const { UnauthenticatedError } = require('../errors/customError');
const { verifyJWT } = require('../utils/tokenUtils');

const authenticateUser = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    throw new UnauthenticatedError('Authentication Invalid');
  }

  const token = authHeader.split(' ')[1];

  try {
    const payload = verifyJWT(token);
    const { userId, username } = payload;
    req.user = { userId, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError('Authentication Invalid');
  }
};

module.exports = {
  authenticateUser,
};
