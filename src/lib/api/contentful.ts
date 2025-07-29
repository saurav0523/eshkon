import { contentfulApi } from './axios';
import { PAGE_QUERY, ALL_PAGES_QUERY, COMPONENT_QUERY, ASSETS_QUERY } from './queries';
import { PageData, ComponentConfig } from '../../types';
import { validateEnvironment, retryWithBackoff } from './utils';

// Type definitions for API responses
interface PageResponse {
  data: {
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
  };
}

interface AllPagesResponse {
  data: {
    pageCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        slug: string;
        title: string;
        description: string;
      }>;
    };
  };
}

interface ComponentResponse {
  data: {
    componentCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        type: string;
        data: unknown;
      }>;
    };
  };
}

interface AssetsResponse {
  data: {
    assetCollection: {
      items: Array<{
        sys: {
          id: string;
        };
        url: string;
        title: string;
        description: string;
        width: number;
        height: number;
      }>;
    };
  };
}

// API Service Class
export class ContentfulService {
  /**
   * Fetch a single page by slug
   */
  static async getPage(slug: string): Promise<PageData> {
    try {
      // Validate environment variables first
      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using default data for development');
        return this.getDefaultPageData(slug);
      }

      // Only make API call if we have valid credentials
      const response = await retryWithBackoff(() =>
        contentfulApi.post<PageResponse>('', {
          query: PAGE_QUERY,
          variables: { slug },
        })
      );

      const page = response.data.data.pageCollection.items[0];
      
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
      
      // Always fall back to default data on any error
      console.log('Falling back to default data');
      return this.getDefaultPageData(slug);
    }
  }

  /**
   * Fetch all pages
   */
  static async getAllPages() {
    try {
      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using empty pages array for development');
        return [];
      }

      const response = await retryWithBackoff(() =>
        contentfulApi.post<AllPagesResponse>('', {
          query: ALL_PAGES_QUERY,
        })
      );

      return response.data.data.pageCollection.items;
    } catch (error) {
      console.error('Error fetching all pages:', error);
      console.log('Falling back to empty pages array');
      return [];
    }
  }

  /**
   * Fetch a specific component by ID
   */
  static async getComponent(id: string) {
    try {
      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Component not available in development mode');
        return null;
      }

      const response = await retryWithBackoff(() =>
        contentfulApi.post<ComponentResponse>('', {
          query: COMPONENT_QUERY,
          variables: { id },
        })
      );

      const component = response.data.data.componentCollection.items[0];
      
      if (!component) {
        throw new Error(`Component with ID "${id}" not found`);
      }

      return component;
    } catch (error) {
      console.error('Error fetching component:', error);
      console.log('Component not available');
      return null;
    }
  }

  /**
   * Fetch assets (images, etc.)
   */
  static async getAssets(limit: number = 10) {
    try {
      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using empty assets array for development');
        return [];
      }

      const response = await retryWithBackoff(() =>
        contentfulApi.post<AssetsResponse>('', {
          query: ASSETS_QUERY,
          variables: { limit },
        })
      );

      return response.data.data.assetCollection.items;
    } catch (error) {
      console.error('Error fetching assets:', error);
      console.log('Falling back to empty assets array');
      return [];
    }
  }

  /**
   * Get default/mock data for development
   */
  static getDefaultPageData(slug: string): PageData {
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
        title: `Landing Page ${slug.split('-')[1] || '1'}`,
        description: 'A beautiful landing page built with our page builder',
        keywords: ['landing page', 'web design', 'components'],
      },
    };
  }
} 