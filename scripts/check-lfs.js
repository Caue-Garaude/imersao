import fs from 'fs';
import path from 'path';

// Try multiple possible paths
const possiblePaths = [
  path.resolve(path.dirname(new URL(import.meta.url).pathname), '..', 'public'),
  '/vercel/share/v0-project/public',
  path.resolve('public'),
  path.resolve('.', 'public'),
];

let publicDir = null;
for (const p of possiblePaths) {
  try {
    if (fs.existsSync(p)) {
      publicDir = p;
      break;
    }
  } catch(e) {}
}

if (!publicDir) {
  // Try to find any mp4 file
  console.log("Could not find /public directory. Trying alternative paths...");
  const cwd = process.cwd();
  console.log("CWD:", cwd);
  try {
    const cwdFiles = fs.readdirSync(cwd);
    console.log("Files in CWD:", cwdFiles.join(', '));
  } catch(e) {
    console.log("Cannot read CWD:", e.message);
  }
  process.exit(1);
}

console.log("Found public dir at:", publicDir);
const files = fs.readdirSync(publicDir);

for (const file of files.sort()) {
  const filePath = path.join(publicDir, file);
  const stat = fs.statSync(filePath);
  const sizeMB = (stat.size / (1024 * 1024)).toFixed(2);
  
  // Check if it's an LFS pointer (small text file starting with "version https://git-lfs")
  let isLFS = false;
  if (stat.size < 200 && (file.endsWith('.mp4') || file.endsWith('.MP4'))) {
    try {
      const content = fs.readFileSync(filePath, 'utf8');
      if (content.startsWith('version https://git-lfs')) {
        isLFS = true;
        console.log(`[LFS POINTER] ${file}: ${sizeMB} MB (real size in LFS: ${content.match(/size (\d+)/)?.[1] || 'unknown'} bytes)`);
      }
    } catch(e) {}
  }
  
  if (!isLFS) {
    const ext = path.extname(file).toLowerCase();
    const type = ['.mp4'].includes(ext) ? 'VIDEO' : 
                 ['.jpg', '.jpeg', '.png', '.webp'].includes(ext) ? 'IMAGE' : 'OTHER';
    console.log(`[${type}] ${file}: ${sizeMB} MB`);
  }
}
