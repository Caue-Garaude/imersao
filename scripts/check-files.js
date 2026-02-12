import fs from 'fs';
import path from 'path';

const publicDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'public');

try {
  const files = fs.readdirSync(publicDir);
  let totalSize = 0;
  
  console.log("=== Files in /public ===");
  for (const file of files.sort()) {
    const filePath = path.join(publicDir, file);
    const stat = fs.statSync(filePath);
    const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
    totalSize += stat.size;
    console.log(`${file}: ${sizeMB} MB`);
  }
  console.log(`\n=== TOTAL: ${(totalSize / (1024 * 1024)).toFixed(2)} MB ===`);
} catch (e) {
  console.log("Error:", e.message);
}
