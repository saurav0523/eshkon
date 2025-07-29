export interface ComponentConfig {
  id: string;
  type: 'hero' | 'twoColumn' | 'imageGrid';
  order: number;
  data: HeroData | TwoColumnData | ImageGridData;
}

export interface HeroData {
  heading: string;
  subtitle: string;
  ctaText: string;
  ctaUrl: string;
  backgroundImage?: {
    url: string;
    alt: string;
  };
}

export interface TwoColumnData {
  left: {
    heading: string;
    subtitle: string;
    ctaText: string;
    ctaUrl: string;
  };
  right: {
    image: {
      url: string;
      alt: string;
    };
  };
}

export interface ImageGridData {
  images: Array<{
    url: string;
    alt: string;
    title?: string;
  }>;
}

export interface LayoutState {
  components: ComponentConfig[];
  history: ComponentConfig[][];
  historyIndex: number;
  isDirty: boolean;
  lastSaved: string | null;
  autosaveTimeout?: number;
}

export interface RootState {
  layout: LayoutState;
}

export interface ContentfulEntry {
  sys: {
    id: string;
    contentType: {
      sys: {
        id: string;
      };
    };
  };
  fields: Record<string, unknown>;
}

export interface PageData {
  layoutConfig: ComponentConfig[];
  metadata: {
    title: string;
    description: string;
    keywords?: string[];
  };
} 