const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const crearAdmin = require('./config/adminSeeder');

const authRoutes = require('./routes/authRoutes');

const app = express();

connectDB().then(() => {
    crearAdmin();
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'MediConnect API funcionando'
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});