import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { blogs } from '../pages/SingleBlogPage';

const ModernFramerBlog = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  const categories = ['All', 'Mutual Funds', 'NRI Desk', 'Tax Planning', 'Insurance', 'Retirement'];

  const filteredBlogs = blogs.filter((blog) => {
    const matchesCategory = selectedCategory === 'All' || blog.category.toLowerCase().includes(selectedCategory.toLowerCase());
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) || blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const featuredBlog = blogs[blogs.length - 1]; // Latest blog as featured

  return (
    <div className="w-full bg-[#071324] text-white py-12 px-4 rounded-[36px] my-6 shadow-2xl border border-white/10 select-none">
      <div className="max-w-6xl mx-auto space-y-10">
        
        {/* Header */}
        <div className="text-center">
          <span className="text-xs font-mono font-bold uppercase tracking-[0.2em] text-goldLight bg-white/10 px-3.5 py-1 rounded-full border border-white/20">
            FRAMER KNOWLEDGE & INSIGHTS HUB
          </span>
          <h2 className="font-serif text-[32px] md:text-[46px] font-bold text-white leading-tight mt-3">
            Financial Intelligence Center
          </h2>
          <p className="text-white/70 text-[15px] max-w-lg mx-auto mt-2 font-sans">
            Filtered market trends, ELSS tax strategies, and NRI wealth guide from AMFI advisors.
          </p>
        </div>

        {/* Filter Pills & Search Input */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-gold text-white shadow-md'
                    : 'bg-white/5 text-white/60 hover:text-white border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-64">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 border border-white/15 rounded-full px-4 py-1.5 text-xs text-white placeholder:text-white/40 focus:outline-none focus:border-gold"
            />
          </div>
        </div>

        {/* Featured Article Spotlight Card */}
        {featuredBlog && selectedCategory === 'All' && !searchQuery && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-navy border border-gold/40 rounded-[32px] p-8 md:p-10 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative overflow-hidden"
          >
            <div className="lg:col-span-8 space-y-4 z-10">
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold px-3 py-1 rounded-full bg-gold/20 text-goldLight border border-gold/40 uppercase">
                  FEATURED ARTICLE
                </span>
                <span className="text-xs text-white/50 font-mono">{featuredBlog.date} &middot; {featuredBlog.readTime}</span>
              </div>

              <h3 className="font-serif text-[26px] md:text-[34px] font-bold text-white leading-snug">
                {featuredBlog.title}
              </h3>

              <p className="text-white/80 text-[14.5px] leading-relaxed font-sans line-clamp-3">
                {featuredBlog.excerpt}
              </p>

              <div className="pt-2">
                <Link
                  to={`/blog/${featuredBlog.slug}`}
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-gold text-white font-semibold text-xs hover:bg-goldLight transition-all"
                >
                  <span>Read Full Featured Guide</span>
                  <span>&rarr;</span>
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/5 border border-white/10 rounded-2xl p-6 text-center space-y-3 z-10">
              <span className="text-4xl block">💡</span>
              <h4 className="font-serif font-bold text-gold text-base">Key takeaway for Investors</h4>
              <p className="text-[12px] text-white/70 font-sans leading-relaxed">
                Learn how disciplined compounding and asset allocation protect returns against inflation.
              </p>
            </div>

            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-gold/15 rounded-full blur-3xl pointer-events-none" />
          </motion.div>
        )}

        {/* Filtered Grid Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -6, borderColor: 'rgba(201,146,42,0.6)' }}
              className="bg-white/5 border border-white/10 rounded-3xl p-6 flex flex-col justify-between shadow-lg transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-white/10 text-goldLight uppercase border border-white/10">
                    {blog.category}
                  </span>
                  <span className="text-[11px] text-white/40 font-mono">{blog.readTime}</span>
                </div>

                <h4 className="font-serif font-bold text-white text-[18px] leading-snug group-hover:text-gold transition-colors line-clamp-2">
                  {blog.title}
                </h4>

                <p className="text-white/70 text-[13px] leading-relaxed line-clamp-3 font-sans">
                  {blog.excerpt}
                </p>
              </div>

              <div className="border-t border-white/10 pt-4 mt-6 flex justify-between items-center text-[11px] font-mono">
                <span className="text-white/40">{blog.date}</span>
                <Link
                  to={`/blog/${blog.slug}`}
                  className="text-goldLight hover:text-white font-bold flex items-center gap-1 transition-colors"
                >
                  Read &rarr;
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ModernFramerBlog;
