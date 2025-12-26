#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Build the Next.js application
console.log('Building Next.js application...');
execSync('npm run build', { stdio: 'inherit' });

// Clean up cache files to reduce size
console.log('Cleaning up cache files...');
const nextDir = path.join(process.cwd(), '.next');
const cacheDir = path.join(nextDir, 'cache');

if (fs.existsSync(cacheDir)) {
  fs.rmSync(cacheDir, { recursive: true, force: true });
  console.log('Removed cache directory');
}

// Remove other unnecessary files
const filesToRemove = [
  path.join(nextDir, 'trace'),
  path.join(nextDir, 'required-server-files.json'),
  path.join(nextDir, 'next-minimal-server.js.nft.json'),
  path.join(nextDir, 'next-server.js.nft.json'),
];

filesToRemove.forEach(file => {
  if (fs.existsSync(file)) {
    fs.rmSync(file, { recursive: true, force: true });
    console.log(`Removed ${file}`);
  }
});

// Copy Cloudflare Pages configuration files
console.log('Copying Cloudflare Pages configuration files...');
const publicDir = path.join(process.cwd(), 'public');

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
