const pool = require('./db');

// Monitoring service that runs 24/7 on the backend
class MonitoringService {
  constructor() {
    this.monitoringInterval = null;
    this.isRunning = false;
    this.events = [];
    this.maxEvents = 1000; // Store last 1000 events
  }

  // Start the monitoring service
  start() {
    if (this.isRunning) {
      console.log('⚠️  Monitoring service is already running');
      return;
    }

    console.log('🔍 Starting 24/7 Monitoring Service...');
    this.isRunning = true;

    // Run monitoring every 30 seconds
    this.monitoringInterval = setInterval(() => {
      this.monitorDashboard();
    }, 30000);

    // Initial check
    this.monitorDashboard();

    console.log('✅ 24/7 Monitoring Service started successfully!');
  }

  // Stop the monitoring service
  stop() {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = null;
    }
    this.isRunning = false;
    console.log('🛑 Monitoring Service stopped');
  }

  // Main monitoring function
  async monitorDashboard() {
    try {
      const timestamp = new Date();
      console.log(`🔍 [${timestamp.toLocaleTimeString()}] Running monitoring check...`);

      // Monitor employees
      await this.monitorEmployees(timestamp);

      // Monitor attendance
      await this.monitorAttendance(timestamp);

      // Monitor performance
      await this.monitorPerformance(timestamp);

      // Monitor login activity
      await this.monitorLoginActivity(timestamp);

      // Clean old events (keep last 1000)
      if (this.events.length > this.maxEvents) {
        this.events = this.events.slice(-this.maxEvents);
      }

      console.log(`✅ [${timestamp.toLocaleTimeString()}] Monitoring check complete. Total events: ${this.events.length}`);
    } catch (error) {
      console.error('❌ Monitoring error:', error.message);
      this.logEvent('error', 'Monitoring Error', { error: error.message });
    }
  }

  // Monitor employee status
  async monitorEmployees(timestamp) {
    try {
      const result = await pool.query(`
        SELECT 
          e.id,
          e.first_name || ' ' || e.last_name as name,
          e.department,
          e.position,
          u.email
        FROM employees e
        JOIN users u ON e.user_id = u.id
        ORDER BY e.id
      `);

      const employees = result.rows;

      // Check for employees without recent attendance
      const todayAttendance = await pool.query(`
        SELECT DISTINCT employee_id 
        FROM attendance 
        WHERE date = CURRENT_DATE
      `);

      const presentEmployeeIds = todayAttendance.rows.map(row => row.employee_id);
      const absentEmployees = employees.filter(emp => !presentEmployeeIds.includes(emp.id));

      if (absentEmployees.length > 0) {
        absentEmployees.forEach(emp => {
          this.logEvent('employee_absent', `${emp.name} has no attendance record today`, {
            employee_id: emp.id,
            name: emp.name,
            department: emp.department,
            position: emp.position
          }, timestamp);
        });
      }

      // Log employee count
      this.logEvent('employee_count', `Total employees: ${employees.length}`, {
        total: employees.length,
        present: presentEmployeeIds.length,
        absent: absentEmployees.length
      }, timestamp);

    } catch (error) {
      console.error('Error monitoring employees:', error.message);
    }
  }

  // Monitor attendance records
  async monitorAttendance(timestamp) {
    try {
      // Get today's attendance
      const result = await pool.query(`
        SELECT 
          a.*,
          e.first_name || ' ' || e.last_name as employee_name
        FROM attendance a
        JOIN employees e ON a.employee_id = e.id
        WHERE a.date = CURRENT_DATE
        ORDER BY a.check_in DESC
      `);

      const todayAttendance = result.rows;

      if (todayAttendance.length > 0) {
        const presentCount = todayAttendance.filter(att => att.status === 'present').length;
        const attendanceRate = ((presentCount / todayAttendance.length) * 100).toFixed(1);

        this.logEvent('attendance_summary', `Today's attendance: ${todayAttendance.length} records`, {
          total_records: todayAttendance.length,
          present: presentCount,
          attendance_rate: attendanceRate,
          latest_checkin: todayAttendance[0]
        }, timestamp);
      }

      // Check for recent check-ins (last 5 minutes)
      const recentCheckIns = await pool.query(`
        SELECT 
          a.*,
          e.first_name || ' ' || e.last_name as employee_name
        FROM attendance a
        JOIN employees e ON a.employee_id = e.id
        WHERE a.check_in >= NOW() - INTERVAL '5 minutes'
        ORDER BY a.check_in DESC
      `);

      if (recentCheckIns.rows.length > 0) {
        recentCheckIns.rows.forEach(checkin => {
          this.logEvent('recent_checkin', `${checkin.employee_name} checked in`, {
            employee_id: checkin.employee_id,
            employee_name: checkin.employee_name,
            check_in: checkin.check_in,
            status: checkin.status
          }, timestamp);
        });
      }

    } catch (error) {
      console.error('Error monitoring attendance:', error.message);
    }
  }

  // Monitor performance metrics
  async monitorPerformance(timestamp) {
    try {
      const result = await pool.query(`
        SELECT 
          AVG(productivity_score) as avg_productivity,
          AVG(quality_score) as avg_quality,
          COUNT(*) as total_records
        FROM performance
        WHERE date >= CURRENT_DATE - INTERVAL '7 days'
      `);

      if (result.rows.length > 0 && result.rows[0].total_records > 0) {
        const stats = result.rows[0];
        this.logEvent('performance_summary', 'Weekly performance metrics', {
          avg_productivity: parseFloat(stats.avg_productivity).toFixed(2),
          avg_quality: parseFloat(stats.avg_quality).toFixed(2),
          total_records: parseInt(stats.total_records)
        }, timestamp);
      }

    } catch (error) {
      console.error('Error monitoring performance:', error.message);
    }
  }

  // Monitor login activity
  async monitorLoginActivity(timestamp) {
    try {
      // Get recent logins (last 5 minutes)
      const result = await pool.query(`
        SELECT 
          a.*,
          e.first_name || ' ' || e.last_name as employee_name
        FROM activity a
        LEFT JOIN employees e ON a.employee_id = e.id
        WHERE a.activity_type = 'login'
        AND a.timestamp >= NOW() - INTERVAL '5 minutes'
        ORDER BY a.timestamp DESC
      `);

      if (result.rows.length > 0) {
        result.rows.forEach(login => {
          this.logEvent('recent_login', `Login detected: ${login.employee_name || 'Unknown'}`, {
            employee_id: login.employee_id,
            employee_name: login.employee_name,
            details: login.details,
            login_time: login.timestamp
          }, timestamp);
        });
      }

    } catch (error) {
      console.error('Error monitoring login activity:', error.message);
    }
  }

  // Log an event
  logEvent(type, description, data = {}, timestamp = new Date()) {
    const event = {
      id: this.events.length + 1,
      timestamp,
      type,
      description,
      data
    };

    this.events.push(event);

    // Also save to database for persistence
    this.saveEventToDatabase(event);
  }

  // Save event to database
  async saveEventToDatabase(event) {
    try {
      await pool.query(
        `INSERT INTO monitoring_events (event_type, description, event_data, timestamp) 
         VALUES ($1, $2, $3, $4)`,
        [event.type, event.description, JSON.stringify(event.data), event.timestamp]
      );
    } catch (error) {
      // If table doesn't exist, create it
      if (error.code === '42P01') {
        await this.createMonitoringTable();
        // Retry
        await pool.query(
          `INSERT INTO monitoring_events (event_type, description, event_data, timestamp) 
           VALUES ($1, $2, $3, $4)`,
          [event.type, event.description, JSON.stringify(event.data), event.timestamp]
        );
      }
    }
  }

  // Create monitoring events table
  async createMonitoringTable() {
    try {
      await pool.query(`
        CREATE TABLE IF NOT EXISTS monitoring_events (
          id SERIAL PRIMARY KEY,
          event_type VARCHAR(100) NOT NULL,
          description TEXT,
          event_data JSONB,
          timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
      `);
      console.log('✅ Monitoring events table created');
    } catch (error) {
      console.error('Error creating monitoring table:', error.message);
    }
  }

  // Get events (for API)
  getEvents(limit = 50, type = null, since = null) {
    let filteredEvents = [...this.events];

    // Filter by type
    if (type) {
      filteredEvents = filteredEvents.filter(event => event.type === type);
    }

    // Filter by time
    if (since) {
      const sinceDate = new Date(since);
      filteredEvents = filteredEvents.filter(event => event.timestamp >= sinceDate);
    }

    // Sort by timestamp (newest first)
    filteredEvents.sort((a, b) => b.timestamp - a.timestamp);

    // Limit results
    return filteredEvents.slice(0, limit);
  }

  // Get events from database
  async getEventsFromDatabase(limit = 50, type = null, since = null) {
    try {
      let query = 'SELECT * FROM monitoring_events WHERE 1=1';
      const params = [];
      let paramCount = 1;

      if (type) {
        query += ` AND event_type = $${paramCount}`;
        params.push(type);
        paramCount++;
      }

      if (since) {
        query += ` AND timestamp >= $${paramCount}`;
        params.push(since);
        paramCount++;
      }

      query += ` ORDER BY timestamp DESC LIMIT $${paramCount}`;
      params.push(limit);

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Error getting events from database:', error.message);
      return [];
    }
  }

  // Get summary
  getSummary() {
    const now = new Date();
    const oneHourAgo = new Date(now - 60 * 60 * 1000);
    const oneDayAgo = new Date(now - 24 * 60 * 60 * 1000);

    const lastHourEvents = this.events.filter(e => e.timestamp >= oneHourAgo);
    const lastDayEvents = this.events.filter(e => e.timestamp >= oneDayAgo);

    const eventsByType = {};
    this.events.forEach(event => {
      eventsByType[event.type] = (eventsByType[event.type] || 0) + 1;
    });

    return {
      isRunning: this.isRunning,
      totalEvents: this.events.length,
      lastHourEvents: lastHourEvents.length,
      lastDayEvents: lastDayEvents.length,
      eventsByType,
      lastCheck: this.events.length > 0 ? this.events[this.events.length - 1].timestamp : null
    };
  }
}

// Create singleton instance
const monitoringService = new MonitoringService();

module.exports = monitoringService;
