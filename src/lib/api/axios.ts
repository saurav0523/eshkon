import axios from 'axios';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

// Debug logging to help identify the issue
console.log('🔍 Environment Variables Debug:');
console.log('CONTENTFUL_SPACE_ID:', CONTENTFUL_SPACE_ID ? '✅ Set' : '❌ Missing');
console.log('CONTENTFUL_ACCESS_TOKEN:', CONTENTFUL_ACCESS_TOKEN ? '✅ Set' : '❌ Missing');
console.log('NODE_ENV:', process.env.NODE_ENV);

// Check if we have valid credentials before creating the API instance
const hasValidCredentials = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN;

if (!hasValidCredentials) {
  console.warn('Missing Contentful environment variables. API calls will be disabled.');
} else {
  console.log('✅ Contentful credentials found, API will be enabled');
}

// Create axios instance for Contentful API only if we have valid credentials
export const contentfulApi = hasValidCredentials ? axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
  timeout: 10000, // 10 seconds
}) : null;

// Request interceptor for logging (only if API is available)
if (contentfulApi) {
  contentfulApi.interceptors.request.use(
    (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error('❌ Request Error:', error);
      return Promise.reject(error);
    }
  );

  // Response interceptor for error handling
  contentfulApi.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error('❌ Response Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );
}

// Generic API instance for other endpoints
export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request/response interceptors for generic API
api.interceptors.request.use(
  (config) => {
    console.log(`🌐 API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
); 