import React from 'react';
import { Metadata } from 'next';
import { ContentfulService } from '../../../lib/api/contentful';
import LandingPageRenderer from '../../../components/frontend/LandingPageRenderer';
import Navigation from '../../../components/frontend/Navigation';

export async function generateMetadata(): Promise<Metadata> {
  const pageData = await ContentfulService.getPage('page-2');
  
  return {
    title: pageData.metadata.title,
    description: pageData.metadata.description,
    keywords: pageData.metadata.keywords,
        openGraph: {
      title: pageData.metadata.title,
      description: pageData.metadata.description,
      type: 'website',
    },
  };
}

export default async function LandingPage2() {
  const pageData = await ContentfulService.getPage('page-2');
  
  return (
    <>
      <Navigation />
      <LandingPageRenderer components={pageData.layoutConfig} />
    </>
  );
} 