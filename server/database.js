const mongoose = require('mongoose');

const connectDB = async () => {
    const options = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 20000, 
        socketTimeoutMS: 45000, 
        connectTimeoutMS: 30000 
    };

    try {
        await mongoose.connect(process.env.MONGODB_URI, options);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Failed to connect to MongoDB:', error);
    }
};

module.exports = connectDB;
