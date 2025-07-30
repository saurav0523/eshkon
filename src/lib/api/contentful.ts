import { contentfulApi } from './axios';
import { PAGE_QUERY, ALL_PAGES_QUERY, COMPONENT_QUERY, ASSETS_QUERY } from './queries';
import { PageData, ComponentConfig } from '../../types';
import { validateEnvironment, retryWithBackoff } from './utils';

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

export class ContentfulService {

  static async getPage(slug: string): Promise<PageData> {
    try {
      if (!contentfulApi) {
        console.log('Contentful API not available, using default data');
        return this.getDefaultPageData(slug);
      }

      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using default data for development');
        return this.getDefaultPageData(slug);
      }

      if (!contentfulApi) {
        throw new Error('Contentful API not available');
      }
      
      const response = await retryWithBackoff(() =>
        contentfulApi!.post<PageResponse>('', {
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
      
      console.log('Falling back to default data');
      return this.getDefaultPageData(slug);
    }
  }


  static async getAllPages() {
    try {
      if (!contentfulApi) {
        console.log('Contentful API not available, returning empty array');
        return [];
      }

      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using empty pages array for development');
        return [];
      }

      if (!contentfulApi) {
        throw new Error('Contentful API not available');
      }
      
      const response = await retryWithBackoff(() =>
        contentfulApi!.post<AllPagesResponse>('', {
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

  static async getComponent(id: string) {
    try {
      if (!contentfulApi) {
        console.log('Contentful API not available, component not available');
        return null;
      }

      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Component not available in development mode');
        return null;
      }

      if (!contentfulApi) {
        throw new Error('Contentful API not available');
      }
      
      const response = await retryWithBackoff(() =>
        contentfulApi!.post<ComponentResponse>('', {
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

  static async getAssets(limit: number = 10) {
    try {
      if (!contentfulApi) {
        console.log('Contentful API not available, returning empty assets array');
        return [];
      }

      const envValidation = validateEnvironment();
      if (!envValidation.isValid) {
        console.warn('Missing environment variables:', envValidation.missing);
        console.log('Using empty assets array for development');
        return [];
      }

      const response = await retryWithBackoff(() =>
        contentfulApi!.post<AssetsResponse>('', {
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
              url: 'https://picsum.photos/1200/600?random=1',
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
                url: 'https://picsum.photos/600/400?random=2',
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
                url: 'https://picsum.photos/300/300?random=3',
                alt: 'Grid image 1',
                title: 'Image 1'
              },
              {
                url: 'https://picsum.photos/300/300?random=4',
                alt: 'Grid image 2',
                title: 'Image 2'
              },
              {
                url: 'https://picsum.photos/300/300?random=5',
                alt: 'Grid image 3',
                title: 'Image 3'
              },
              {
                url: 'https://picsum.photos/300/300?random=6',
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