# Page Builder - Contentful App

A powerful fullstack Contentful App that enables editors to visually arrange components (via drag-and-drop) for landing pages. The component order is saved as JSON config into Contentful, and the frontend is built using Next.js (App Router, SSG) to render pages using this layout config.

## Features

- **Visual Page Builder**: Drag-and-drop interface within Contentful
- **Three Component Types**: Hero Block, Two Column Row, 2x2 Image Grid
- **Redux State Management**: Undo/redo functionality with autosave
- **Responsive Design**: Mobile-first approach with modern UI
- **Performance Optimized**: Next.js with SSG, optimized images
- **SEO Ready**: Dynamic metadata and JSON-LD structured data
- **TypeScript**: Full type safety throughout the application

## Tech Stack

- **Frontend**: Next.js 15.4+ (App Router, SSG)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Drag & Drop**: @dnd-kit/core
- **CMS**: Contentful GraphQL API
- **Styling**: CSS Modules (no Tailwind or UI libraries)
- **Deployment**: Vercel
- **Version Control**: GitHub

## Quick Start

### 1. Clone and Install

```bash
git clone <repository-url>
cd eshkon
npm install
```

### 2. Environment Setup

Create a `.env.local` file with your Contentful credentials:

```env
# Contentful Configuration
CONTENTFUL_SPACE_ID=your_space_id_here
CONTENTFUL_ACCESS_TOKEN=your_access_token_here

# Contentful App Configuration (for app functionality)
CONTENTFUL_APP_ID=your_app_id_here
CONTENTFUL_APP_SECRET=your_app_secret_here

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# API Configuration (optional)
NEXT_PUBLIC_API_URL=http://localhost:3000/api
```


### 3. Contentful Setup

**Follow the detailed setup guide**: [CONTENTFUL_SETUP.md](./CONTENTFUL_SETUP.md)

Quick steps:
1. Create a "Page" content type in Contentful
2. Add fields: slug, title, description, keywords, layoutConfig
3. Create sample pages with layout configurations
4. Test GraphQL queries in Contentful Playground

### 4. Run Development Server

```bash
npm run dev
```

## Project Structure

```
src/
├── app/                          # Next.js App Router
│   ├── contentful-app/           # Contentful App interface
│   ├── landing/                  # Landing pages
│   │   ├── page-1/
│   │   └── page-2/
│   └── page.tsx                  # Main landing page
├── components/
│   ├── contentful/               # Contentful App components
│   │   ├── components/           # Component previews
│   │   ├── PageBuilder.tsx       # Main page builder
│   │   ├── ComponentList.tsx     # Available components
│   │   ├── ComponentRenderer.tsx # Canvas renderer
│   │   └── Toolbar.tsx           # Action toolbar
│   └── frontend/                 # Frontend components
│       ├── sections/             # Page sections
│       ├── LandingPageRenderer.tsx
│       └── Navigation.tsx
├── lib/
│   └── api/                      # API integration
│       ├── axios.ts              # HTTP client setup
│       ├── contentful.ts         # Contentful service
│       ├── queries.ts            # GraphQL queries
│       └── utils.ts              # API utilities
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   └── layoutSlice.ts            # Layout state management
└── types/
    └── index.ts                  # TypeScript definitions
```

## Component Types

### 1. Hero Block
- **Fields**: Heading, subtitle, CTA button, background image
- **Features**: Full-screen hero with overlay and responsive text

### 2. Two Column Row
- **Fields**: Left content (heading, subtitle, CTA), right image
- **Features**: Responsive grid layout with hover effects

### 3. 2x2 Image Grid
- **Fields**: Four images with titles
- **Features**: Responsive grid with hover animations

## Contentful Setup

### 1. Create Content Model

Create a new content type in Contentful with the following fields:

```json
{
  "name": "Page",
  "id": "page",
  "fields": [
    {
      "name": "Slug",
      "id": "slug",
      "type": "Symbol",
      "required": true,
      "validations": [
        {
          "unique": true
        }
      ]
    },
    {
      "name": "Title",
      "id": "title",
      "type": "Symbol",
      "required": true
    },
    {
      "name": "Description",
      "id": "description",
      "type": "Text",
      "required": false
    },
    {
      "name": "Keywords",
      "id": "keywords",
      "type": "Array",
      "items": {
        "type": "Symbol"
      }
    },
    {
      "name": "Layout Config",
      "id": "layoutConfig",
      "type": "Object",
      "required": false
    }
  ]
}
```

### 2. Install Contentful App

1. Go to your Contentful space settings
2. Navigate to "Apps" section
3. Install the Page Builder app
4. Configure the app with your preview URL


## Usage

### Contentful App (Page Builder)

1. Open the Page Builder app in Contentful
2. Drag components from the sidebar to the canvas
3. Reorder components by dragging them
4. Use undo/redo buttons to manage changes
5. Click "Save" to persist changes to Contentful
6. Use "Preview" to view the page on your site

### Frontend Pages

- **Home**: `/` - Landing page with links
- **Page 1**: `/landing/page-1` - First landing page
- **Page 2**: `/landing/page-2` - Second landing page

## Performance Testing

### Run Performance Tests

```bash
# Test Lighthouse scores
npm run test-performance

# Analyze bundle size
npm run analyze
```

### Performance Requirements

### Optimization Features

- **Image Optimization**: Next.js Image with WebP/AVIF formats
- **Code Splitting**: Automatic code splitting for optimal loading
- **Static Generation**: Pages pre-rendered at build time
- **Bundle Optimization**: Tree shaking and minification
- **Caching**: Optimized cache headers for static assets

## Testing

### Environment Validation

```bash
# Validate environment variables
npm run validate-env
```

### Performance Testing

```bash
# Run Lighthouse tests
npm run test-performance
```

## Build & Deploy

### Build for Production

```bash
npm run build
```

### Deploy to Vercel

1. **Set up environment variables in Vercel dashboard:**
   - Go to Project settings → Environment variables
   - Add all variables from your `.env.local` file

2. **Deploy automatically on push to main branch**

### Deploy to Netlify

1. **Build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Deploy automatically on push to main branch**

## Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run validate-env` - Validate environment variables
- `npm run test-performance` - Run Lighthouse tests
- `npm run analyze` - Analyze bundle size

### Code Style

- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Prettier formatting (recommended)


## Support

For support and questions:
Email - gsaurav641@gmail.com




