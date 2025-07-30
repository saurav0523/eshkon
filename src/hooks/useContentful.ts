import { useState, useEffect, useCallback } from 'react';
import { ContentfulService } from '../lib/api/contentful';
import { PageData } from '../types';

interface UseContentfulState {
  data: PageData | null;
  loading: boolean;
  error: string | null;
}

interface UseContentfulReturn extends UseContentfulState {
  refetch: () => Promise<void>;
  clearError: () => void;
}


export const useContentful = (slug: string): UseContentfulReturn => {
  const [state, setState] = useState<UseContentfulState>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchData = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const data = await ContentfulService.getPage(slug);
      setState({ data, loading: false, error: null });
    } catch (error) {
      console.error('Error in useContentful:', error);
      
  
      const defaultData = ContentfulService.getDefaultPageData(slug);
      setState({ 
        data: defaultData, 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch data' 
      });
    }
  }, [slug]);

  const refetch = useCallback(async () => {
    await fetchData();
  }, [fetchData]);

  const clearError = useCallback(() => {
    setState(prev => ({ ...prev, error: null }));
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return {
    ...state,
    refetch,
    clearError,
  };
};


export const useAllPages = () => {
  const [state, setState] = useState<{
    data: Array<{
      sys: { id: string };
      slug: string;
      title: string;
      description: string;
    }> | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchAllPages = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const data = await ContentfulService.getAllPages();
      setState({ data, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching all pages:', error);
      setState({ 
        data: [], 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch pages' 
      });
    }
  }, []);

  useEffect(() => {
    fetchAllPages();
  }, [fetchAllPages]);

  return {
    ...state,
    refetch: fetchAllPages,
  };
};


export const useAssets = (limit: number = 10) => {
  const [state, setState] = useState<{
    data: Array<{
      sys: { id: string };
      url: string;
      title: string;
      description: string;
      width: number;
      height: number;
    }> | null;
    loading: boolean;
    error: string | null;
  }>({
    data: null,
    loading: true,
    error: null,
  });

  const fetchAssets = useCallback(async () => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));
      
      const data = await ContentfulService.getAssets(limit);
      setState({ data, loading: false, error: null });
    } catch (error) {
      console.error('Error fetching assets:', error);
      setState({ 
        data: [], 
        loading: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch assets' 
      });
    }
  }, [limit]);

  useEffect(() => {
    fetchAssets();
  }, [fetchAssets]);

  return {
    ...state,
    refetch: fetchAssets,
  };
}; 