import { put } from '@vercel/blob';

// GitHub repo info
const REPO_OWNER = 'Caue-Garaude';
const REPO_NAME = 'imersao';
const BRANCH = 'main';

// All video files with their LFS info extracted from the pointer files
const videos = [
  { name: 'ressignifica.MP4', path: 'public/ressignifica.MP4', oid: '586875c15154097b52e624a93d6ed72960eb0cb1db7a51f2657c1df45e9f244a', size: 137976386 },
  { name: 'Depoimento1.mp4', path: 'public/Depoimento1.mp4', oid: 'b602de6134f218c277ae8200aa7144c7a31e4fd5c8e719e13efd471c1a460a06', size: null },
  { name: 'depoimento2.mp4', path: 'public/depoimento2.mp4', oid: 'a6d2b2e37f924ef5a82be9b2ae300e4a63e6187dad5068ebf276133d3f979194', size: null },
  { name: 'depoimento3.mp4', path: 'public/depoimento3.mp4', oid: '96e4c47e18b88b2403a5da0badfdb2dd1ee4e3a457a7f4ff77b6c27e4c99570d', size: null },
  { name: 'depoimento4.mp4', path: 'public/depoimento4.mp4', oid: '7e265f9f3b312b87ede63da4f5b5982571d5109f596092fe5129b3a1ea2cd5ff', size: null },
  { name: 'depoimento5.mp4', path: 'public/depoimento5.mp4', oid: 'ce3aa65ec4894158303f49967d619f3db7dc709f3a20402bf6a1fce97e9e1839', size: null },
  { name: 'depoimento6.mp4', path: 'public/depoimento6.mp4', oid: '14925a28de14639f8fce6ffab1cf11f53a88e8bca47342518750eb21ef9d0af3', size: null },
  { name: 'depoimento7.mp4', path: 'public/depoimento7.mp4', oid: '21b3590d879d368d3011b5038516b6de5daa9c05e93ac91ea12bf1d9fa4d8299', size: null },
];

async function downloadAndUpload() {
  const results = {};

  for (const video of videos) {
    try {
      // Try GitHub media URL (resolves LFS for public repos)
      const mediaUrl = `https://media.githubusercontent.com/media/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${video.path}`;
      console.log(`Trying media URL for ${video.name}: ${mediaUrl}`);
      
      let response = await fetch(mediaUrl, { redirect: 'follow' });
      
      if (!response.ok) {
        // Try raw URL
        const rawUrl = `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${video.path}`;
        console.log(`Media URL failed (${response.status}). Trying raw URL: ${rawUrl}`);
        response = await fetch(rawUrl, { redirect: 'follow' });
      }

      if (!response.ok) {
        // Try GitHub API
        const apiUrl = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}/contents/${video.path}?ref=${BRANCH}`;
        console.log(`Raw URL failed. Trying API: ${apiUrl}`);
        response = await fetch(apiUrl, { 
          headers: { 'Accept': 'application/vnd.github.v3.raw' }
        });
      }

      if (!response.ok) {
        console.error(`All download methods failed for ${video.name}. Status: ${response.status}`);
        continue;
      }

      // Check if we got actual binary data or an LFS pointer
      const contentType = response.headers.get('content-type');
      console.log(`Response content-type: ${contentType}`);
      
      const buffer = await response.arrayBuffer();
      const sizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);
      console.log(`Downloaded ${video.name}: ${sizeMB} MB`);

      // Check if it's an LFS pointer (small text file)
      if (buffer.byteLength < 1000) {
        const text = new TextDecoder().decode(buffer);
        if (text.includes('git-lfs')) {
          console.error(`${video.name} is still an LFS pointer, not the actual file. Skipping.`);
          continue;
        }
      }

      console.log(`Uploading ${video.name} to Vercel Blob...`);
      const blob = await put(`videos/${video.name}`, Buffer.from(buffer), {
        access: 'public',
        contentType: 'video/mp4',
      });

      console.log(`SUCCESS: ${video.name} -> ${blob.url}`);
      results[video.name] = blob.url;
    } catch (error) {
      console.error(`Error with ${video.name}:`, error.message);
    }
  }

  console.log('\n=== FINAL RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
  return results;
}

downloadAndUpload();
