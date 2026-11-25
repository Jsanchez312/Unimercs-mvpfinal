const path     = require('path');
const fs       = require('fs');
require('dotenv').config({ path: path.join(__dirname, '.env') });
require('dotenv').config();

const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');

const app = express();

// Middlewares globales
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

// Asegurar carpeta de uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}
app.use('/uploads', express.static(uploadsDir));

// Servir frontend estático directamente para facilidad de acceso
const frontendDir = path.join(__dirname, '../src/test/html');
if (fs.existsSync(frontendDir)) {
  // The interface files are edited frequently while the marketplace is in
  // development. Avoid serving an old shared translation script from cache.
  app.use(express.static(frontendDir, {
    setHeaders(res, filePath) {
      if (filePath.endsWith('.html') || filePath.endsWith('site.js')) {
        res.setHeader('Cache-Control', 'no-store');
      }
    }
  }));
}

// Rutas de la API UniMercs
app.use('/api/auth',          require('./routes/auth'));
app.use('/api/posts',         require('./routes/posts'));
app.use('/api/reviews',       require('./routes/reviews'));
app.use('/api/reports',       require('./routes/reports'));
app.use('/api/safezones',     require('./routes/safezones'));
app.use('/api/notifications', require('./routes/notifications'));
app.use('/api/admin',         require('./routes/admin'));
app.use('/api/health',        require('./routes/health'));

// Middleware de manejo de errores global (RNF-07)
app.use((err, req, res, next) => {
  console.error('❌ Error no controlado en servidor:', err);
  res.status(err.status || 500).json({
    message: err.message || 'Error interno del servidor en UniMercs',
    error: process.env.NODE_ENV === 'production' ? {} : err.stack
  });
});

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('✅ MongoDB conectado exitosamente');
    app.listen(PORT, () => {
      console.log(`🚀 Servidor UniMercs activo en http://localhost:${PORT}`);
    });
  })
  .catch(err => {
    console.error('❌ Error crítico de conexión MongoDB:', err.message);
    process.exit(1);
  });
