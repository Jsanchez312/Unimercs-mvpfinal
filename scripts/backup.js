const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../unimercs-backend/.env') });

const User     = require('../unimercs-backend/models/user');
const Post     = require('../unimercs-backend/models/post');
const Review   = require('../unimercs-backend/models/review');
const Report   = require('../unimercs-backend/models/report');
const AuditLog = require('../unimercs-backend/models/auditLog');

async function runBackup() {
  try {
    console.log('📦 Iniciando copia de seguridad de la base de datos UniMercs...');
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ Conectado a MongoDB para backup');

    const backupDir = path.join(__dirname, '../backups');
    if (!fs.existsSync(backupDir)) {
      fs.mkdirSync(backupDir, { recursive: true });
    }

    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `unimercs_backup_${timestamp}.json`;
    const filePath = path.join(backupDir, filename);

    const [users, posts, reviews, reports, auditLogs] = await Promise.all([
      User.find().select('-passwordHash').lean(),
      Post.find().lean(),
      Review.find().lean(),
      Report.find().lean(),
      AuditLog.find().lean()
    ]);

    const backupData = {
      backupTimestamp: new Date().toISOString(),
      generator: 'UniMercs Automated Backup Task (RNF-08)',
      metrics: {
        users: users.length,
        posts: posts.length,
        reviews: reviews.length,
        reports: reports.length,
        auditLogs: auditLogs.length
      },
      data: {
        users,
        posts,
        reviews,
        reports,
        auditLogs
      }
    };

    fs.writeFileSync(filePath, JSON.stringify(backupData, null, 2), 'utf-8');
    console.log(`🎉 Copia de seguridad generada exitosamente en: ${filePath}`);
    console.log(`📊 Total: ${users.length} usuarios, ${posts.length} publicaciones, ${reviews.length} reseñas, ${reports.length} reportes`);

    await mongoose.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('❌ Error generando copia de seguridad:', err);
    process.exit(1);
  }
}

runBackup();
