const express  = require('express');
const router   = express.Router();
const User     = require('../models/user');
const Post     = require('../models/post');
const Report   = require('../models/report');
const Review   = require('../models/review');
const AuditLog = require('../models/auditLog');
const Notification = require('../models/notification');
const { protect, adminOnly } = require('../middleware/auth');
const { sendNotification } = require('../services/notificationService');

// Todos los endpoints de este router requieren estar autenticado y ser Administrador
router.use(protect, adminOnly);

// GET /api/admin/dashboard-stats
router.get('/dashboard-stats', async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalPosts = await Post.countDocuments();
    const totalReports = await Report.countDocuments();
    const pendingReports = await Report.countDocuments({ status: 'pendiente' });
    const bannedUsers = await User.countDocuments({ status: 'banned' });

    res.json({
      totalUsers,
      totalPosts,
      totalReports,
      pendingReports,
      bannedUsers
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/reports (HU-15 / RF-15)
router.get('/reports', async (req, res) => {
  try {
    const { status } = req.query;
    const filter = status && status !== 'all' ? { status } : {};
    const reports = await Report.find(filter).sort({ createdAt: -1 });
    res.json(reports);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/admin/reports/:id (HU-15, RNF-03)
router.patch('/reports/:id', async (req, res) => {
  try {
    const { status, actionTaken } = req.body;
    const report = await Report.findById(req.params.id);
    if (!report) return res.status(404).json({ message: 'Reporte no encontrado' });

    report.status = status || report.status;
    report.actionTaken = actionTaken || report.actionTaken;
    report.resolvedBy = req.user.id;
    report.resolvedAt = new Date();
    await report.save();

    // RNF-03: Registrar en AuditLog
    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'RESOLVE_REPORT',
      targetType: report.targetType,
      targetId: report.targetId,
      details: `Reporte ${report._id} actualizado a ${report.status}. Acción: ${report.actionTaken || 'N/A'}`,
      ip: req.ip || ''
    });

    // Notificar al reportero (HU-17)
    await sendNotification({
      userId: report.reporterId,
      title: 'Actualizacion sobre tu reporte',
      message: `Tu reporte sobre "${report.targetTitle || report.targetType}" ha sido procesado con estado: "${report.status}".`,
      type: 'report_update'
    });

    res.json({ message: 'Reporte actualizado correctamente', report });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/users
router.get('/users', async (req, res) => {
  try {
    const { search, status } = req.query;
    const filter = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    if (status && status !== 'all') {
      filter.status = status;
    }

    const users = await User.find(filter).select('-passwordHash').sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/users/:id/ban (HU-16, RNF-03)
router.post('/users/:id/ban', async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.status = 'banned';
    await user.save();

    // Desactivar / marcar vendidos sus posts para evitar fraudes
    await Post.updateMany({ sellerId: user._id }, { status: 'Vendido' });

    // RNF-03: Registrar acción de baneo en AuditLog
    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'BAN_USER',
      targetType: 'user',
      targetId: user._id.toString(),
      details: `Usuario ${user.email} baneado permanentemente. Motivo: ${reason || 'Infracción grave a las políticas del mercado seguro'}`,
      ip: req.ip || ''
    });

    res.json({ message: `Usuario ${user.name} (${user.email}) ha sido baneado permanentemente.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/users/:id/suspend (HU-16, RNF-03)
router.post('/users/:id/suspend', async (req, res) => {
  try {
    const { reason } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.status = 'suspended';
    await user.save();

    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'SUSPEND_USER',
      targetType: 'user',
      targetId: user._id.toString(),
      details: `Usuario ${user.email} suspendido temporalmente. Motivo: ${reason || 'Investigación preventiva de reporte'}`,
      ip: req.ip || ''
    });

    res.json({ message: `Usuario ${user.name} (${user.email}) ha sido suspendido temporalmente.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/admin/users/:id/activate (HU-16, RNF-03)
router.post('/users/:id/activate', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.status = 'active';
    await user.save();

    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'ACTIVATE_USER',
      targetType: 'user',
      targetId: user._id.toString(),
      details: `Usuario ${user.email} reactivado con estado activo.`,
      ip: req.ip || ''
    });

    res.json({ message: `Usuario ${user.name} (${user.email}) reactivado exitosamente.` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE /api/admin/posts/:id (HU-15, RNF-03)
router.delete('/posts/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: 'Publicación no encontrada' });

    const postTitle = post.title;
    const sellerId = post.sellerId;
    await post.deleteOne();

    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'DELETE_POST',
      targetType: 'post',
      targetId: req.params.id,
      details: `Publicación "${postTitle}" eliminada por moderación administrativa.`,
      ip: req.ip || ''
    });

    await sendNotification({
      userId: sellerId,
      title: 'Publicacion eliminada por moderacion',
      message: `Tu publicacion "${postTitle}" fue retirada por incumplimiento de las politicas de UniMercs.`,
      type: 'system'
    });

    res.json({ message: 'Publicación eliminada por el Administrador.' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PATCH /api/admin/users/:id/role (Cambiar rol / tipo de cuenta)
router.patch('/users/:id/role', async (req, res) => {
  try {
    const { role, accountType } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    if (role && ['user', 'admin'].includes(role)) user.role = role;
    if (accountType && ['buyer', 'seller', 'store'].includes(accountType)) user.accountType = accountType;

    await user.save();

    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'UPDATE_USER_ROLE',
      targetType: 'user',
      targetId: user._id.toString(),
      details: `Rol de usuario ${user.email} actualizado a Rol: ${user.role}, Tipo: ${user.accountType}`,
      ip: req.ip || ''
    });

    res.json({ message: `Rol y cuenta de ${user.name} actualizados exitosamente.`, user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/posts (Listado completo de inventario/publicaciones)
router.get('/posts', async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/audit-logs (HU-NF-03 / RNF-03)
router.get('/audit-logs', async (req, res) => {
  try {
    const logs = await AuditLog.find().sort({ createdAt: -1 }).limit(100);
    res.json(logs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET /api/admin/backup (HU-NF-08 / RNF-08: Copias de seguridad diarias de base de datos)
router.get('/backup', async (req, res) => {
  try {
    const users = await User.find().select('-passwordHash').lean();
    const posts = await Post.find().lean();
    const reviews = await Review.find().lean();
    const reports = await Report.find().lean();
    const auditLogs = await AuditLog.find().lean();

    const backupData = {
      timestamp: new Date().toISOString(),
      backupVersion: '1.0',
      system: 'UniMercs Javeriana Database Backup',
      counts: {
        users: users.length,
        posts: posts.length,
        reviews: reviews.length,
        reports: reports.length,
        auditLogs: auditLogs.length
      },
      collections: {
        users,
        posts,
        reviews,
        reports,
        auditLogs
      }
    };

    await AuditLog.create({
      adminId: req.user.id,
      adminEmail: req.user.email,
      action: 'EXPORT_BACKUP',
      targetType: 'system',
      targetId: 'database',
      details: `Backup completo generado con ${users.length} usuarios y ${posts.length} publicaciones.`,
      ip: req.ip || ''
    });

    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', `attachment; filename=unimercs_backup_${Date.now()}.json`);
    res.json(backupData);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
