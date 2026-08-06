import fs from 'fs';

const htmlContent = fs.readFileSync('C:/Users/punya/OneDrive/Desktop/dw_logo_3d_model_viewer_v2.html', 'utf-8');
const match = htmlContent.match(/src="data:model\/gltf-binary;base64,([^"]+)"/);

if (match && match[1]) {
  const base64Data = match[1];
  const buffer = Buffer.from(base64Data, 'base64');
  
  fs.writeFileSync('d:/vite-project/public/dw_logo_3d.glb', buffer);
  fs.writeFileSync('d:/vite-project/public/assets/dw_logo_3d.glb', buffer);
  console.log('Successfully extracted v2 3D GLB model! Size:', buffer.length, 'bytes');
} else {
  console.error('Could not find base64 GLB data in HTML file.');
}
