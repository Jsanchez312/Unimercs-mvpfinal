const express  = require('express');
const router   = express.Router();
const mongoose = require('mongoose');

// GET /api/health (HU-NF-07 / RNF-07: Disponibilidad y Monitoreo del Sistema)
router.get('/', (req, res) => {
  const mongoStatus = mongoose.connection.readyState === 1 ? 'connected' : 'disconnected';
  const uptime = process.uptime();
  
  res.json({
    status: mongoStatus === 'connected' ? 'OK' : 'DEGRADED',
    timestamp: new Date().toISOString(),
    service: 'UniMercs Javeriana Backend API',
    version: '1.0.0',
    uptimeSeconds: Math.floor(uptime),
    uptimeFormatted: `${Math.floor(uptime / 3600)}h ${Math.floor((uptime % 3600) / 60)}m ${Math.floor(uptime % 60)}s`,
    database: {
      status: mongoStatus,
      name: mongoose.connection.name || 'unimercs'
    },
    memoryUsageMB: Math.round(process.memoryUsage().rss / 1024 / 1024)
  });
});

module.exports = router;
