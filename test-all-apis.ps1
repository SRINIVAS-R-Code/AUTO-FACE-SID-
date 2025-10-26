# Test All API Endpoints

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TESTING ALL API ENDPOINTS" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

$results = @()

# Test 1: Root Endpoint
Write-Host "1. Testing GET / ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS" -ForegroundColor Green
    $results += "✅ GET / - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET / - Failed"
}

# Test 2: Data Endpoint
Write-Host "`n2. Testing GET /api/data ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/data" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: $($response.message)" -ForegroundColor Green
    $results += "✅ GET /api/data - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/data - Failed"
}

# Test 3: Database Test
Write-Host "`n3. Testing GET /api/db-test ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/db-test" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Database connected" -ForegroundColor Green
    $results += "✅ GET /api/db-test - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/db-test - Failed"
}

# Test 4: Users
Write-Host "`n4. Testing GET /api/users ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/users" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) users" -ForegroundColor Green
    $results += "✅ GET /api/users - Working ($($response.Count) users)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/users - Failed"
}

# Test 5: Employees
Write-Host "`n5. Testing GET /api/employees ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/employees" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) employees" -ForegroundColor Green
    $results += "✅ GET /api/employees - Working ($($response.Count) employees)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/employees - Failed"
}

# Test 6: Attendance
Write-Host "`n6. Testing GET /api/attendance ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/attendance" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) records" -ForegroundColor Green
    $results += "✅ GET /api/attendance - Working ($($response.Count) records)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/attendance - Failed"
}

# Test 7: Performance
Write-Host "`n7. Testing GET /api/performance ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/performance" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) records" -ForegroundColor Green
    $results += "✅ GET /api/performance - Working ($($response.Count) records)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/performance - Failed"
}

# Test 8: Camera Active Streams
Write-Host "`n8. Testing GET /api/camera/active-streams ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/camera/active-streams" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) active streams" -ForegroundColor Green
    $results += "✅ GET /api/camera/active-streams - Working ($($response.Count) streams)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/camera/active-streams - Failed"
}

# Test 9: Monitoring Events
Write-Host "`n9. Testing GET /api/monitoring/events ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/monitoring/events?limit=5" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Found $($response.Count) events" -ForegroundColor Green
    $results += "✅ GET /api/monitoring/events - Working ($($response.Count) events)"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/monitoring/events - Failed"
}

# Test 10: Monitoring Summary
Write-Host "`n10. Testing GET /api/monitoring/summary ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/monitoring/summary" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Total events: $($response.totalEvents)" -ForegroundColor Green
    $results += "✅ GET /api/monitoring/summary - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/monitoring/summary - Failed"
}

# Test 11: Monitoring Status
Write-Host "`n11. Testing GET /api/monitoring/status ..." -ForegroundColor Yellow
try {
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/monitoring/status" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: Service running: $($response.isRunning)" -ForegroundColor Green
    $results += "✅ GET /api/monitoring/status - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ GET /api/monitoring/status - Failed"
}

# Test 12: Camera Status Update (POST)
Write-Host "`n12. Testing POST /api/camera/status ..." -ForegroundColor Yellow
try {
    $body = '{"user_id":2,"is_active":true}'
    $response = Invoke-RestMethod -Uri "http://localhost:5000/api/camera/status" -Method POST -Body $body -ContentType "application/json" -ErrorAction Stop
    Write-Host "   ✅ SUCCESS: $($response.message)" -ForegroundColor Green
    $results += "✅ POST /api/camera/status - Working"
} catch {
    Write-Host "   ❌ FAILED: $($_.Exception.Message)" -ForegroundColor Red
    $results += "❌ POST /api/camera/status - Failed"
}

# Summary
Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  TEST SUMMARY" -ForegroundColor Cyan
Write-Host "========================================`n" -ForegroundColor Cyan

foreach ($result in $results) {
    if ($result -like "✅*") {
        Write-Host $result -ForegroundColor Green
    } else {
        Write-Host $result -ForegroundColor Red
    }
}

$successCount = ($results | Where-Object { $_ -like "✅*" }).Count
$totalCount = $results.Count

Write-Host "`n========================================" -ForegroundColor Cyan
Write-Host "  RESULTS: $successCount/$totalCount PASSED" -ForegroundColor $(if ($successCount -eq $totalCount) { "Green" } else { "Yellow" })
Write-Host "========================================`n" -ForegroundColor Cyan
