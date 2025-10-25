// Complete Connection Checker
const http = require('http');
const pool = require('./db');

console.log('🔍 Checking All Connections...\n');

// Test 1: Database Connection
async function checkDatabase() {
  console.log('1️⃣ Testing Database Connection...');
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Database: CONNECTED');
    console.log(`   Time: ${result.rows[0].now}`);
    return true;
  } catch (error) {
    console.log('❌ Database: FAILED');
    console.log(`   Error: ${error.message}`);
    return false;
  }
}

// Test 2: Backend Server
function checkBackendServer() {
  console.log('\n2️⃣ Testing Backend Server (Port 5000)...');
  return new Promise((resolve) => {
    const req = http.get('http://localhost:5000/', (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log('✅ Backend Server: RUNNING');
        console.log(`   Response: ${data}`);
        resolve(true);
      });
    });
    
    req.on('error', (error) => {
      console.log('❌ Backend Server: NOT RUNNING');
      console.log(`   Error: ${error.message}`);
      console.log('   Fix: cd backend && npm start');
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      console.log('❌ Backend Server: TIMEOUT');
      resolve(false);
    });
  });
}

// Test 3: API Endpoints
function checkAPIEndpoint(endpoint) {
  return new Promise((resolve) => {
    const req = http.get(`http://localhost:5000${endpoint}`, (res) => {
      let data = '';
      res.on('data', (chunk) => { data += chunk; });
      res.on('end', () => {
        console.log(`✅ ${endpoint}: WORKING`);
        resolve(true);
      });
    });
    
    req.on('error', () => {
      console.log(`❌ ${endpoint}: FAILED`);
      resolve(false);
    });
    
    req.setTimeout(3000, () => {
      req.destroy();
      console.log(`❌ ${endpoint}: TIMEOUT`);
      resolve(false);
    });
  });
}

// Test 4: Check Tables
async function checkTables() {
  console.log('\n4️⃣ Testing Database Tables...');
  const tables = ['users', 'employees', 'attendance', 'performance'];
  
  for (const table of tables) {
    try {
      const result = await pool.query(`SELECT COUNT(*) FROM ${table}`);
      console.log(`✅ Table '${table}': EXISTS (${result.rows[0].count} rows)`);
    } catch (error) {
      console.log(`❌ Table '${table}': NOT FOUND`);
    }
  }
}

// Run All Tests
async function runAllTests() {
  console.log('═══════════════════════════════════════\n');
  
  // Test Database
  const dbOk = await checkDatabase();
  
  // Test Backend Server
  const serverOk = await checkBackendServer();
  
  // Test API Endpoints
  if (serverOk) {
    console.log('\n3️⃣ Testing API Endpoints...');
    await checkAPIEndpoint('/api/data');
    await checkAPIEndpoint('/api/employees');
    await checkAPIEndpoint('/api/attendance');
  }
  
  // Test Tables
  if (dbOk) {
    await checkTables();
  }
  
  // Summary
  console.log('\n═══════════════════════════════════════');
  console.log('📊 SUMMARY\n');
  
  if (dbOk && serverOk) {
    console.log('✅ ALL SYSTEMS OPERATIONAL');
    console.log('\n🚀 You can now start the frontend:');
    console.log('   npm run dev');
  } else {
    console.log('❌ ISSUES FOUND\n');
    
    if (!dbOk) {
      console.log('🔧 Database Issue:');
      console.log('   1. Check PostgreSQL is running');
      console.log('   2. Check database credentials in db.js');
      console.log('   3. Run: node check-db.js\n');
    }
    
    if (!serverOk) {
      console.log('🔧 Backend Server Issue:');
      console.log('   1. Start backend: cd backend && npm start');
      console.log('   2. Check port 5000 is not in use');
      console.log('   3. Install dependencies: npm install\n');
    }
  }
  
  console.log('═══════════════════════════════════════\n');
  
  // Close database connection
  await pool.end();
  process.exit(dbOk && serverOk ? 0 : 1);
}

// Run
runAllTests().catch(error => {
  console.error('❌ Test failed:', error);
  process.exit(1);
});
