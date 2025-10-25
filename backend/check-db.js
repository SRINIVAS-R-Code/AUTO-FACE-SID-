const pool = require('./db');

async function checkDB() {
  try {
    // Check tables
    const tables = await pool.query("SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' ORDER BY table_name");
    console.log('=== DATABASE TABLES ===');
    tables.rows.forEach(r => console.log('✓', r.table_name));
    
    // Check data counts
    console.log('\n=== DATA COUNTS ===');
    const users = await pool.query('SELECT COUNT(*) FROM users');
    console.log('✓ Users:', users.rows[0].count);
    
    const employees = await pool.query('SELECT COUNT(*) FROM employees');
    console.log('✓ Employees:', employees.rows[0].count);
    
    const attendance = await pool.query('SELECT COUNT(*) FROM attendance');
    console.log('✓ Attendance:', attendance.rows[0].count);
    
    const notifications = await pool.query('SELECT COUNT(*) FROM notifications');
    console.log('✓ Notifications:', notifications.rows[0].count);
    
    const activity = await pool.query('SELECT COUNT(*) FROM activity');
    console.log('✓ Activity:', activity.rows[0].count);
    
    const performance = await pool.query('SELECT COUNT(*) FROM performance');
    console.log('✓ Performance:', performance.rows[0].count);
    
    const face_logs = await pool.query('SELECT COUNT(*) FROM face_recognition_logs');
    console.log('✓ Face Recognition Logs:', face_logs.rows[0].count);
    
    console.log('\n=== DATABASE STATUS: ✓ HEALTHY ===');
    pool.end();
  } catch (err) {
    console.error('✗ Database Error:', err.message);
    pool.end();
  }
}

checkDB();
