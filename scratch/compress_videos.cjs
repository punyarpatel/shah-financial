const { execSync } = require('child_process');
const ffmpegPath = require('ffmpeg-static');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');

const files = [
  { name: 'hero-bg.mp4' },
  { name: 'Generate_an_animated_video_for.mp4' }
];

files.forEach(({ name }) => {
  const inputPath = path.join(publicDir, name);
  const tempMp4Path = path.join(publicDir, name.replace('.mp4', '_compressed.mp4'));
  const webmPath = path.join(publicDir, name.replace('.mp4', '.webm'));

  if (!fs.existsSync(inputPath)) {
    console.log(`File not found: ${inputPath}`);
    return;
  }

  const initialSize = fs.statSync(inputPath).size;
  console.log(`\nProcessing ${name} (Initial size: ${(initialSize / 1024 / 1024).toFixed(2)} MB)...`);

  // 1. Compress MP4: Remove audio (-an), scale to 1280x720, CRF 32, preset slow
  const mp4Cmd = `"${ffmpegPath}" -y -i "${inputPath}" -an -vf "scale='min(1280,iw)':-2" -c:v libx264 -crf 32 -preset slow -pix_fmt yuv420p "${tempMp4Path}"`;
  console.log(`Compressing MP4...`);
  execSync(mp4Cmd, { stdio: 'inherit' });

  const compressedMp4Size = fs.statSync(tempMp4Path).size;
  console.log(`Compressed MP4 size: ${(compressedMp4Size / 1024).toFixed(2)} KB`);

  // Replace original MP4 with compressed version
  fs.unlinkSync(inputPath);
  fs.renameSync(tempMp4Path, inputPath);

  // 2. Create WebM version: VP9, no audio (-an), CRF 36
  const webmCmd = `"${ffmpegPath}" -y -i "${inputPath}" -an -vf "scale='min(1280,iw)':-2" -c:v libvpx-vp9 -crf 36 -b:v 0 "${webmPath}"`;
  console.log(`Generating WebM...`);
  execSync(webmCmd, { stdio: 'inherit' });

  const webmSize = fs.statSync(webmPath).size;
  console.log(`WebM size: ${(webmSize / 1024).toFixed(2)} KB`);
});

console.log('\nVideo compression completed!');
