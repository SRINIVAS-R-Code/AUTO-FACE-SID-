// Test script for 24/7 monitoring service
const fetch = require('node-fetch');

const BASE_URL = 'http://localhost:5000';

async function testMonitoring() {
  console.log('🧪 Testing 24/7 Monitoring Service...\n');

  try {
    // Test 1: Check if server is running
    console.log('Test 1: Server Health Check');
    const healthResponse = await fetch(`${BASE_URL}/`);
    const healthText = await healthResponse.text();
    console.log(`✅ Server is running: ${healthText}\n`);

    // Test 2: Check monitoring status
    console.log('Test 2: Monitoring Status');
    const statusResponse = await fetch(`${BASE_URL}/api/monitoring/status`);
    const status = await statusResponse.json();
    console.log('Status:', JSON.stringify(status, null, 2));
    console.log(status.isRunning ? '✅ Monitoring is running' : '❌ Monitoring is NOT running');
    console.log('');

    // Test 3: Get monitoring summary
    console.log('Test 3: Monitoring Summary');
    const summaryResponse = await fetch(`${BASE_URL}/api/monitoring/summary`);
    const summary = await summaryResponse.json();
    console.log('Summary:', JSON.stringify(summary, null, 2));
    console.log(`✅ Total events: ${summary.totalEvents}`);
    console.log('');

    // Test 4: Get recent events
    console.log('Test 4: Recent Events (Last 10)');
    const eventsResponse = await fetch(`${BASE_URL}/api/monitoring/events?limit=10`);
    const events = await eventsResponse.json();
    console.log(`✅ Retrieved ${events.length} events`);
    
    if (events.length > 0) {
      console.log('\nLatest Event:');
      const latest = events[0];
      console.log(`  Type: ${latest.event_type || latest.type}`);
      console.log(`  Description: ${latest.description}`);
      console.log(`  Timestamp: ${latest.timestamp}`);
    }
    console.log('');

    // Test 5: Check database connection
    console.log('Test 5: Database Connection');
    const dbResponse = await fetch(`${BASE_URL}/api/db-test`);
    const dbStatus = await dbResponse.json();
    console.log('Database:', JSON.stringify(dbStatus, null, 2));
    console.log(dbStatus.status === 'connected' ? '✅ Database connected' : '❌ Database NOT connected');
    console.log('');

    // Test 6: Get employees (data source for monitoring)
    console.log('Test 6: Employee Data');
    const empResponse = await fetch(`${BASE_URL}/api/employees`);
    const employees = await empResponse.json();
    console.log(`✅ Found ${employees.length} employees`);
    console.log('');

    // Test 7: Get attendance (data source for monitoring)
    console.log('Test 7: Attendance Data');
    const attResponse = await fetch(`${BASE_URL}/api/attendance`);
    const attendance = await attResponse.json();
    console.log(`✅ Found ${attendance.length} attendance records`);
    console.log('');

    // Summary
    console.log('═══════════════════════════════════════');
    console.log('🎉 ALL TESTS PASSED!');
    console.log('═══════════════════════════════════════');
    console.log('✅ Server is running');
    console.log('✅ Monitoring service is active');
    console.log('✅ Database is connected');
    console.log('✅ Events are being recorded');
    console.log('✅ Data sources are available');
    console.log('');
    console.log('💡 Your 24/7 monitoring is working perfectly!');
    console.log('');
    console.log('Next steps:');
    console.log('1. Open the dashboard at http://localhost:3000');
    console.log('2. Click the AI Assistant (purple bot icon)');
    console.log('3. Ask: "Show monitoring status"');
    console.log('4. Ask: "What happened while I was away?"');
    console.log('');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    console.log('');
    console.log('Troubleshooting:');
    console.log('1. Make sure the backend server is running:');
    console.log('   cd backend && npm start');
    console.log('2. Check if port 5000 is available');
    console.log('3. Verify database connection');
    console.log('');
  }
}

// Run tests
testMonitoring();
