const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://bhavya:bhavya@cluster0.kin5ecd.mongodb.net/rbac_auth?retryWrites=true&w=majority', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected');
  } catch (err) {
    console.error('DB Connection Error:', err);
    process.exit(1);
  }
};

connectDB();
