// API service for connecting to the backend

const API_URL = 'http://localhost:5000';

/**
 * Base API request function with error handling
 */
async function apiRequest(endpoint: string, options: RequestInit = {}) {
  const url = `${API_URL}${endpoint}`;
  
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      credentials: 'include', // Include cookies for authentication
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('API request failed:', error);
    throw error;
  }
}

// User related API calls
export const userApi = {
  getAll: () => apiRequest('/api/users'),
  create: (userData: any) => apiRequest('/api/register', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
};

// Employee related API calls
export const employeeApi = {
  getAll: () => apiRequest('/api/employees'),
  getById: (id: string | number) => apiRequest(`/api/employees/${id}`),
};

// Attendance related API calls
export const attendanceApi = {
  getAll: () => apiRequest('/api/attendance'),
};

// Performance related API calls
export const performanceApi = {
  getAll: () => apiRequest('/api/performance'),
};

// Activity related API calls
export const activityApi = {
  create: (activityData: any) => apiRequest('/api/activity', {
    method: 'POST',
    body: JSON.stringify(activityData),
  }),
};

// Face recognition related API calls
export const faceRecognitionApi = {
  logRecognition: (recognitionData: any) => apiRequest('/api/face-recognition', {
    method: 'POST',
    body: JSON.stringify(recognitionData),
  }),
};

// General data API call
export const dataApi = {
  getData: () => apiRequest('/api/data'),
};

export default {
  userApi,
  employeeApi,
  attendanceApi,
  performanceApi,
  activityApi,
  faceRecognitionApi,
  dataApi,
};