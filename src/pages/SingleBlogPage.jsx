import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import SipCompoundingVisualizer from '../components/SipCompoundingVisualizer';

export const blogs = [
  { id: 1, category: 'Mutual Funds', title: 'What is a SIP and How Does it Work?', excerpt: 'A Systematic Investment Plan allows you to invest a fixed amount every month in mutual funds. Learn how it builds wealth over time through compounding.', date: 'January 15, 2026', slug: 'what-is-sip', content: 'A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. It allows an investor to invest a fixed amount of money at pre-defined intervals (such as monthly, quarterly, etc.) in a mutual fund scheme. SIPs are a great way to average out the cost of investment and benefit from the power of compounding.' },
  { id: 2, category: 'Insurance', title: 'Term Insurance vs Endowment — What Should You Buy?', excerpt: 'Most people confuse term and endowment plans. Here is a clear breakdown to help you choose the right protection for your family.', date: 'February 3, 2026', slug: 'term-vs-endowment', content: 'When it comes to life insurance, two of the most popular options are term insurance and endowment plans. Term insurance provides a large life cover at a very affordable premium, focusing solely on protection. Endowment plans, on the other hand, combine life cover with savings or investment components. Choosing between the two depends on your financial goals.' },
  { id: 3, category: 'NRI', title: 'NRI Guide to Investing in Indian Mutual Funds', excerpt: 'From NRE account setup to DTAA benefits — everything an NRI needs to know before investing in Indian markets.', date: 'March 12, 2026', slug: 'nri-guide-investing', content: 'Non-Resident Indians (NRIs) have excellent opportunities to invest in Indian mutual funds. To start, an NRI must have a Non-Resident External (NRE) or Non-Resident Ordinary (NRO) bank account. Understanding the taxation rules, repatriation benefits, and KYC requirements is essential for a smooth investment journey.' },
  { id: 4, category: 'Taxation', title: 'Save Tax with ELSS: A Complete Guide', excerpt: 'Maximize your Section 80C deductions by investing in Equity Linked Savings Schemes. High returns with a short lock-in period.', date: 'March 25, 2026', slug: 'elss-tax-saving', content: 'Equity Linked Savings Schemes (ELSS) are tax-saving mutual funds that qualify for tax deduction under Section 80C of the Income Tax Act. They offer a dual benefit of capital appreciation and tax saving. With a relatively short lock-in period of 3 years compared to other tax-saving instruments, ELSS is an attractive choice for investors looking for long-term wealth creation.' },
  { id: 5, category: 'Wealth Planning', title: 'The Power of Goal-Based Wealth Planning', excerpt: 'Learn how assigning specific goals like education, retirement, or a dream home to your investments can supercharge your wealth creation journey.', date: 'April 10, 2026', slug: 'goal-based-wealth-planning', content: 'Investing without a goal is like taking a journey without a destination. Goal-based wealth planning allows you to create dedicated investment buckets for your most important life milestones—whether it is your children’s education, purchasing a home, starting a business, or planning dream vacations. By assigning a specific time horizon and risk profile to each goal, you can select the right mix of mutual funds and financial instruments. This structured approach not only helps track progress but also prevents you from prematurely dipping into funds meant for long-term objectives.' },
];

const SingleBlogPage = () => {
  const { slug } = useParams();
  const blog = blogs.find(b => b.slug === slug);

  if (!blog) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-cream">
        <Navbar />
        <div className="flex-grow flex flex-col items-center justify-center w-full">
          <h1 className="text-[120px] font-serif font-bold text-navy leading-none mb-4">404</h1>
          <p className="text-muted text-[18px] mb-8">Blog post not found</p>
          <Link 
            to="/blog" 
            className="bg-gold text-white px-8 py-3 rounded-[8px] font-medium hover:bg-goldLight transition-colors"
          >
            Back to Blogs
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>{blog.title} — Shah Financial Services</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={`${blog.title} — Shah Financial Services`} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} — Shah Financial Services`} />
        <meta name="twitter:description" content={blog.excerpt} />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      <section className="flex-grow py-[4rem] w-full">
        <div className="max-w-5xl mx-auto px-4">
          <FadeIn>
            <Link to="/blog" className="text-gold hover:text-navy font-semibold text-[14px] mb-6 inline-flex items-center transition-colors">
              &larr; Back to all blogs
            </Link>
            
            <div className="mb-8">
              <div className="flex items-center gap-[12px] mb-[1.25rem]">
                <span className="text-gold text-[11px] uppercase tracking-wider font-semibold bg-gold/10 px-[8px] py-[3px] rounded-[4px]">
                  {blog.category}
                </span>
                <span className="text-muted/60 text-[12px] font-medium">
                  {blog.date}
                </span>
              </div>
              <h1 className="font-serif text-[32px] md:text-[40px] text-navy font-semibold mb-6 leading-tight">
                {blog.title}
              </h1>
            </div>

            <div className="bg-white p-8 md:p-12 rounded-[14px] shadow-sm border border-navy/10">
              <div className="prose prose-lg max-w-none text-muted">
                <p className="text-[18px] leading-relaxed mb-6 font-medium text-navy">
                  {blog.excerpt}
                </p>
                <p className="text-[16px] leading-relaxed mb-8">
                  {blog.content}
                </p>

                {blog.slug === 'what-is-sip' && (
                  <div className="my-10 not-prose">
                    <SipCompoundingVisualizer />
                  </div>
                )}
                
                <h3 className="text-navy text-[22px] font-serif font-semibold mt-8 mb-4">Key Takeaways</h3>
                <ul className="list-disc pl-5 mb-6 text-[16px] leading-relaxed space-y-2">
                  <li>Understand your financial goals before making an investment.</li>
                  <li>Consistency and discipline are crucial for long-term wealth creation.</li>
                  <li>Consult a registered financial advisor to tailor a strategy to your profile.</li>
                </ul>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default SingleBlogPage;
