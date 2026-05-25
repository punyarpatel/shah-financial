import React from 'react';
import { Link } from 'react-router-dom';
import FadeIn from './animations/FadeIn';
import StaggerGroup from './animations/StaggerGroup';
import StaggerItem from './animations/StaggerItem';
import { blogs } from '../pages/SingleBlogPage';

const BlogSection = () => {
  // Get the 3 most recent blogs
  const latestBlogs = [...blogs].reverse().slice(0, 3);

  return (
    <section id="blog" className="w-full bg-[#faf8f4] overflow-hidden">
      <div className="max-w-7xl mx-auto py-[3.5rem] px-4">
        
        <FadeIn>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-[2.5rem] gap-4">
            <div>
              <div className="text-[#c9922a] text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
                Learn & Grow
              </div>
              <h2 className="font-serif text-[28px] md:text-[36px] text-[#1a1a2e] font-semibold leading-[1.2]">
                Financial Insights
              </h2>
            </div>
            
            <Link 
              to="/blog"
              className="inline-flex items-center text-[#c9922a] text-[14px] font-semibold tracking-wide hover:text-[#0d2545] transition-colors"
            >
              View All Articles &rarr;
            </Link>
          </div>
        </FadeIn>

        {/* Grid */}
        <StaggerGroup className="grid grid-cols-1 md:grid-cols-3 gap-[24px]">
          {latestBlogs.map((blog) => (
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
                
                <h3 className="font-serif text-[#0d2545] text-[20px] font-semibold mb-[1rem] leading-tight group-hover:text-[#c9922a] transition-colors">
                  {blog.title}
                </h3>
                
                <p className="text-[#5c6478] text-[14px] leading-[1.6] mb-[2rem] flex-grow line-clamp-3">
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
    </section>
  );
};

export default BlogSection;
