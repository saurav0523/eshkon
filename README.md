# Page Builder - Contentful App

A powerful fullstack Contentful App that enables editors to visually arrange components (via drag-and-drop) for landing pages. The component order is saved as JSON config into Contentful, and the frontend is built using Next.js (App Router, SSG) to render pages using this layout config.

## 🚀 Features

- **Visual Page Builder**: Drag-and-drop interface within Contentful
- **Three Component Types**: Hero Block, Two Column Row, 2x2 Image Grid
- **Redux State Management**: Undo/redo functionality with autosave
- **Responsive Design**: Mobile-first approach with modern UI
- **Performance Optimized**: Next.js with SSG, optimized images
- **SEO Ready**: Dynamic metadata and JSON-LD structured data
- **TypeScript**: Full type safety throughout the application

## 🛠️ Tech Stack

- **Frontend**: Next.js 15.4+ (App Router, SSG)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + Redux Persist
- **Drag & Drop**: @dnd-kit/core
- **CMS**: Contentful GraphQL API
- **Styling**: CSS Modules (no Tailwind or UI libraries)
- **Deployment**: Vercel
- **Version Control**: GitHub

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd eshkon
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Update `.env.local` with your Contentful credentials:
   ```env
   CONTENTFUL_SPACE_ID=your_space_id_here
   CONTENTFUL_ACCESS_TOKEN=your_access_token_here
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

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
│   └── contentful.ts             # Contentful integration
├── store/                        # Redux store
│   ├── index.ts                  # Store configuration
│   └── layoutSlice.ts            # Layout state management
└── types/
    └── index.ts                  # TypeScript definitions
```

## 🎨 Component Types

### 1. Hero Block
- **Fields**: Heading, subtitle, CTA button, background image
- **Features**: Full-screen hero with overlay and responsive text

### 2. Two Column Row
- **Fields**: Left content (heading, subtitle, CTA), right image
- **Features**: Responsive grid layout with hover effects

### 3. 2x2 Image Grid
- **Fields**: Four images with titles
- **Features**: Responsive grid with hover animations

## 🔧 Contentful Setup

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

### 3. Create Sample Pages

Create two pages in Contentful:
- **Page 1**: Slug `page-1`
- **Page 2**: Slug `page-2`

## 🚀 Usage

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

## 🎯 Features in Detail

### Redux State Management
- **Undo/Redo**: Full history management with keyboard shortcuts
- **Autosave**: Automatic saving after 2 seconds of inactivity
- **Persistence**: State restored after page refresh

### Performance Optimizations
- **Next.js Image**: Optimized image loading and display
- **Static Generation**: Pages pre-rendered at build time
- **Code Splitting**: Automatic code splitting for optimal loading

### SEO & Accessibility
- **Dynamic Metadata**: Page-specific meta tags
- **JSON-LD**: Structured data for search engines
- **Semantic HTML**: Proper heading hierarchy and landmarks
- **Alt Text**: Descriptive alt text for all images

## 🧪 Testing

Run the test suite:
```bash
npm test
```

## 📦 Build & Deploy

### Build for Production
```bash
npm run build
```

### Deploy to Vercel
1. Connect your GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

## 🔧 Development

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

### Code Style
- TypeScript strict mode enabled
- ESLint configuration for Next.js
- Prettier formatting (recommended)

## 📝 License

This project is licensed under the MIT License.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📞 Support

For support and questions:
- Create an issue in the GitHub repository
- Check the documentation in the `/docs` folder
- Review the Contentful App documentation

---

**Built with ❤️ using Next.js, TypeScript, and Contentful**
