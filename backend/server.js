const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
require('dotenv').config();

// Importar configuración de base de datos
const connectDB = require('./config/database');

// Importar rutas
const memberRoutes = require('./routes/memberRoutes');
const newsRoutes = require('./routes/newsRoutes');

// Importar middleware de errores
const errorHandler = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 3000;

// Conectar a la base de datos
connectDB();

// Middleware de seguridad
app.use(helmet());

// Middleware de CORS
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}));

// Middleware de logging
app.use(morgan('combined'));

// Middleware para parsear JSON
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Ruta de prueba
app.get('/', (req, res) => {
    res.json({ 
        message: 'Club Vicentinos API', 
        version: '1.0.0',
        status: 'running',
        endpoints: {
            members: '/api/members',
            news: '/api/news'
        }
    });
});

// Ruta de health check
app.get('/health', (req, res) => {
    res.json({ 
        status: 'OK', 
        timestamp: new Date().toISOString(),
        database: 'Connected'
    });
});

// Rutas de la API
app.use('/api/members', memberRoutes);
app.use('/api/news', newsRoutes);

// Middleware de manejo de errores (debe ir después de las rutas)
app.use(errorHandler);

// Ruta 404
app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📱 Frontend URL: ${process.env.FRONTEND_URL || 'http://localhost:5173'}`);
    console.log(`🔗 API URL: http://localhost:${PORT}`);
    console.log(`📦 Database: ${process.env.MONGODB_URI || 'mongodb://localhost:27017/club-vicentinos'}`);
});

module.exports = app; 