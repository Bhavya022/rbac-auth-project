const jwt = require('jsonwebtoken');

// Authenticate user
exports.authenticate = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) return res.status(401).json({ message: 'Access denied' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Authorize based on roles
exports.authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    const userRoles = req.user.roles.map(role => role.name);
    if (!allowedRoles.some(role => userRoles.includes(role))) {
      return res.status(403).json({ message: 'Forbidden: Access denied' });
    }
    next();
  };
};
