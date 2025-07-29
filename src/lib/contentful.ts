import { GraphQLClient } from 'graphql-request';
import { PageData, ComponentConfig } from '../types';

const CONTENTFUL_SPACE_ID = process.env.CONTENTFUL_SPACE_ID;
const CONTENTFUL_ACCESS_TOKEN = process.env.CONTENTFUL_ACCESS_TOKEN;

if (!CONTENTFUL_SPACE_ID || !CONTENTFUL_ACCESS_TOKEN) {
  throw new Error('Missing Contentful environment variables');
}

const client = new GraphQLClient(
  `https://graphql.contentful.com/content/v1/spaces/${CONTENTFUL_SPACE_ID}`,
  {
    headers: {
      authorization: `Bearer ${CONTENTFUL_ACCESS_TOKEN}`,
    },
  }
);

interface PageResponse {
  pageCollection: {
    items: Array<{
      sys: {
        id: string;
      };
      slug: string;
      title: string;
      description: string;
      keywords: string[];
      layoutConfig?: {
        components: ComponentConfig[];
      };
    }>;
  };
}

interface AllPagesResponse {
  pageCollection: {
    items: Array<{
      sys: {
        id: string;
      };
      slug: string;
      title: string;
    }>;
  };
}

const PAGE_QUERY = `
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
`;

export async function getPageData(slug: string): Promise<PageData> {
  try {
    const variables = { slug };
    const data = await client.request<PageResponse>(PAGE_QUERY, variables);
    
    const page = data.pageCollection.items[0];
    
    if (!page) {
      throw new Error(`Page with slug "${slug}" not found`);
    }
    
    return {
      layoutConfig: page.layoutConfig?.components || [],
      metadata: {
        title: page.title || 'Landing Page',
        description: page.description || 'A beautiful landing page',
        keywords: page.keywords || [],
      },
    };
  } catch (error) {
    console.error('Error fetching page data:', error);
    
    // Return default data for development
    return {
      layoutConfig: [
        {
          id: 'hero-1',
          type: 'hero',
          order: 0,
          data: {
            heading: 'Welcome to Our Site',
            subtitle: 'Discover amazing things with us',
            ctaText: 'Get Started',
            ctaUrl: '#',
            backgroundImage: {
              url: 'https://via.placeholder.com/1200x600/4A90E2/FFFFFF?text=Hero+Background',
              alt: 'Hero background'
            }
          }
        },
        {
          id: 'two-column-1',
          type: 'twoColumn',
          order: 1,
          data: {
            left: {
              heading: 'Feature Section',
              subtitle: 'Learn about our amazing features',
              ctaText: 'Learn More',
              ctaUrl: '#'
            },
            right: {
              image: {
                url: 'https://via.placeholder.com/600x400/50C878/FFFFFF?text=Feature+Image',
                alt: 'Feature image'
              }
            }
          }
        },
        {
          id: 'image-grid-1',
          type: 'imageGrid',
          order: 2,
          data: {
            images: [
              {
                url: 'https://via.placeholder.com/300x300/FF6B6B/FFFFFF?text=Image+1',
                alt: 'Grid image 1',
                title: 'Image 1'
              },
              {
                url: 'https://via.placeholder.com/300x300/4ECDC4/FFFFFF?text=Image+2',
                alt: 'Grid image 2',
                title: 'Image 2'
              },
              {
                url: 'https://via.placeholder.com/300x300/45B7D1/FFFFFF?text=Image+3',
                alt: 'Grid image 3',
                title: 'Image 3'
              },
              {
                url: 'https://via.placeholder.com/300x300/96CEB4/FFFFFF?text=Image+4',
                alt: 'Grid image 4',
                title: 'Image 4'
              }
            ]
          }
        }
      ],
      metadata: {
        title: 'Landing Page 1',
        description: 'A beautiful landing page built with our page builder',
        keywords: ['landing page', 'web design', 'components'],
      },
    };
  }
}

export async function getAllPages() {
  const ALL_PAGES_QUERY = `
    query GetAllPages {
      pageCollection {
        items {
          sys {
            id
          }
          slug
          title
        }
      }
    }
  `;
  
  try {
    const data = await client.request<AllPagesResponse>(ALL_PAGES_QUERY);
    return data.pageCollection.items;
  } catch (error) {
    console.error('Error fetching all pages:', error);
    return [];
  }
} 