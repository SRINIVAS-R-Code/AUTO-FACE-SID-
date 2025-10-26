const pool = require('./db');

async function createCameraTable() {
  try {
    console.log('Creating camera_streams table...');
    
    // Create table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS camera_streams (
        user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
        is_active BOOLEAN DEFAULT false,
        last_updated TIMESTAMP DEFAULT NOW()
      )
    `);
    console.log('✅ Table created successfully');
    
    // Create indexes
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_camera_streams_active ON camera_streams(is_active)
    `);
    await pool.query(`
      CREATE INDEX IF NOT EXISTS idx_camera_streams_updated ON camera_streams(last_updated)
    `);
    console.log('✅ Indexes created successfully');
    
    // Insert test data
    await pool.query(`
      INSERT INTO camera_streams (user_id, is_active, last_updated)
      VALUES 
        (1, false, NOW()),
        (2, false, NOW())
      ON CONFLICT (user_id) DO NOTHING
    `);
    console.log('✅ Test data inserted');
    
    // Verify
    const result = await pool.query('SELECT * FROM camera_streams');
    console.log('\n📊 Current camera_streams data:');
    console.table(result.rows);
    
    console.log('\n✅ Camera streams table is ready!');
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

createCameraTable();
