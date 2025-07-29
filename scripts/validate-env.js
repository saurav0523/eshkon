#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-require-imports */

/**
 * Environment validation script
 * Run this before deployment to ensure all required variables are set
 */

// Load environment variables from .env.local
require('dotenv').config({ path: '.env.local' });

const requiredVars = [
  'CONTENTFUL_SPACE_ID',
  'CONTENTFUL_ACCESS_TOKEN',
  'CONTENTFUL_APP_ID',
  'CONTENTFUL_APP_SECRET',
  'NEXT_PUBLIC_SITE_URL'
];

const optionalVars = [
  'NEXT_PUBLIC_API_URL'
];

console.log('🔍 Validating environment variables...\n');

let hasErrors = false;
const missing = [];

// Check required variables
for (const varName of requiredVars) {
  if (!process.env[varName]) {
    missing.push(varName);
    hasErrors = true;
    console.log(`❌ Missing required variable: ${varName}`);
  } else {
    console.log(`✅ Found required variable: ${varName}`);
  }
}

// Check optional variables
for (const varName of optionalVars) {
  if (!process.env[varName]) {
    console.log(`⚠️  Missing optional variable: ${varName} (will use default)`);
  } else {
    console.log(`✅ Found optional variable: ${varName}`);
  }
}

console.log('\n📋 Summary:');

if (hasErrors) {
  console.log(`❌ Build will fail: Missing ${missing.length} required environment variable(s)`);
  console.log('\nMissing variables:');
  missing.forEach(varName => console.log(`  - ${varName}`));
  console.log('\n💡 Solution: Set these variables in your deployment platform');
  process.exit(1);
} else {
  console.log('✅ All required environment variables are set');
  console.log('🚀 Ready for deployment!');
  process.exit(0);
} 