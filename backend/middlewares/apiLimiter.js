const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 1000 * 60 * 5,
  max: 30,
  message: { msg: 'IP rate limit exceeded,try again after 5 mins' },
});

module.exports = apiLimiter;
