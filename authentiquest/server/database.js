const mongoose = require('mongoose');

const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000, // Keep this as your server selection timeout
        socketTimeoutMS: 45000, // Extend socket operations timeout
        connectTimeoutMS: 30000 // Optional: increase connection timeout
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

module.exports = connectDB;
