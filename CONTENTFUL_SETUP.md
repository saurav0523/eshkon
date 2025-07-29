# Contentful Setup Guide

This guide will help you set up the required content model in Contentful to work with this application.

## 1. Create Content Model

### Step 1: Create "Page" Content Type

1. Go to your Contentful space
2. Navigate to **Content Model** → **Add Content Type**
3. Name: `Page`
4. API Identifier: `page`
5. Description: `Landing page with layout configuration`

### Step 2: Add Fields

Add the following fields to your Page content type:

#### 1. Slug Field
- **Name**: `Slug`
- **API Identifier**: `slug`
- **Type**: `Short text`
- **Required**: ✅ Yes
- **Validations**: 
  - Check "Unique field"
  - Pattern: `^[a-z0-9-]+$` (lowercase, numbers, hyphens only)

#### 2. Title Field
- **Name**: `Title`
- **API Identifier**: `title`
- **Type**: `Short text`
- **Required**: ✅ Yes

#### 3. Description Field
- **Name**: `Description`
- **API Identifier**: `description`
- **Type**: `Long text`
- **Required**: ❌ No

#### 4. Keywords Field
- **Name**: `Keywords`
- **API Identifier**: `keywords`
- **Type**: `Short text`
- **Required**: ❌ No
- **Appearance**: `Tag editor`

#### 5. Layout Config Field
- **Name**: `Layout Config`
- **API Identifier**: `layoutConfig`
- **Type**: `JSON object`
- **Required**: ❌ No
- **Description**: `JSON configuration for page layout and components`

### Step 3: Save and Publish

1. Click **Save**
2. Click **Publish**

## 2. Create Sample Content

### Create Page 1
1. Go to **Content** → **Add entry**
2. Select **Page** content type
3. Fill in the fields:
   - **Slug**: `page-1`
   - **Title**: `Landing Page 1`
   - **Description**: `Our first landing page with amazing features`
   - **Keywords**: `landing, page, features`
   - **Layout Config**: (see JSON below)

### Create Page 2
1. Create another Page entry
2. Fill in the fields:
   - **Slug**: `page-2`
   - **Title**: `Landing Page 2`
   - **Description**: `Our second landing page showcasing products`
   - **Keywords**: `landing, page, products`
   - **Layout Config**: (see JSON below)

## 3. Sample Layout Config JSON

### For Page 1:
```json
{
  "components": [
    {
      "id": "hero-1",
      "type": "hero",
      "order": 0,
      "data": {
        "heading": "Welcome to Our Amazing Site",
        "subtitle": "Discover incredible features and amazing content",
        "ctaText": "Get Started Today",
        "ctaUrl": "#features",
        "backgroundImage": {
          "url": "https://images.unsplash.com/photo-1557804506-669a67965ba0?w=1200&h=600&fit=crop",
          "alt": "Hero background image"
        }
      }
    },
    {
      "id": "two-column-1",
      "type": "twoColumn",
      "order": 1,
      "data": {
        "left": {
          "heading": "Amazing Features",
          "subtitle": "Learn about all the incredible features we offer",
          "ctaText": "Learn More",
          "ctaUrl": "#features"
        },
        "right": {
          "image": {
            "url": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
            "alt": "Features showcase"
          }
        }
      }
    },
    {
      "id": "image-grid-1",
      "type": "imageGrid",
      "order": 2,
      "data": {
        "images": [
          {
            "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
            "alt": "Product 1",
            "title": "Product One"
          },
          {
            "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            "alt": "Product 2",
            "title": "Product Two"
          },
          {
            "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            "alt": "Product 3",
            "title": "Product Three"
          },
          {
            "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
            "alt": "Product 4",
            "title": "Product Four"
          }
        ]
      }
    }
  ]
}
```

### For Page 2:
```json
{
  "components": [
    {
      "id": "hero-2",
      "type": "hero",
      "order": 0,
      "data": {
        "heading": "Our Products",
        "subtitle": "Discover our amazing product lineup",
        "ctaText": "Shop Now",
        "ctaUrl": "#products",
        "backgroundImage": {
          "url": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
          "alt": "Products hero"
        }
      }
    },
    {
      "id": "two-column-2",
      "type": "twoColumn",
      "order": 1,
      "data": {
        "left": {
          "heading": "Quality Products",
          "subtitle": "We offer the highest quality products in the market",
          "ctaText": "View Products",
          "ctaUrl": "#products"
        },
        "right": {
          "image": {
            "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
            "alt": "Quality products"
          }
        }
      }
    },
    {
      "id": "image-grid-2",
      "type": "imageGrid",
      "order": 2,
      "data": {
        "images": [
          {
            "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            "alt": "Premium Product 1",
            "title": "Premium One"
          },
          {
            "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
            "alt": "Premium Product 2",
            "title": "Premium Two"
          },
          {
            "url": "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=300&fit=crop",
            "alt": "Premium Product 3",
            "title": "Premium Three"
          },
          {
            "url": "https://images.unsplash.com/photo-1551434678-e076c223a692?w=300&h=300&fit=crop",
            "alt": "Premium Product 4",
            "title": "Premium Four"
          }
        ]
      }
    }
  ]
}
```

## 4. Test GraphQL Queries

After creating the content, test your GraphQL queries in the Contentful GraphQL Playground:

1. Go to **Settings** → **API keys**
2. Click on your API key
3. Click **GraphQL Playground**
4. Test the queries:

```graphql
query GetPage($slug: String!) {
  pageCollection(where: { slug: $slug }, limit: 1) {
    items {
      sys {
        id
      }
      slug
      title
      description
      keywords
      layoutConfig
    }
  }
}
```

Variables:
```json
{
  "slug": "page-1"
}
```

## 5. Verify Environment Variables

Make sure your `.env.local` file has the correct values:

```env
CONTENTFUL_SPACE_ID=your_actual_space_id
CONTENTFUL_ACCESS_TOKEN=your_actual_access_token
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

## 6. Test the Application

1. Restart your development server:
   ```bash
   npm run dev
   ```

2. Visit the pages:
   - http://localhost:3000/landing/page-1
   - http://localhost:3000/landing/page-2

3. Check the console for any errors

## Troubleshooting

### If you still get 400 errors:
1. Verify your Space ID and Access Token are correct
2. Make sure the content is published in Contentful
3. Check that the API key has the correct permissions
4. Verify the content type API identifier is exactly `page`

### If GraphQL queries fail:
1. Test in the GraphQL Playground first
2. Check that all required fields are filled
3. Verify the JSON structure in layoutConfig is valid 