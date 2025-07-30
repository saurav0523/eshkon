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
              url: 'https://picsum.photos/1200/600?random=1',
              alt: 'Modern office workspace'
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
                url: 'https://picsum.photos/600/400?random=2',
                alt: 'Business analytics dashboard'
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
                url: 'https://picsum.photos/300/300?random=3',
                alt: 'Team collaboration meeting',
                title: 'Team Meeting'
              },
              {
                url: 'https://picsum.photos/300/300?random=4',
                alt: 'Creative brainstorming session',
                title: 'Brainstorming'
              },
              {
                url: 'https://picsum.photos/300/300?random=5',
                alt: 'Professional presentation',
                title: 'Presentation'
              },
              {
                url: 'https://picsum.photos/300/300?random=6',
                alt: 'Product development workspace',
                title: 'Development'
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