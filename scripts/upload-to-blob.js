import { put } from '@vercel/blob';

// These are the video files we need to upload to Vercel Blob
// The S3 URLs are temporary pre-signed URLs from the VM's binary file access
const videos = [
  {
    name: 'Depoimento1.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/b602de6134f218c277ae8200aa7144c7a31e4fd5c8e719e13efd471c1a460a06.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213844Z&X-Amz-Expires=3600&X-Amz-Signature=8b22187499b715f6dc91cdd856ad9a68f8ef370f6288e5973d60c4c9df838b7c&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento2.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/a6d2b2e37f924ef5a82be9b2ae300e4a63e6187dad5068ebf276133d3f979194.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213844Z&X-Amz-Expires=3600&X-Amz-Signature=eedd1bd6906ab93e45024ba386eb6223b1eee1e7dc87a1e536fac744f5c2eafe&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento3.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/96e4c47e18b88b2403a5da0badfdb2dd1ee4e3a457a7f4ff77b6c27e4c99570d.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213844Z&X-Amz-Expires=3600&X-Amz-Signature=6b5bbd0e4d04fbfcbdaff3cdd10ba0724e81abf08252ac326e0f375364a252b5&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento4.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/7e265f9f3b312b87ede63da4f5b5982571d5109f596092fe5129b3a1ea2cd5ff.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213845Z&X-Amz-Expires=3600&X-Amz-Signature=c5115edba22469a2071cf6c7c3c9359467509b707f3d9a5ce91306b7cec92d60&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento5.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/ce3aa65ec4894158303f49967d619f3db7dc709f3a20402bf6a1fce97e9e1839.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213845Z&X-Amz-Expires=3600&X-Amz-Signature=e6e6caff41c2a8f50b2fd7d522e225060e35d98840379af7de2f4c2934a542a4&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento6.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/14925a28de14639f8fce6ffab1cf11f53a88e8bca47342518750eb21ef9d0af3.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213845Z&X-Amz-Expires=3600&X-Amz-Signature=bccd4d03552af59f0b9ea3db07382e8c932b1c8d170077a4e973cf256b6d60c3&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  },
  {
    name: 'depoimento7.mp4',
    url: 'https://v0chat-agent-data-prod.s3.us-east-1.amazonaws.com/vm-binary/Va9aca7ZMmc/21b3590d879d368d3011b5038516b6de5daa9c05e93ac91ea12bf1d9fa4d8299.mp4?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA52KF4VHQDTZ5RDMT%2F20260212%2Fus-east-1%2Fs3%2Faws4_request&X-Amz-Date=20260212T213846Z&X-Amz-Expires=3600&X-Amz-Signature=e160e4d7c9667fac0bc674238e965094afb59b02ad4b799b44bb08f5cdcb067f&X-Amz-SignedHeaders=host&x-amz-checksum-mode=ENABLED&x-id=GetObject'
  }
];

async function uploadAll() {
  const results = {};
  
  for (const video of videos) {
    try {
      console.log(`Downloading ${video.name}...`);
      const response = await fetch(video.url);
      
      if (!response.ok) {
        console.error(`Failed to download ${video.name}: ${response.status} ${response.statusText}`);
        continue;
      }

      const buffer = await response.arrayBuffer();
      const sizeMB = (buffer.byteLength / (1024 * 1024)).toFixed(2);
      console.log(`Downloaded ${video.name}: ${sizeMB} MB`);

      console.log(`Uploading ${video.name} to Vercel Blob...`);
      const blob = await put(`videos/${video.name}`, Buffer.from(buffer), {
        access: 'public',
        contentType: 'video/mp4',
      });

      console.log(`Uploaded ${video.name}: ${blob.url}`);
      results[video.name] = blob.url;
    } catch (error) {
      console.error(`Error with ${video.name}:`, error.message);
    }
  }

  console.log('\n=== UPLOAD RESULTS ===');
  console.log(JSON.stringify(results, null, 2));
}

uploadAll();
