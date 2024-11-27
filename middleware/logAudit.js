const fs = require('fs');
const logAudit = (req, res, next) => {
  const logEntry = `${new Date().toISOString()} - ${req.method} ${req.url} - ${req.user.email}\n`;
  fs.appendFile('audit.log', logEntry, (err) => {
    if (err) console.error('Failed to write audit log:', err);
  });
  next();
};

module.exports = logAudit;
