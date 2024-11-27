const logAudit = (req, res, next) => {
  if (req.user && req.user.email) {
      console.log(`Audit log: User ${req.user.email} accessed ${req.originalUrl}`);
  } else {
      console.log('Audit log: Email not available');
  }
  next();
};

module.exports = logAudit;
