const notFoundHandler = (req, res) => {
  return res.status(404).json({ msg: `Oops!!! Route does not exist!` });
};

module.exports = notFoundHandler;
