import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import FadeIn from '../components/animations/FadeIn';
import BlogArticleContent from '../components/BlogArticleContent';

export const blogs = [
  { id: 1, category: 'Mutual Funds', title: 'What is a SIP and How Does it Work?', excerpt: 'A Systematic Investment Plan allows you to invest a fixed amount every month in mutual funds. Learn how it builds wealth over time through compounding.', date: 'January 15, 2026', slug: 'what-is-sip', content: 'A Systematic Investment Plan (SIP) is a disciplined way of investing in mutual funds. It allows an investor to invest a fixed amount of money at pre-defined intervals (such as monthly, quarterly, etc.) in a mutual fund scheme. SIPs are a great way to average out the cost of investment and benefit from the power of compounding.' },
  { id: 2, category: 'Insurance', title: 'Endowment vs ULIP: Which Insurance Savings Plan is Right for You?', excerpt: 'Comparing traditional Endowment policies with market-linked ULIPs. Understand the key differences in returns, lock-in, fund switching, and cost structures.', date: 'February 3, 2026', slug: 'endowment-vs-ulip', content: 'Both Endowment plans and Unit Linked Insurance Plans (ULIPs) combine life insurance cover with financial savings. However, Endowment plans invest primarily in low-risk debt and government securities yielding guaranteed but low returns (4-5%), whereas ULIPs invest directly into stock market equity and bond funds offering higher growth potential, fund switching flexibility, and tax-free withdrawals under Section 10(10D).' },
  { id: 3, category: 'NRI', title: 'NRI Guide to Investing in Indian Mutual Funds', excerpt: 'From NRE account setup to DTAA benefits: everything an NRI needs to know before investing in Indian markets.', date: 'March 12, 2026', slug: 'nri-guide-investing', content: 'Non-Resident Indians (NRIs) have excellent opportunities to invest in Indian mutual funds. To start, an NRI must have a Non-Resident External (NRE) or Non-Resident Ordinary (NRO) bank account. Understanding the taxation rules, repatriation benefits, and KYC requirements is essential for a smooth investment journey.' },
  { id: 4, category: 'Taxation', title: 'Save Tax with ELSS: A Complete Guide', excerpt: 'Maximize your Section 80C deductions by investing in Equity Linked Savings Schemes. High returns with a short lock-in period.', date: 'March 25, 2026', slug: 'elss-tax-saving', content: 'Equity Linked Savings Schemes (ELSS) are tax-saving mutual funds that qualify for tax deduction under Section 80C of the Income Tax Act. They offer a dual benefit of capital appreciation and tax saving. With a relatively short lock-in period of 3 years compared to other tax-saving instruments, ELSS is an attractive choice for investors looking for long-term wealth creation.' },
  { id: 5, category: 'Wealth Planning', title: 'The Power of Goal-Based Wealth Planning', excerpt: 'Learn how assigning specific goals like education, retirement, or a dream home to your investments can supercharge your wealth creation journey.', date: 'April 10, 2026', slug: 'goal-based-wealth-planning', content: 'Investing without a goal is like taking a journey without a destination. Goal-based wealth planning allows you to create dedicated investment buckets for your most important life milestones, whether it is your children’s education, purchasing a home, starting a business, or planning dream vacations. By assigning a specific time horizon and risk profile to each goal, you can select the right mix of mutual funds and financial instruments. This structured approach not only helps track progress but also prevents you from prematurely dipping into funds meant for long-term objectives.' },
  { id: 6, category: 'Mutual Funds', title: 'How Does a Systematic Withdrawal Plan (SWP) Work?', excerpt: 'Discover how SWP provides a steady, tax-efficient monthly income from your mutual fund investments while preserving your capital for retirement.', date: 'April 22, 2026', slug: 'how-does-swp-work', content: 'A Systematic Withdrawal Plan (SWP) allows you to withdraw a fixed amount of money at regular intervals (monthly, quarterly, or annually) from your existing mutual fund investment. While SIP helps you accumulate wealth, SWP helps you monetize your corpus seamlessly. It is an ideal solution for retirees and individuals seeking a regular cash flow without liquidating their entire portfolio. In addition, SWPs are significantly more tax-efficient than conventional fixed deposits since capital gains taxation applies only to the gains portion of each withdrawal, rather than the entire payout.' },
  { id: 7, category: 'Insurance', title: 'Why Insurance is Necessary & The Most Important Types You Need', excerpt: 'Insurance protects your family against life’s unpredictable financial emergencies. Learn about the essential coverage types every family must prioritize.', date: 'May 5, 2026', slug: 'why-insurance-is-necessary-and-important-types', content: 'Insurance is the foundational cornerstone of any sound financial plan. Without adequate protection, a single medical emergency or unforeseen event can deplete years of hard-earned savings. The primary purpose of insurance is risk transfer—mitigating heavy financial liabilities in exchange for an affordable regular premium. The utmost essential types of insurance every individual should secure include: 1) Pure Term Life Insurance to secure your dependents financial future, 2) Comprehensive Health Insurance to cover hospitalization and medical inflation, 3) Critical Illness & Disability Insurance for income replacement during severe health crises, and 4) Asset & Travel Insurance to safeguard valuable assets and international journeys.' },
  { id: 8, category: 'Insurance', title: 'Why Personal Accident Insurance is Essential On Top of Health Insurance', excerpt: 'Health insurance pays your hospital bills, but Personal Accident Insurance replaces your lost income during temporary or permanent disability. Learn why having both is non-negotiable.', date: 'May 18, 2026', slug: 'personal-accident-vs-health-insurance', content: 'While Health Insurance covers in-patient hospitalization expenses, it does NOT cover loss of earnings, temporary total disability (TTD), permanent partial disability, or non-medical family expenses during an accidental injury recovery. Personal Accident Insurance acts as a financial income-replacement shield, paying lump-sum benefits for accidental death, disability, child education allowance, and lifestyle modification.' },
  { id: 9, category: 'Insurance', title: 'Critical Illness Coverage: Securing Assets Against Lifestyle Diseases', excerpt: 'Major health diagnoses like cancer, kidney failure, or cardiac stroke require large lump-sum funds beyond hospital stays. Discover why a Critical Illness rider is indispensable.', date: 'June 2, 2026', slug: 'critical-illness-insurance-guide', content: 'Health insurance operates on an expense-reimbursement basis. In contrast, Critical Illness Insurance pays a 100% upfront lump-sum cash benefit immediately upon diagnosis of a covered major condition (such as cancer, heart attack, or stroke), regardless of actual hospital bills. This cash lump sum enables families to afford experimental treatments, overseas medical care, and meet ongoing household financial commitments.' },
  { id: 10, category: 'Mutual Funds', title: 'Supercharge Your Portfolio with Step-Up SIPs', excerpt: 'Increasing your monthly SIP by just 10% every year can double your final wealth creation over 15 years. See the mathematical breakdown.', date: 'June 15, 2026', slug: 'step-up-sip-wealth-creation', content: 'A Step-Up SIP (or Top-Up SIP) automatically increases your monthly investment contribution by a fixed percentage (e.g., 10%) every year in line with your salary raises. By stepping up your SIP annually, you invest significantly more capital into market compounding, accelerating your journey toward financial freedom by several years.' },
  { id: 11, category: 'Wealth Planning', title: 'The Art of Asset Allocation: Protecting Wealth in Volatile Markets', excerpt: 'Never put all your eggs in one basket. Discover how balancing equity, debt, gold, and international assets shields your portfolio during market turbulence.', date: 'July 1, 2026', slug: 'asset-allocation-market-volatility', content: 'Asset allocation is the strategic distribution of an investment portfolio across diverse asset classes like Equity, Fixed Income (Debt), Gold, and Real Estate. Because different asset classes react differently to macroeconomic events, a well-allocated multi-asset portfolio lowers overall risk while generating stable risk-adjusted returns.' },
  { id: 12, category: 'Insurance', title: 'Term Insurance 101: The Essential Pure Protection Plan', excerpt: 'Understand why pure term life insurance is the single most critical foundation of personal finance. Learn how to calculate coverage, select riders, and avoid claim traps.', date: 'July 20, 2026', slug: 'term-insurance-complete-guide', content: 'Term insurance is a straightforward, affordable financial safety net that guarantees a large lump-sum payout to your loved ones if an untimely event occurs during the policy term. Unlike traditional investment-cum-insurance policies, pure term plans offer high sum assured coverage at minimal cost, ensuring your family maintains their standard of living, pays off debts, and achieves long-term financial goals without compromise.' },
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
        <title>{blog.title} | Drishti Wealth</title>
        <meta name="description" content={blog.excerpt} />
        <meta property="og:title" content={`${blog.title} | Drishti Wealth`} />
        <meta property="og:description" content={blog.excerpt} />
        <meta property="og:image" content={ogImage} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content={window.location.href} />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${blog.title} | Drishti Wealth`} />
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
                
                {/* Rich Educational Content with Diagrams, Visual Tables & Real-World Examples */}
                <BlogArticleContent slug={blog.slug} />
                
                <h3 className="text-navy text-[22px] font-serif font-semibold mt-10 mb-4 border-t border-slate-200 pt-6">Key Takeaways</h3>
                <ul className="list-disc pl-5 mb-6 text-[16px] leading-relaxed space-y-2">
                  <li>Understand your financial goals and time horizon before choosing any instrument.</li>
                  <li>Consistency and automated discipline are crucial for long-term wealth creation.</li>
                  <li>Consult a certified financial advisor to build a customized, tax-efficient portfolio strategy.</li>
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
