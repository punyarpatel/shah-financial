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
    title: 'Drishti Wealth: AMFI Registered Mutual Fund Advisor & Distributor Ahmedabad',
    description: 'Top AMFI-registered mutual fund advisor & distributor in Ahmedabad. Goal-based SIP planning, portfolio reviews, and financial planning in India since 2001.',
    heading: 'AMFI Registered Mutual Fund Advisor & Distributor in Ahmedabad'
  },
  {
    path: 'nri/index.html',
    title: 'NRI Investment Advisory & Indian Mutual Fund Services | Drishti Wealth',
    description: 'Specialized NRI mutual fund investment advisory, NRI health insurance in India, DTAA guidance, and remote KYC setup.',
    heading: 'NRI Investment Advisory & Mutual Fund Services in India'
  },
  {
    path: 'services/index.html',
    title: 'Financial Planning & Investment Advisory Services | Drishti Wealth',
    description: 'Comprehensive wealth management services including Mutual Funds, Health Insurance, NRI Advisory, and Retirement Planning.',
    heading: 'Financial Planning & Investment Advisory Services in India'
  },
  {
    path: 'services/mutual-funds/index.html',
    title: 'Mutual Fund Advisor & Distributor in Ahmedabad | Drishti Wealth',
    description: 'Top AMFI-registered mutual fund advisor & distributor in Ahmedabad. Goal-based SIP planning, portfolio reviews, and fund selection.',
    heading: 'Mutual Fund Advisor & Distributor in Ahmedabad'
  },
  {
    path: 'services/insurance/index.html',
    title: 'Insurance Advisory & Health Coverage | Drishti Wealth',
    description: 'Comprehensive term life, health, and critical illness insurance advisory services.',
    heading: 'Protect What Matters Most'
  },
  {
    path: 'services/retirement/index.html',
    title: 'Retirement Planning & SWP Solutions | Drishti Wealth',
    description: 'Build a bulletproof retirement corpus with tax-efficient Systematic Withdrawal Plans (SWP).',
    heading: 'Secure Your Financial Independence in Retirement'
  },
  {
    path: 'services/goal-planning/index.html',
    title: 'Goal-Based Wealth Planning | Drishti Wealth',
    description: 'Structured financial planning for child education, home buying, and long-term milestones.',
    heading: 'Turn Your Financial Goals into Reality'
  },
  {
    path: 'services/travel-insurance/index.html',
    title: 'International Travel Insurance | Drishti Wealth',
    description: 'Global travel insurance coverage for visitors, students, and overseas business trips.',
    heading: 'Worry-Free Global Travel Coverage'
  },
  {
    path: 'services/property-insurance/index.html',
    title: 'Property & Asset Insurance | Drishti Wealth',
    description: 'Safeguard your commercial and residential property against fire, theft, and natural hazards.',
    heading: 'Comprehensive Property Protection'
  },
  {
    path: 'about/index.html',
    title: 'About Drishti Wealth | AMFI Registered MFD Since 2001',
    description: 'Learn about Drishti Wealth, our 25+ year heritage, values, and commitment to client-centric financial growth.',
    heading: '25+ Years of Trust & Wealth Creation'
  },
  {
    path: 'blog/index.html',
    title: 'Financial Insights & Education | Drishti Wealth',
    description: 'Expert articles on mutual funds, SIP investing, tax-saving ELSS, insurance planning, and NRI investments.',
    heading: 'Financial Insights & Educational Resources'
  },
  {
    path: 'disclosures/index.html',
    title: 'Disclosures & Regulatory Compliance | Drishti Wealth',
    description: 'AMFI registration details, SEBI compliance disclosures, and investor grievance redressal policy.',
    heading: 'Regulatory Disclosures & Investor Safeguards'
  },
  {
    path: 'privacy-policy/index.html',
    title: 'Privacy Policy | Drishti Wealth',
    description: 'Drishti Wealth privacy policy detailing data security, collection, and usage standards.',
    heading: 'Privacy Policy & Data Security'
  },
  {
    path: 'terms-of-service/index.html',
    title: 'Terms of Service | Drishti Wealth',
    description: 'Terms and conditions governing the use of Drishti Wealth website and financial services.',
    heading: 'Terms of Service'
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

    prerenderedHtml = prerenderedHtml.replace(/<div id="root">[\s\S]*?<\/div>/, fallbackText);

    fs.writeFileSync(filePath, prerenderedHtml);
    console.log(`  ✔ Pre-rendered: /${route.path}`);
  });

  console.log('\n✅ Static Pre-Rendering Complete! All key landing pages are 100% crawlable.\n');
}

prerender();
