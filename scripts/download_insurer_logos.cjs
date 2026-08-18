const fs = require('fs');
const https = require('https');
const path = require('path');

const LOGOS = [
  { key: 'lic', url: 'https://upload.wikimedia.org/wikipedia/en/thumb/0/05/LIC_Logo.svg/512px-LIC_Logo.svg.png' },
  { key: 'icici_pru', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/d/d7/ICICI_Prudential_Life_Insurance_logo.svg/512px-ICICI_Prudential_Life_Insurance_logo.svg.png' },
  { key: 'tata_aia', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tata_AIA_Life_Insurance_logo.svg/512px-Tata_AIA_Life_Insurance_logo.svg.png' },
  { key: 'hdfc_life', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/HDFC_Life_logo.svg/512px-HDFC_Life_logo.svg.png' },
  { key: 'bajaj_life', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Bajaj_Allianz_Life_Insurance_logo.svg/512px-Bajaj_Allianz_Life_Insurance_logo.svg.png' },
  { key: 'hdfc_ergo', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/HDFC_ERGO_logo.svg/512px-HDFC_ERGO_logo.svg.png' },
  { key: 'icici_lombard', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/ICICI_Lombard_logo.svg/512px-ICICI_Lombard_logo.svg.png' },
  { key: 'tata_aig', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/Tata_AIG_logo.svg/512px-Tata_AIG_logo.svg.png' },
  { key: 'godigit', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Go_Digit_logo.svg/512px-Go_Digit_logo.svg.png' },
  { key: 'indusind', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/IndusInd_Bank_logo.svg/512px-IndusInd_Bank_logo.svg.png' },
  { key: 'bajaj_general', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/92/Bajaj_Allianz_General_Insurance_logo.svg/512px-Bajaj_Allianz_General_Insurance_logo.svg.png' },
  { key: 'zuno', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/Zuno_General_Insurance_logo.svg/512px-Zuno_General_Insurance_logo.svg.png' },
  { key: 'niva_bupa', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Niva_Bupa_logo.svg/512px-Niva_Bupa_logo.svg.png' },
  { key: 'star_health', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/Star_Health_and_Allied_Insurance_logo.svg/512px-Star_Health_and_Allied_Insurance_logo.svg.png' },
  { key: 'care_health', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Care_Health_Insurance_logo.svg/512px-Care_Health_Insurance_logo.svg.png' }
];

const destDir = path.join(__dirname, '..', 'public', 'images', 'insurers');
if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    const file = fs.createWriteStream(dest);
    const request = (targetUrl) => {
      https.get(targetUrl, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' } }, (res) => {
        if (res.statusCode === 301 || res.statusCode === 302) {
          request(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          console.log(`Failed ${dest}: Status ${res.statusCode}`);
          file.close();
          fs.unlink(dest, () => {});
          resolve(false);
          return;
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded: ${path.basename(dest)}`);
            resolve(true);
          });
        });
      }).on('error', (err) => {
        console.log(`Error ${dest}:`, err.message);
        fs.unlink(dest, () => {});
        resolve(false);
      });
    };
    request(url);
  });
}

async function main() {
  for (const item of LOGOS) {
    const filePath = path.join(destDir, `${item.key}.png`);
    await downloadFile(item.url, filePath);
  }
}

main();
