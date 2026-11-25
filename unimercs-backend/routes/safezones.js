const express = require('express');
const router  = express.Router();
const { SAFE_ZONES, SAFETY_TIPS } = require('../services/safeZones');

// GET /api/safezones (HU-12 / RF-12: Puntos de Encuentro Seguros Javeriana)
router.get('/', (req, res) => {
  res.json({
    university: 'Pontificia Universidad Javeriana - Sede Central Bogotá',
    safeZones: SAFE_ZONES,
    safetyTips: SAFETY_TIPS
  });
});

module.exports = router;
