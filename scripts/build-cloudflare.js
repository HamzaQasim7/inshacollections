#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the Next.js application
console.log('Building Next.js application...');
execSync('npm run build', { stdio: 'inherit' });

// Copy Cloudflare Pages configuration files
console.log('Copying Cloudflare Pages configuration files...');
const publicDir = path.join(process.cwd(), 'public');
const nextDir = path.join(process.cwd(), '.next');

// Copy _headers file if it exists
const headersSrc = path.join(publicDir, '_headers');
const headersDest = path.join(nextDir, '_headers');
if (fs.existsSync(headersSrc)) {
  fs.copyFileSync(headersSrc, headersDest);
  console.log('Copied _headers file');
}

// Copy _redirects file if it exists
const redirectsSrc = path.join(publicDir, '_redirects');
const redirectsDest = path.join(nextDir, '_redirects');
if (fs.existsSync(redirectsSrc)) {
  fs.copyFileSync(redirectsSrc, redirectsDest);
  console.log('Copied _redirects file');
}

console.log('Build completed successfully!');
