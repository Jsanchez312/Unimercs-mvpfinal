const express = require('express');
const router  = express.Router();
const Report  = require('../models/report');
const Post    = require('../models/post');
const User    = require('../models/user');
const { protect } = require('../middleware/auth');
const { sendNotification } = require('../services/notificationService');

// POST /api/reports (HU-14 / RF-14: Reportar publicación o perfil)
router.post('/', protect, async (req, res) => {
  try {
    const { targetType, targetId, reason, description } = req.body;
    if (!targetType || !targetId || !reason || !description) {
      return res.status(400).json({ message: 'Todos los campos del reporte son obligatorios' });
    }

    let targetTitle = '';
    if (targetType === 'post') {
      const post = await Post.findById(targetId);
      if (post) targetTitle = post.title;
    } else if (targetType === 'user') {
      const user = await User.findById(targetId);
      if (user) targetTitle = user.name;
    }

    const report = await Report.create({
      reporterId:    req.user.id,
      reporterName:  req.user.name,
      reporterEmail: req.user.email,
      targetType,
      targetId,
      targetTitle,
      reason,
      description:   description.trim(),
      status:        'pendiente'
    });

    // Notificar al estudiante que su reporte fue recibido (HU-17)
    await sendNotification({
      userId: req.user.id,
      title: 'Reporte recibido',
      message: `Hemos recibido tu reporte sobre "${targetTitle || targetType}". El equipo de moderacion lo revisara.`,
      type: 'report_update'
    });

    res.status(201).json({ message: 'Reporte enviado exitosamente. Gracias por proteger a la comunidad.', report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/reports/my-reports (HU-17)
router.get('/my-reports', protect, async (req, res) => {
  try {
    const reports = await Report.find({ reporterId: req.user.id }).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
