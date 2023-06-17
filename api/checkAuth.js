const jwt = require("jsonwebtoken");

const checkAuth = (req, res, next) => {
  const authHeader = req.headers.token;
  if (!authHeader) {
    return res.status(401).json("You are not authenticated!");
  }

  const token = authHeader.split(" ")[1];
  try {
    const user = jwt.verify(token, process.env.SECRET_KEY);
    req.user = user;
    console.log('req.user', req.user);
    next();
  } catch (err) {
    res.status(403).json("Token is not valid!");
  }
}

module.exports = checkAuth;
