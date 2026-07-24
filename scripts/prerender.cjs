/**
 * Static Pre-Rendering (SSG) Script for Drishti Wealth SPA
 * Generates static HTML pre-rendered files for all key routes in dist/
 * to ensure 100% search engine crawlability and instant social media previews.
 */

const fs = require('fs');
const path = require('path');

const DIST_DIR = path.join(__dirname, '..', 'dist');

const routes = [
  {
    path: 'index.html',
    title: 'Drishti Wealth: AMFI Registered Mutual Fund Distributor Ahmedabad',
    description: 'Trusted AMFI-registered mutual fund distributor & insurance advisor in Ahmedabad serving 6,000+ clients and NRIs globally since 2001.',
    heading: 'Your Trusted Partner for Financial Growth'
  },
  {
    path: 'nri/index.html',
    title: 'NRI Financial Services & Indian Mutual Fund Advisory | Drishti Wealth',
    description: 'Specialized Indian mutual fund and health insurance advisory for NRIs in USA, Canada, UK, and UAE.',
    heading: 'Seamless Wealth Management for Non-Resident Indians'
  },
  {
    path: 'services/mutual-funds/index.html',
    title: 'Mutual Fund Advisory & SIP Investment | Drishti Wealth Ahmedabad',
    description: 'Expert mutual fund selection, SIP compounding strategies, and portfolio rebalancing in Ahmedabad.',
    heading: 'Goal-Based Mutual Fund Investments & SIPs'
  },
  {
    path: 'services/index.html',
    title: 'Financial Services & Portfolio Advisory | Drishti Wealth',
    description: 'Comprehensive wealth management services including Mutual Funds, Health Insurance, Travel Insurance, and Retirement Planning.',
    heading: 'Comprehensive Financial Solutions'
  },
  {
    path: 'about/index.html',
    title: 'About Drishti Wealth | AMFI Registered MFD Since 2001',
    description: 'Learn about Drishti Wealth, our 25+ year heritage, values, and commitment to client-centric financial growth.',
    heading: '25+ Years of Trust & Wealth Creation'
  }
];

function prerender() {
  if (!fs.existsSync(DIST_DIR)) {
    console.log('⚠ dist/ directory does not exist. Run npm run build first.');
    return;
  }

  const baseHtml = fs.readFileSync(path.join(DIST_DIR, 'index.html'), 'utf8');

  console.log('⚡ Pre-rendering static HTML pages for SEO Crawlability...\n');

  routes.forEach(route => {
    const filePath = path.join(DIST_DIR, route.path);
    const dir = path.dirname(filePath);

    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    let prerenderedHtml = baseHtml
      .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
      .replace(/<meta name="description" content=".*?" \/>/, `<meta name="description" content="${route.description}" />`)
      .replace(/<meta property="og:title" content=".*?" \/>/, `<meta property="og:title" content="${route.title}" />`)
      .replace(/<meta property="og:description" content=".*?" \/>/, `<meta property="og:description" content="${route.description}" />`);

    // Inject static crawlable fallback text inside #root for non-JS bots
    const fallbackText = `<div id="root" data-prerendered="true">
      <div style="display:none">
        <h1>${route.heading}</h1>
        <p>${route.description}</p>
      </div>
    </div>`;

    prerenderedHtml = prerenderedHtml.replace('<div id="root"></div>', fallbackText);

    fs.writeFileSync(filePath, prerenderedHtml);
    console.log(`  ✔ Pre-rendered: /${route.path}`);
  });

  console.log('\n✅ Static Pre-Rendering Complete! All key landing pages are 100% crawlable.\n');
}

prerender();
