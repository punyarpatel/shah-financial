import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FadeIn from './animations/FadeIn';
import { blogs } from '../pages/SingleBlogPage';

const BlogSection = () => {
  const allBlogs = [...blogs].reverse();
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoRotateInterval = useRef(null);

  // Rotate to next blog index
  const nextSlide = () => {
    setStartIndex((prevIndex) => (prevIndex + 1) % allBlogs.length);
  };

  const prevSlide = () => {
    setStartIndex((prevIndex) => (prevIndex - 1 + allBlogs.length) % allBlogs.length);
  };

  // Continuous auto rotation timer (every 3.5 seconds)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % allBlogs.length);
    }, 3500);

    return () => clearInterval(timer);
  }, [isPaused, allBlogs.length]);

  // Compute 3 visible items based on current startIndex
  const visibleBlogs = [
    allBlogs[startIndex % allBlogs.length],
    allBlogs[(startIndex + 1) % allBlogs.length],
    allBlogs[(startIndex + 2) % allBlogs.length]
  ];

  return (
    <section id="blog" className="w-full bg-[#faf8f4] overflow-hidden select-none">
      <div className="max-w-7xl mx-auto py-[3.5rem] px-4">
        
        <FadeIn>
          {/* Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-[2rem] gap-4">
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

        {/* Animated Carousel Grid */}
        <div 
          className="relative min-h-[300px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={startIndex}
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.45, ease: 'easeOut' }}
              className="grid grid-cols-1 md:grid-cols-3 gap-[24px]"
            >
              {visibleBlogs.map((blog) => (
                <div key={blog.id} className="h-full">
                  <div className="bg-white border border-[#0d2545]/10 rounded-[14px] p-[2rem] hover:-translate-y-1 hover:shadow-xl hover:border-[#c9922a]/50 transition-all duration-300 h-full flex flex-col group">
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
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Pagination Dots */}
        <div className="flex justify-center items-center gap-2 mt-8">
          {allBlogs.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setStartIndex(idx)}
              aria-label={`Go to article slide ${idx + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                idx === startIndex
                  ? 'w-8 bg-[#c9922a]'
                  : 'w-2.5 bg-[#0d2545]/20 hover:bg-[#0d2545]/40'
              }`}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default BlogSection;
