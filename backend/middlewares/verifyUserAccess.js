const verifyUserAccess = (req, res, next) => {
  if (String(req.userId) !== String(req.params.userId)) {
    return res.status(403).json({ error: "Access denied" });
  }
  next();
};

module.exports = verifyUserAccess;
