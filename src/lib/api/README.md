# API Structure

This directory contains all API-related functionality for the application.

## Structure

```
src/lib/api/
├── axios.ts          # Axios instances and interceptors
├── queries.ts        # GraphQL queries
├── contentful.ts     # Contentful API service
├── utils.ts          # API utilities and error handling
├── index.ts          # Main exports
└── README.md         # This file
```

## Usage

### 1. Axios Instances

```typescript
import { contentfulApi, api } from '@/lib/api';

// Contentful API calls
const response = await contentfulApi.post('', { query: '...' });

// Generic API calls
const response = await api.get('/health');
```

### 2. Contentful Service

```typescript
import { ContentfulService } from '@/lib/api';

// Fetch page data
const pageData = await ContentfulService.getPage('page-1');

// Fetch all pages
const pages = await ContentfulService.getAllPages();

// Fetch assets
const assets = await ContentfulService.getAssets(10);
```

### 3. Custom Hooks

```typescript
import { useContentful, useAllPages, useAssets } from '@/lib/api';

// In a React component
const { data, loading, error, refetch } = useContentful('page-1');
const { data: pages } = useAllPages();
const { data: assets } = useAssets(5);
```

### 4. Error Handling

```typescript
import { createApiError, extractErrorMessage } from '@/lib/api';

try {
  const data = await ContentfulService.getPage('page-1');
} catch (error) {
  const apiError = createApiError(error);
  console.error(apiError.message);
}
```

## Features

- **Axios Instances**: Separate instances for Contentful and generic API calls
- **Interceptors**: Request/response logging and error handling
- **Retry Logic**: Exponential backoff for failed requests
- **Environment Validation**: Checks for required environment variables
- **Type Safety**: Full TypeScript support with proper interfaces
- **Error Handling**: Standardized error objects and messages
- **Custom Hooks**: React hooks for API calls with loading states

## Environment Variables

Required environment variables:

```env
CONTENTFUL_SPACE_ID=your_space_id
CONTENTFUL_ACCESS_TOKEN=your_access_token
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```

## Error Handling

The API layer provides comprehensive error handling:

1. **Network Errors**: Handled with retry logic
2. **Authentication Errors**: Proper error messages
3. **Validation Errors**: Environment variable checks
4. **Fallback Data**: Default data when API fails

## Best Practices

1. Always use the service classes instead of direct API calls
2. Use custom hooks for React components
3. Handle loading and error states properly
4. Use TypeScript interfaces for type safety
5. Implement proper error boundaries in components 