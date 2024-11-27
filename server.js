const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const roleRoutes = require('./routes/roleRoutes');  
const permissionRoutes = require('./routes/permissionRoutes');  
//const errorHandler = require('./middleware/errorHandler');  
//const logAudit = require('./middleware/logAudit');  
const rateLimiter = require('./middleware/rateLimiter');  
//const csrfProtection = require('./middleware/csrfProtection');

dotenv.config();

const app = express();
app.use(express.json());  
//app.use(logAudit);        
app.use(rateLimiter);     
//app.use(csrfProtection);  
app.use('/api/auth', authRoutes);
app.use('/api/roles', roleRoutes);  
app.use('/api/permissions', permissionRoutes);  
app.all('*', (req, res) => {
  res.status(404).json({ message: 'Endpoint not found' });
});
//app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
