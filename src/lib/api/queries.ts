// GraphQL Queries for Contentful API

export const PAGE_QUERY = `
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

export const ALL_PAGES_QUERY = `
  query GetAllPages {
    pageCollection {
      items {
        sys {
          id
        }
        slug
        title
        description
      }
    }
  }
`;

export const COMPONENT_QUERY = `
  query GetComponent($id: String!) {
    componentCollection(where: { sys: { id: $id } }, limit: 1) {
      items {
        sys {
          id
        }
        type
        data
      }
    }
  }
`;

export const ASSETS_QUERY = `
  query GetAssets($limit: Int = 10) {
    assetCollection(limit: $limit) {
      items {
        sys {
          id
        }
        url
        title
        description
        width
        height
      }
    }
  }
`; 