#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Performance testing script
 * Tests Lighthouse scores for the application
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
const PAGES = [
  '/',
  '/landing/page-1',
  '/landing/page-2',
  '/contentful-app'
];

console.log('Starting Performance Testing...\n');

try {
  execSync('lighthouse --version', { stdio: 'ignore' });
} catch (error) {
  console.log('Lighthouse CLI not found. Installing...');
  try {
    execSync('npm install -g lighthouse', { stdio: 'inherit' });
  } catch (installError) {
    console.log('Failed to install Lighthouse. Please install manually:');
    console.log('npm install -g lighthouse');
    process.exit(1);
  }
}

const reportsDir = path.join(process.cwd(), 'lighthouse-reports');
if (!fs.existsSync(reportsDir)) {
  fs.mkdirSync(reportsDir);
}

let allScores = [];

async function testPage(url, pageName) {
  console.log(`Testing ${pageName} (${BASE_URL}${url})...`);
  
  const outputPath = path.join(reportsDir, `${pageName.replace(/\//g, '-')}.html`);
  const jsonPath = path.join(reportsDir, `${pageName.replace(/\//g, '-')}.json`);
  
  try {
    execSync(`lighthouse ${BASE_URL}${url} --output=html,json --output-path=${outputPath} --chrome-flags="--headless --no-sandbox"`, {
      stdio: 'pipe'
    });

    const jsonReport = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
    const scores = jsonReport.categories;
    
    const pageScores = {
      page: pageName,
      performance: Math.round(scores.performance.score * 100),
      accessibility: Math.round(scores.accessibility.score * 100),
      bestPractices: Math.round(scores['best-practices'].score * 100),
      seo: Math.round(scores.seo.score * 100)
    };
    
    allScores.push(pageScores);
    
    console.log(` ${pageName}:`);
    console.log(`   Performance: ${pageScores.performance}/100`);
    console.log(`   Accessibility: ${pageScores.accessibility}/100`);
    console.log(`   Best Practices: ${pageScores.bestPractices}/100`);
    console.log(`   SEO: ${pageScores.seo}/100`);
    console.log(`   Report: ${outputPath}\n`);
    
    return pageScores;
  } catch (error) {
    console.log(` Failed to test ${pageName}: ${error.message}\n`);
    return null;
  }
}

async function runTests() {
  console.log(` Testing against: ${BASE_URL}\n`);
  
  for (const page of PAGES) {
    const pageName = page === '/' ? 'home' : page;
    await testPage(page, pageName);
  }
  
  
  let totalPerformance = 0;
  let totalAccessibility = 0;
  let totalBestPractices = 0;
  let totalSEO = 0;
  let validTests = 0;
  
  allScores.forEach(score => {
    if (score) {
      totalPerformance += score.performance;
      totalAccessibility += score.accessibility;
      totalBestPractices += score.bestPractices;
      totalSEO += score.seo;
      validTests++;
    }
  });
  
  if (validTests > 0) {
    const avgPerformance = Math.round(totalPerformance / validTests);
    const avgAccessibility = Math.round(totalAccessibility / validTests);
    const avgBestPractices = Math.round(totalBestPractices / validTests);
    const avgSEO = Math.round(totalSEO / validTests);
    
    console.log(`Average Performance: ${avgPerformance}/100`);
    console.log(`Average Accessibility: ${avgAccessibility}/100`);
    console.log(`Average Best Practices: ${avgBestPractices}/100`);
    console.log(`Average SEO: ${avgSEO}/100`);
    
    const meetsRequirements = avgPerformance >= 90 && avgAccessibility >= 90 && avgSEO >= 90;
    
    if (meetsRequirements) {
      console.log('\n All performance requirements met!');
    } else {
      console.log('\n  Some performance requirements not met. Check reports for details.');
    }
  }
  
  console.log(`\n Reports saved in: ${reportsDir}`);
}

try {
  const response = execSync(`curl -s -o /dev/null -w "%{http_code}" ${BASE_URL}`, { encoding: 'utf8' });
  if (response.trim() === '200') {
    runTests();
  } else {
    console.log(` Server not responding at ${BASE_URL}`);
    console.log('Please start the development server with: npm run dev');
    process.exit(1);
  }
} catch (error) {
  console.log(` Cannot connect to ${BASE_URL}`);
  console.log('Please start the development server with: npm run dev');
  process.exit(1);
} 