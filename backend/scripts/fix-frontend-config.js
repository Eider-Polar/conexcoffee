import fs from 'fs';
import path from 'path';

const frontendDir = path.resolve('..', 'conexcoffee');
const axiosPath = path.join(frontendDir, 'src', 'lib', 'axios.js');
const envPath = path.join(frontendDir, '.env');

console.log('Frontend directory:', frontendDir);

// 1. Update axios.js
if (fs.existsSync(axiosPath)) {
  let content = fs.readFileSync(axiosPath, 'utf8');
  if (content.includes("baseURL: 'http://localhost:3000'")) {
    content = content.replace(
      "baseURL: 'http://localhost:3000',",
      "baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001/api',"
    );
    fs.writeFileSync(axiosPath, content, 'utf8');
    console.log('Successfully updated axios.js baseURL to import.meta.env.VITE_API_BASE_URL || http://localhost:3001/api');
  } else {
    console.log('axios.js already updated or pattern not found');
  }
} else {
  console.warn('axios.js not found at', axiosPath);
}

// 2. Update .env
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf8');
  envContent = envContent.replace(
    /VITE_API_BASE_URL=.*(\r?\n|$)/,
    'VITE_API_BASE_URL=http://localhost:3001/api$1'
  );
  fs.writeFileSync(envPath, envContent, 'utf8');
  console.log('Successfully updated .env VITE_API_BASE_URL=http://localhost:3001/api');
} else {
  console.warn('.env not found at', envPath);
}
