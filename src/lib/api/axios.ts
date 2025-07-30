import axios from 'axios';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

const hasValidCredentials = CONTENTFUL_SPACE_ID && CONTENTFUL_ACCESS_TOKEN;

if (!hasValidCredentials) {
  console.warn('Missing Contentful environment variables. API calls will be disabled.');
} else {
  console.log(' Contentful credentials found, API will be enabled');
}

export const contentfulApi = hasValidCredentials ? axios.create({
  baseURL: `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
  },
  timeout: 10000,
}) : null;


if (contentfulApi) {
  contentfulApi.interceptors.request.use(
    (config) => {
      console.log(` API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => {
      console.error(' Request Error:', error);
      return Promise.reject(error);
    }
  );


  contentfulApi.interceptors.response.use(
    (response) => {
      console.log(` API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error) => {
      console.error(' Response Error:', {
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
        url: error.config?.url,
      });
      return Promise.reject(error);
    }
  );
}

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    console.log(` API Request: ${config.method?.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error(' Request Error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(` API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error(' Response Error:', {
      status: error.response?.status,
      message: error.response?.data?.message || error.message,
      url: error.config?.url,
    });
    return Promise.reject(error);
  }
); 