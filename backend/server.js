const express = require('express');
const cors = require('cors');
require('dotenv').config();

const connectDB = require('./config/database');
const crearAdmin = require('./config/adminSeeder');

const authRoutes = require('./routes/authRoutes');
const pacienteRoutes = require('./routes/pacienteRoutes');
const doctorRoutes = require('./routes/doctorRoutes');
const especialidadRoutes =
    require('./routes/especialidadRoutes');
const citaRoutes = require('./routes/citaRoutes');
const historialRoutes =
    require('./routes/historialRoutes');
const recetaRoutes = require('./routes/recetaRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();

connectDB().then(() => {
    crearAdmin();
});

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/pacientes', pacienteRoutes);
app.use('/api/doctores', doctorRoutes);
app.use(
    '/api/especialidades',
    especialidadRoutes
);
app.use('/api/citas', citaRoutes);
app.use('/api/historiales', historialRoutes);
app.use('/api/recetas', recetaRoutes);

app.get('/', (req, res) => {
    res.json({
        message: 'MediConnect API funcionando'
    });
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});