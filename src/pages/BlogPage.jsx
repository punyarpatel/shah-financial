import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import StaggerGroup from '../components/animations/StaggerGroup';
import StaggerItem from '../components/animations/StaggerItem';

import { blogs } from './SingleBlogPage';
import ModernFramerBlog from '../components/ModernFramerBlog';

const BlogPage = () => {
  const [blogMode, setBlogMode] = useState('framer'); // 'classic' | 'framer'
  const ogImage = `${window.location.origin}/why_choose_us_mockup.png`;

  return (
    <div className="min-h-screen bg-[#faf8f4] flex flex-col relative">
      <Helmet>
        <title>Financial Insights & Education | Drishti Wealth</title>
        <meta name="description" content="Expert articles on mutual funds, SIP investing, tax-saving ELSS, insurance planning, NRI investments, and personal finance from Drishti Wealth, Ahmedabad." />
        <meta property="og:title" content="Financial Insights & Education | Drishti Wealth" />
        <meta property="og:description" content="Expert articles on mutual funds, SIP investing, tax-saving ELSS, insurance planning, NRI investments, and personal finance from Drishti Wealth, Ahmedabad." />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Financial Insights & Education | Drishti Wealth" />
        <meta name="twitter:description" content="Expert articles on mutual funds, SIP investing, tax-saving ELSS, insurance planning, NRI investments, and personal finance from Drishti Wealth, Ahmedabad." />
        <meta name="twitter:image" content={ogImage} />
      </Helmet>

      <Navbar />

      <section className="flex-grow py-[2rem] w-full">
        {/* Blog Layout Switcher Pill */}
        <div className="flex justify-center mb-6">
          <div className="inline-flex items-center p-1 bg-navy/5 border border-navy/10 rounded-full text-xs font-semibold shadow-sm z-20">
            <button
              onClick={() => setBlogMode('classic')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                blogMode === 'classic'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              Classic Articles Grid
            </button>
            <button
              onClick={() => setBlogMode('framer')}
              className={`px-4 py-1.5 rounded-full transition-all duration-300 ${
                blogMode === 'framer'
                  ? 'bg-navy text-white shadow-md'
                  : 'text-navy/60 hover:text-navy'
              }`}
            >
              Framer Intelligence Hub
            </button>
          </div>
        </div>

        {blogMode === 'framer' ? (
          <ModernFramerBlog />
        ) : (
          <div className="max-w-7xl mx-auto px-4">
            
            {/* Header */}
            <FadeIn>
              <div className="text-center mb-[3.5rem]">
              <div className="inline-block bg-[#c9922a]/10 text-[#c9922a] text-[11px] uppercase tracking-[0.15em] font-medium px-[12px] py-[4px] rounded-[20px] mb-[1rem]">
                Learn & Grow
              </div>
              <h1 className="font-serif text-[36px] md:text-[44px] text-[#1a1a2e] font-semibold mb-[1rem] leading-tight">
                Financial Insights
              </h1>
              <p className="text-[#5c6478] text-[15px] md:text-[16px] leading-[1.6] max-w-[540px] mx-auto">
                Read our latest articles on mutual funds, market trends, insurance, and personal finance strategies to stay informed.
              </p>
            </div>
          </FadeIn>

          {/* Grid */}
          <StaggerGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[24px]">
            {[...blogs].reverse().map((blog) => (
              <StaggerItem key={blog.id}>
                <div className="bg-white border border-[#0d2545]/10 rounded-[14px] p-[2rem] hover:-translate-y-1 hover:shadow-lg hover:border-[#c9922a]/50 transition-all duration-300 h-full flex flex-col group">
                  <div className="flex items-center gap-[12px] mb-[1.25rem]">
                    <span className="text-[#c9922a] text-[11px] uppercase tracking-wider font-semibold bg-[#c9922a]/10 px-[8px] py-[3px] rounded-[4px]">
                      {blog.category}
                    </span>
                    <span className="text-[#5c6478]/60 text-[12px] font-medium">
                      {blog.date}
                    </span>
                  </div>
                  
                  <h2 className="font-serif text-[#0d2545] text-[22px] font-semibold mb-[1rem] leading-tight group-hover:text-[#c9922a] transition-colors">
                    {blog.title}
                  </h2>
                  
                  <p className="text-[#5c6478] text-[14px] leading-[1.6] mb-[2rem] flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="inline-flex items-center text-[#c9922a] text-[13px] font-semibold tracking-wide hover:text-[#0d2545] transition-colors mt-auto"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </StaggerItem>
            ))}
            </StaggerGroup>
          </div>
        )}
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default BlogPage;
