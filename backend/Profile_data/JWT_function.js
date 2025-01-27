const jwt = require('jsonwebtoken');

// Generate the access token
function generateAccessToken(user) {
  
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET_KEY, { expiresIn: '5d' });
}

// Authenticate and verify the token
const authenticateToken = (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  console.log("accessToken:ke liye :::::::::::::",accessToken);
  

  if (!accessToken) {
    return res.status(401).json({ message: "Unauthorized: Missing token" });
  }

  jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET_KEY, (err, user) => {
    if (err) {
      if (err.name === 'TokenExpiredError') {
        console.error("Token expired");
        return res.status(401).json({ message: "Unauthorized: Token expired" });
      }

      console.error("Invalid token");
      return res.status(401).json({ message: "Unauthorized: Invalid token" });
    }

    req.user = user; // Attach the decoded user payload
    next();
  });
};

module.exports = { generateAccessToken, authenticateToken };

