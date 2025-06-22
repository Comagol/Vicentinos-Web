const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/club-vicentinos');
        
        console.log(`📦 MongoDB Connected: ${conn.connection.host}`);
        
        // Configuración adicional de Mongoose
        mongoose.set('debug', process.env.NODE_ENV === 'development');
        
    } catch (error) {
        console.error('❌ Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB; 