
const fs = require('fs');
const path = require('path');

// This script is to ensure the Prisma engine file is copied to the Vercel output directory
const engineDir = path.join(path.dirname(require.resolve('@prisma/client')), '..', '.prisma', 'client');
const engineFile = fs.readdirSync(engineDir).find(file => file.endsWith('.so.node') && file.includes('rhel'));

if (engineFile) {
  const enginePath = path.join(engineDir, engineFile);
  const newPath = path.join(__dirname, '.next/server/', engineFile);
  fs.copyFileSync(enginePath, newPath);
  console.log(`Copied Prisma engine file to ${newPath}`);
} else {
  console.error('Could not find the Prisma engine file for rhel-openssl-3.0.x.');
  // Exit with an error to fail the build if the engine is missing
  process.exit(1);
}