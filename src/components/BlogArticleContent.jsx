import React from 'react';
import SipCompoundingVisualizer from './SipCompoundingVisualizer';

const BlogArticleContent = ({ slug }) => {
  switch (slug) {
    case 'what-is-sip':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              A Systematic Investment Plan (SIP) transforms volatile stock market movements into an engine for long-term wealth creation. By automating monthly contributions, investors benefit from rupee cost averaging and the exponential magic of compounding.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. What is a Systematic Investment Plan (SIP)?
          </h2>
          <p>
            A <strong>Systematic Investment Plan (SIP)</strong> is an investment vehicle offered by mutual funds that allows individuals to invest a fixed sum of money at regular intervals—typically monthly—into a chosen mutual fund scheme. Rather than attempting to time market peaks and troughs with a large one-time lump sum, SIP encourages financial discipline by automating investments directly from your bank account.
          </p>

          {/* Diagram 1: Rupee Cost Averaging Visual */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">VISUAL CONCEPT DIAGRAM</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">How Rupee Cost Averaging Works in Market Cycles</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-gold font-bold text-[18px]">Bull Market (Price High)</div>
                <div className="text-slate-300 text-[13px] mt-2">NAV is ₹100</div>
                <div className="text-emerald-400 font-mono text-[14px] mt-1 font-semibold">₹10,000 buys 100 Units</div>
                <div className="text-slate-400 text-[12px] mt-2">Prevents over-allocation at market highs.</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-gold/40 ring-1 ring-gold/30">
                <div className="text-amber-400 font-bold text-[18px]">Bear Market (Price Dip)</div>
                <div className="text-slate-300 text-[13px] mt-2">NAV drops to ₹50</div>
                <div className="text-emerald-400 font-mono text-[14px] mt-1 font-semibold">₹10,000 buys 200 Units</div>
                <div className="text-goldLight text-[12px] mt-2">Automatically accumulates 2x more units!</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-emerald-400 font-bold text-[18px]">Recovery Phase</div>
                <div className="text-slate-300 text-[13px] mt-2">NAV recovers to ₹80</div>
                <div className="text-emerald-400 font-mono text-[14px] mt-1 font-semibold">Average Cost = ₹66.6</div>
                <div className="text-slate-400 text-[12px] mt-2">Portfolio accelerates into high profitability.</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. The Power of Compounding over Time
          </h2>
          <p>
            Compounding is the process where your investment earnings generate their own earnings. In the initial years, your returns might seem modest. However, as the timeline stretches past 10 to 15 years, the compounding curve turns exponential.
          </p>

          {/* Interactive Compounding Visualizer */}
          <div className="my-10">
            <SipCompoundingVisualizer />
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            3. Compounding Impact Table (Assuming 12% Expected CAGR)
          </h2>
          <p>
            The table below highlights how consistent monthly SIP investments of ₹10,000 grow across different time horizons:
          </p>

          {/* Table */}
          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Time Horizon</th>
                  <th className="p-4">Total Amount Invested</th>
                  <th className="p-4">Estimated Wealth Created</th>
                  <th className="p-4 text-goldLight">Wealth Multiplier</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr>
                  <td className="p-4 font-semibold text-navy">5 Years</td>
                  <td className="p-4">₹6,00,000</td>
                  <td className="p-4 font-semibold text-slate-800">₹8,24,864</td>
                  <td className="p-4 text-gold font-mono font-bold">1.37x</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">10 Years</td>
                  <td className="p-4">₹12,00,000</td>
                  <td className="p-4 font-semibold text-slate-800">₹23,23,391</td>
                  <td className="p-4 text-gold font-mono font-bold">1.93x</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">15 Years</td>
                  <td className="p-4">₹18,00,000</td>
                  <td className="p-4 font-semibold text-slate-800">₹50,45,760</td>
                  <td className="p-4 text-gold font-mono font-bold">2.80x</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">20 Years</td>
                  <td className="p-4">₹24,00,000</td>
                  <td className="p-4 font-semibold text-slate-800 font-serif text-[16px] text-navy">₹99,91,479</td>
                  <td className="p-4 text-gold font-mono font-bold text-[16px]">4.16x</td>
                </tr>
                <tr className="bg-amber-500/10">
                  <td className="p-4 font-bold text-navy">25 Years</td>
                  <td className="p-4 font-bold">₹30,00,000</td>
                  <td className="p-4 font-bold text-emerald-700 font-serif text-[18px]">₹1,89,76,351</td>
                  <td className="p-4 text-emerald-700 font-mono font-bold text-[18px]">6.32x</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Worked Example */}
          <div className="my-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            <h4 className="font-serif font-bold text-navy text-[18px] mb-2">Real-World Case Study: Rahul vs. Priya</h4>
            <p className="text-[14.5px] leading-relaxed">
              <strong>Rahul (Age 25)</strong> starts a SIP of ₹10,000/month and continues for 15 years until age 40 (Total invested: ₹18 Lakhs).
              <br />
              <strong>Priya (Age 35)</strong> delays starting until age 35, but invests double—₹20,000/month for 15 years until age 50 (Total invested: ₹36 Lakhs).
              <br />
              <span className="block mt-2 font-semibold text-navy">
                Result at Age 50: Rahul’s corpus grows to over ₹1.85 Crores due to starting 10 years earlier, while Priya’s corpus is ₹1.01 Crores despite investing twice as much capital!
              </span>
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            4. Practical Guidelines for Starting Your SIP
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Step-Up Annually:</strong> Increase your SIP amount by 5-10% every year aligned with your annual salary increments.</li>
            <li><strong>Automate via Bank Mandate:</strong> Set your SIP debit date 2-3 days after your salary credit date to avoid impulsive spending.</li>
            <li><strong>Stay Calm During Volatility:</strong> Never stop SIPs during market downturns—that is precisely when you accumulate cheap units.</li>
          </ul>
        </div>
      );

    case 'endowment-vs-ulip':
    case 'term-vs-endowment':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Both Endowment Plans and Unit Linked Insurance Plans (ULIPs) are valuable financial instruments that integrate life cover with long-term savings. Depending on your personal risk appetite, financial horizon, and wealth goals, each product offers distinct, powerful advantages for your financial portfolio.
            </p>
          </div>

          {/* Section 1: Endowment Benefits */}
          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. Key Benefits of Traditional Endowment Plans
          </h2>
          <p>
            Endowment plans are traditional life insurance policies designed for capital protection and steady, predictable savings. They are particularly beneficial for conservative investors seeking peace of mind.
          </p>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-amber-500/30">
            <div className="text-amber-400 text-[12px] font-mono uppercase tracking-widest mb-1">FINANCIAL ADVANTAGES</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">Why Endowment Plans are Beneficial</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-[16px]">1. Capital Safety & Guaranteed Bonuses</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Your capital is protected from stock market volatility. Yearly reversionary bonuses accrue to create guaranteed maturity wealth.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-[16px]">2. Disciplined Long-Term Savings</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Enforces structured, compulsory savings over 15 to 30 years, helping build dedicated funds for key family milestones.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-[16px]">3. Life Insurance Protection</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Ensures immediate financial security for your dependents with guaranteed Sum Assured in case of an unforeseen event.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-amber-300 font-bold text-[16px]">4. Dual Tax Benefits</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Qualifies for Section 80C tax deduction on annual premiums and tax-free maturity benefits under Section 10(10D).
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: ULIP Benefits */}
          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. Key Benefits of Unit Linked Insurance Plans (ULIPs)
          </h2>
          <p>
            ULIPs are dynamic, modern financial solutions that combine life insurance with market-linked investments. They are exceptionally beneficial for investors focused on wealth acceleration and active portfolio control.
          </p>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-emerald-500/30">
            <div className="text-emerald-400 text-[12px] font-mono uppercase tracking-widest mb-1">FINANCIAL ADVANTAGES</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">Why ULIPs are Beneficial</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-emerald-300 font-bold text-[16px]">1. High Wealth Creation Potential</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Invests directly in equity, debt, or hybrid funds to capture long-term stock market compounding and outperform inflation.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-emerald-300 font-bold text-[16px]">2. Free Unlimited Fund Switching</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Flexibility to shift your money between Equity, Balanced, and Debt funds tax-free as market conditions or life goals evolve.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-emerald-300 font-bold text-[16px]">3. 5-Year Lock-in & Liquidity</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Offers a short 5-year lock-in period, providing greater liquidity and partial withdrawal facilities after 5 years.
                </div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-emerald-300 font-bold text-[16px]">4. Complete Transparency</div>
                <div className="text-slate-300 text-[13px] mt-2">
                  Daily published NAVs and unit allocation statements allow you to monitor your exact investment performance in real-time.
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Summary Recommendation */}
          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            3. Which Plan Suits Your Profile Best?
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 my-6">
            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-navy text-[18px] mb-2">An Endowment Plan is Ideal If You:</h4>
              <ul className="text-[14px] space-y-2 text-slate-700">
                <li>• Prefer zero risk and complete safety of your capital.</li>
                <li>• Want guaranteed bonuses for specific long-term milestones.</li>
                <li>• Seek a hassle-free, "set-and-forget" traditional savings plan.</li>
              </ul>
            </div>

            <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-serif font-bold text-navy text-[18px] mb-2">A ULIP is Ideal If You:</h4>
              <ul className="text-[14px] space-y-2 text-slate-700">
                <li>• Seek inflation-beating equity returns for long-term growth.</li>
                <li>• Want active control and tax-free fund switching flexibility.</li>
                <li>• Prefer daily NAV transparency and a 5-year lock-in timeline.</li>
              </ul>
            </div>
          </div>
        </div>
      );

    case 'nri-guide-investing':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Non-Resident Indians (NRIs) residing in the GCC, UK, Singapore, US, and Canada can seamlessly participate in India’s economic growth through mutual funds, utilizing NRE/NRO accounts and Double Tax Avoidance Agreements (DTAA).
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. Step-by-Step NRI Investment Roadmap
          </h2>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">PROCESS FLOWCHART</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">4-Step Onboarding Architecture for NRIs</h4>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center mt-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-gold font-bold text-[20px]">Step 1</div>
                <div className="text-white font-semibold text-[15px] mt-1">NRE / NRO Account</div>
                <div className="text-slate-300 text-[12px] mt-2">Open designated NRI bank account in India.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-gold font-bold text-[20px]">Step 2</div>
                <div className="text-white font-semibold text-[15px] mt-1">NRI KYC Verification</div>
                <div className="text-slate-300 text-[12px] mt-2">Submit Passport, Visa, Foreign Address proof & PAN.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-gold font-bold text-[20px]">Step 3</div>
                <div className="text-white font-semibold text-[15px] mt-1">FATCA / CRS</div>
                <div className="text-slate-300 text-[12px] mt-2">Sign tax residency declaration form.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-gold/40">
                <div className="text-emerald-400 font-bold text-[20px]">Step 4</div>
                <div className="text-white font-semibold text-[15px] mt-1">Portfolio Setup</div>
                <div className="text-slate-300 text-[12px] mt-2">Start SIP or Lumpsum in curated Indian funds.</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. NRE vs. NRO Account Breakdown
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-emerald-400">NRE Account (External)</th>
                  <th className="p-4">NRO Account (Ordinary)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr>
                  <td className="p-4 font-semibold text-navy">Source of Funds</td>
                  <td className="p-4 text-slate-700">Foreign earnings remitted to India</td>
                  <td className="p-4 text-slate-700">Income earned in India (Rent, Dividends, Pensions)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">Repatriability (Moving funds overseas)</td>
                  <td className="p-4 text-emerald-700 font-bold">100% Freely Repatriable</td>
                  <td className="p-4 text-slate-700">Repatriable up to USD 1 Million per fiscal year</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Taxability in India</td>
                  <td className="p-4 text-emerald-700 font-bold">Interest earned is TAX-FREE in India</td>
                  <td className="p-4 text-slate-700">Interest earned is taxable in India</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            <h4 className="font-serif font-bold text-navy text-[18px] mb-2">Double Tax Avoidance Agreement (DTAA) Advantage</h4>
            <p className="text-[14.5px]">
              India has signed DTAA treaties with over 85 countries (including UAE, UK, USA, Singapore). Under DTAA, taxes paid in India can be claimed as a tax credit in your home country of residence, ensuring you are <strong>never taxed twice</strong> on the same investment income.
            </p>
          </div>
        </div>
      );

    case 'elss-tax-saving':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Equity Linked Savings Schemes (ELSS) are the smartest Section 80C tax-saving avenue in India, combining the shortest lock-in period (3 years) with superior equity market growth potential.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. Section 80C Instrument Comparison Matrix
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Tax Saving Option</th>
                  <th className="p-4 text-goldLight">Lock-In Period</th>
                  <th className="p-4">Expected Returns (CAGR)</th>
                  <th className="p-4">Taxability on Returns</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr className="bg-emerald-50 border-l-4 border-emerald-500">
                  <td className="p-4 font-bold text-navy">ELSS Mutual Funds</td>
                  <td className="p-4 font-bold text-emerald-700">3 Years (Shortest!)</td>
                  <td className="p-4 font-bold text-emerald-700">12% - 15% (Equity)</td>
                  <td className="p-4 text-slate-700">LTCG exempt up to ₹1.25 Lakh/yr</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">PPF (Public Provident Fund)</td>
                  <td className="p-4 text-slate-700">15 Years</td>
                  <td className="p-4 text-slate-700">7.1% (Fixed)</td>
                  <td className="p-4 text-emerald-700">Exempt (EEE)</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">Tax-Saving Bank FD</td>
                  <td className="p-4 text-slate-700">5 Years</td>
                  <td className="p-4 text-slate-700">6.0% - 6.5%</td>
                  <td className="p-4 text-red-600">Taxable at slab rate</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">NSC (National Savings Certificate)</td>
                  <td className="p-4 text-slate-700">5 Years</td>
                  <td className="p-4 text-slate-700">7.7%</td>
                  <td className="p-4 text-red-600">Taxable at slab rate</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">NUMERICAL TAX CALCULATION</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-2">Annual Tax Saved via ELSS</h4>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              If an investor in the 30% tax bracket invests ₹1,50,000 in ELSS before March 31st:
              <br />
              <span className="font-mono text-emerald-400 font-bold text-[18px] block mt-2">
                Total Direct Tax Saved = ₹1,50,000 × 31.2% (incl. cess) = ₹46,800!
              </span>
            </p>
          </div>
        </div>
      );

    case 'goal-based-wealth-planning':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Goal-Based Wealth Planning assigns every rupee invested to a explicit real-life milestone—such as child education, home purchase, or retirement—preventing panic selling and ensuring optimal asset allocation.
            </p>
          </div>

          {/* Goal Pyramid Visual */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">STRATEGIC WEALTH BUCKETS</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">The 3-Tier Goal Bucket Framework</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
              <div className="bg-white/10 p-4 rounded-xl border border-blue-400/40">
                <div className="text-blue-300 font-bold text-[16px]">1. Short-Term (1-3 Yrs)</div>
                <div className="text-white font-semibold text-[14px] mt-1">Emergency & Vacation</div>
                <div className="text-slate-300 text-[12px] mt-2">Debt Funds, Liquid Funds & Savings. Low risk.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-amber-400/40">
                <div className="text-amber-300 font-bold text-[16px]">2. Medium-Term (3-7 Yrs)</div>
                <div className="text-white font-semibold text-[14px] mt-1">House Downpayment</div>
                <div className="text-slate-300 text-[12px] mt-2">Hybrid & Balanced Advantage Funds. Moderate risk.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-emerald-400/40">
                <div className="text-emerald-300 font-bold text-[16px]">3. Long-Term (7+ Yrs)</div>
                <div className="text-white font-semibold text-[14px] mt-1">Retirement & Education</div>
                <div className="text-slate-300 text-[12px] mt-2">Flexi-cap & Mid-cap Equity Mutual Funds. Maximum growth.</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            Inflation Adjustment Example: Child's Higher Education
          </h2>
          <p>
            If a child's university education costs ₹25 Lakhs today, and the child is currently 3 years old (15 years away from college):
          </p>

          <div className="my-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <ul className="space-y-2 text-[15px]">
              <li><strong>Current Cost (Today):</strong> ₹25,00,000</li>
              <li><strong>Education Inflation Rate:</strong> 8% per annum</li>
              <li className="text-navy font-bold text-[17px]"><strong>Inflation-Adjusted Future Cost in 15 Yrs:</strong> ₹79,30,400</li>
              <li className="text-emerald-700 font-bold font-mono text-[17px]"><strong>Required Monthly SIP at 12% CAGR:</strong> ~₹16,000 / month</li>
            </ul>
          </div>
        </div>
      );

    case 'how-does-swp-work':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              A Systematic Withdrawal Plan (SWP) acts as a self-created monthly pension from your mutual fund investments. It provides a steady cash inflow while allowing the remaining capital to compound and fight inflation.
            </p>
          </div>

          {/* SWP Flowchart Diagram */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">RETIREMENT CASHFLOW ARCHITECTURE</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">How SWP Outperforms Bank Fixed Deposit Monthly Interest</h4>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center mt-6">
              <div className="bg-white/10 p-4 rounded-xl border border-white/10">
                <div className="text-gold font-bold text-[18px]">1. Capital Stays Invested</div>
                <div className="text-slate-300 text-[13px] mt-2">₹1 Crore invested in Hybrid Fund earning ~10% CAGR.</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-emerald-500/40">
                <div className="text-emerald-400 font-bold text-[18px]">2. Systematic Monthly Payout</div>
                <div className="text-slate-300 text-[13px] mt-2">₹60,000 auto-credited to bank account on 1st of every month.</div>
              </div>

              <div className="bg-white/10 p-4 rounded-xl border border-gold/40">
                <div className="text-goldLight font-bold text-[18px]">3. Capital Keeps Growing</div>
                <div className="text-slate-300 text-[13px] mt-2">Net growth (10% earnings - 7.2% withdrawal) increases principal balance!</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            SWP vs. Bank Fixed Deposit Comparison
          </h2>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Feature</th>
                  <th className="p-4 text-emerald-400">SWP (Mutual Funds)</th>
                  <th className="p-4">Bank FD Monthly Interest</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr>
                  <td className="p-4 font-semibold text-navy">Taxation Mechanism</td>
                  <td className="p-4 text-emerald-700 font-bold">Taxes ONLY the capital gain component of withdrawal</td>
                  <td className="p-4 text-red-600 font-bold">100% of interest payout taxed at highest slab rate</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">Protection Against Inflation</td>
                  <td className="p-4 text-emerald-700 font-semibold">High (Equity/Hybrid growth beats inflation)</td>
                  <td className="p-4 text-red-600 font-semibold">Zero (Principal stays fixed and loses real purchasing power)</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Flexibility</td>
                  <td className="p-4 text-slate-700">Modify, pause, or increase withdrawal anytime</td>
                  <td className="p-4 text-slate-700">Fixed rate locked for tenure</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'why-insurance-is-necessary-and-important-types':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Insurance is not an investment—it is a risk-mitigation defense shield. Without foundational insurance policies in place, an unexpected medical crisis or loss of income can wipe out your accumulated assets.
            </p>
          </div>

          {/* Insurance Pyramid Diagram */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">THE 4 PILLARS OF FINANCIAL PROTECTION</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">Essential Coverage Hierarchy</h4>

            <div className="space-y-3 mt-6">
              <div className="bg-emerald-500/20 border border-emerald-500/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-emerald-300 font-bold text-[16px]">Pillar 1: Health & Super Top-Up Insurance</div>
                  <div className="text-slate-300 text-[13px]">Protects your savings against rising hospital bills & medical inflation.</div>
                </div>
                <span className="text-emerald-400 font-bold text-[13px] bg-emerald-950 px-3 py-1 rounded-md">utmost Urgent</span>
              </div>

              <div className="bg-amber-500/20 border border-amber-500/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-amber-300 font-bold text-[16px]">Pillar 2: Pure Term Life Cover</div>
                  <div className="text-slate-300 text-[13px]">Replaces your income (15-20x annual earnings) to secure dependent family members.</div>
                </div>
                <span className="text-amber-400 font-bold text-[13px] bg-amber-950 px-3 py-1 rounded-md">utmost Urgent</span>
              </div>

              <div className="bg-blue-500/20 border border-blue-500/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-blue-300 font-bold text-[16px]">Pillar 3: Critical Illness & Personal Accident</div>
                  <div className="text-slate-300 text-[13px]">Provides a lump-sum payout upon diagnosis of major illnesses (Cancer, Cardiac, Stroke).</div>
                </div>
                <span className="text-blue-400 font-bold text-[13px] bg-blue-950 px-3 py-1 rounded-md">Essential</span>
              </div>

              <div className="bg-purple-500/20 border border-purple-500/40 p-4 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-purple-300 font-bold text-[16px]">Pillar 4: Asset & Travel Insurance</div>
                  <div className="text-slate-300 text-[13px]">Covers property, vehicles, and international medical emergencies during travel.</div>
                </div>
                <span className="text-purple-400 font-bold text-[13px] bg-purple-950 px-3 py-1 rounded-md">Recommended</span>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            Human Life Value (HLV) Formula Example
          </h2>
          <p>
            How much life insurance cover do you actually need? Use the <strong>Human Life Value (HLV)</strong> formula:
          </p>

          <div className="my-6 p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
            <div className="font-mono text-navy font-bold text-[16px] mb-3">
              Required Cover = (Annual Income × 15 to 20) + Total Debts & Liabilities - Existing Liquid Assets
            </div>
            <p className="text-[14.5px]">
              <strong>Example:</strong> For an individual earning ₹10 Lakhs/year with a ₹30 Lakh home loan:
              <br />
              Required Cover = (₹10L × 15) + ₹30L = <strong>₹1.8 Crores Pure Term Cover</strong>.
            </p>
          </div>
        </div>
      );

    case 'personal-accident-vs-health-insurance':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Health insurance pays your hospital bills, but Personal Accident Insurance replaces your lost monthly income during accidental injury, temporary disability, or permanent handicap. Having both is an absolute necessity for complete financial protection.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. The Dangerous Blind Spot in Standard Health Insurance
          </h2>
          <p>
            Most working professionals assume that having a ₹10 Lakh or ₹20 Lakh Health Insurance policy makes them fully immune to financial crises. However, standard health insurance only reimburses <strong>in-patient hospitalization bills</strong> (room rent, doctor fees, ICU charges, surgeries). It does <em>not</em> provide a single rupee of income compensation if an accident forces you onto unpaid medical leave, causes temporary mobility loss, or leads to permanent loss of earning capacity.
          </p>

          {/* Protection Architecture Diagram */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">PROTECTION ARCHITECTURE</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">Health Insurance vs. Personal Accident Shield</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
              <div className="bg-white/10 p-5 rounded-xl border border-blue-400/40">
                <div className="text-blue-300 font-bold text-[18px] mb-2">Health Insurance (Hospitalization Only)</div>
                <ul className="text-[13.5px] space-y-2 text-slate-300">
                  <li>✔ Reimburses hospital room rent & ICU charges</li>
                  <li>✔ Covers doctor fees, surgeries & diagnostics</li>
                  <li className="text-red-400 font-semibold">✗ ZERO payout for loss of monthly salary/business income</li>
                  <li className="text-red-400 font-semibold">✗ ZERO compensation for disability, home modification or lifestyle changes</li>
                </ul>
              </div>

              <div className="bg-white/10 p-5 rounded-xl border border-emerald-400/40">
                <div className="text-emerald-300 font-bold text-[18px] mb-2">Personal Accident Policy (Income & Disability Shield)</div>
                <ul className="text-[13.5px] space-y-2 text-slate-300">
                  <li>✔ 100% Lump sum payout for Accidental Death & Permanent Total Disability (PTD)</li>
                  <li>✔ Tiered percentage payout for Permanent Partial Disability (PPD)</li>
                  <li>✔ <strong>Weekly Salary Cash Payout</strong> for Temporary Total Disability (TTD)</li>
                  <li>✔ Bonus covers: Child education allowance, EMI protection & home modification</li>
                </ul>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. Disability Payout Percentage Table
          </h2>
          <p>
            Personal Accident policies classify injuries into distinct tiers to ensure guaranteed cash payouts corresponding to the severity of disability:
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Disability Nature</th>
                  <th className="p-4">Injury Examples</th>
                  <th className="p-4 text-emerald-400">Sum Assured Payout %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr>
                  <td className="p-4 font-semibold text-navy">Accidental Death / PTD</td>
                  <td className="p-4 text-slate-700">Loss of life, loss of both limbs or both eyes</td>
                  <td className="p-4 text-emerald-700 font-bold">100% Full Sum Assured</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">Permanent Partial Disability (PPD)</td>
                  <td className="p-4 text-slate-700">Loss of one eye, one limb, or hearing in both ears</td>
                  <td className="p-4 text-emerald-700 font-bold">50% - 75% Sum Assured</td>
                </tr>
                <tr>
                  <td className="p-4 font-semibold text-navy">Minor Partial Disability</td>
                  <td className="p-4 text-slate-700">Loss of index finger or thumb</td>
                  <td className="p-4 text-emerald-700 font-bold">15% - 25% Sum Assured</td>
                </tr>
                <tr className="bg-slate-50">
                  <td className="p-4 font-semibold text-navy">Temporary Total Disability (TTD)</td>
                  <td className="p-4 text-slate-700">Fractures or severe injuries causing temporary bed rest</td>
                  <td className="p-4 text-emerald-700 font-bold">1% of Sum Assured/week (up to ₹25k/wk for 100 wks)</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="my-8 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl">
            <h4 className="font-serif font-bold text-navy text-[18px] mb-2">Real-Life Case Study Example</h4>
            <p className="text-[14.5px] leading-relaxed">
              <strong>Scenario:</strong> Vikram (Software Architect, Age 35) meets with a highway car collision resulting in complex leg fractures requiring 5 months of complete bed rest.
              <br />
              • <strong>Health Insurance Impact:</strong> Pays his ₹3.2 Lakh hospital bill, but provides zero help when his employer puts him on unpaid leave.
              <br />
              • <strong>Personal Accident Cover Impact:</strong> Pays a weekly TTD benefit of ₹25,000/week for 20 weeks (Total: ₹5,00,000 cash in bank), allowing Vikram to pay his home loan EMIs, child school fees, and daily household expenses without touching his mutual fund investments!
            </p>
          </div>
        </div>
      );

    case 'critical-illness-insurance-guide':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              A Critical Illness policy provides a guaranteed, 100% upfront lump-sum cash payout immediately upon first diagnosis of major lifestyle diseases (Cancer, Heart Attack, Stroke, Kidney Failure). This dedicated cash cushion prevents the distress liquidation of your family equity investments.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. Hospitalization Reimbursement vs. Lump-Sum Cash Benefit
          </h2>
          <p>
            When a major illness strikes, direct hospital bills account for less than 40% of the total financial loss. Long-term rehabilitation, experimental overseas medication, specialized home nursing, and career interruption create overwhelming financial drain.
          </p>

          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">POLICY MECHANICS</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">How Critical Illness Protection Operates</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded-xl">
                <div className="text-slate-300 font-bold text-[16px]">Standard Mediclaim (Indemnity)</div>
                <div className="text-slate-400 text-[13px] mt-2">Requires actual hospital bills & discharge summaries. Reimburses strictly hospital expenses incurred.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-emerald-400/40">
                <div className="text-emerald-300 font-bold text-[16px]">Critical Illness Cover (Defined Benefit)</div>
                <div className="text-slate-300 text-[13px] mt-2">Transfers full ₹25-50 Lakhs upfront to your bank account upon first diagnostic report. Zero bills or receipts required.</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. Major Conditions Covered (36+ Critical Diseases)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-6">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-navy text-[16px] mb-2">Oncology & Cardiology</h4>
              <ul className="text-[13.5px] space-y-1 text-slate-600">
                <li>• Cancer of specified severity (Malignant tumors & Leukemia)</li>
                <li>• First Heart Attack (Myocardial Infarction)</li>
                <li>• Open Chest CABG (Coronary Artery Bypass Graft)</li>
                <li>• Open Heart Replacement / Repair of Heart Valves</li>
              </ul>
            </div>

            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-navy text-[16px] mb-2">Neurology & Organ Failure</h4>
              <ul className="text-[13.5px] space-y-1 text-slate-600">
                <li>• Stroke resulting in permanent neurological deficit</li>
                <li>• End-Stage Renal Failure requiring regular dialysis</li>
                <li>• Major Organ / Bone Marrow Transplant (Liver, Lungs, Heart)</li>
                <li>• Multiple Sclerosis with persisting symptoms</li>
              </ul>
            </div>
          </div>

          <div className="my-8 p-6 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl">
            <h4 className="font-serif font-bold text-navy text-[18px] mb-2">Tax Deduction Under Section 80D</h4>
            <p className="text-[14.5px]">
              Premiums paid toward Standalone Critical Illness policies qualify for tax deduction under Section 80D up to ₹25,000 for self/family and an additional ₹50,000 for senior citizen parents, delivering powerful dual tax savings!
            </p>
          </div>
        </div>
      );

    case 'step-up-sip-wealth-creation':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              A Step-Up SIP (Top-Up SIP) automatically increases your monthly investment contribution by a fixed percentage (e.g., 10%) every year in tandem with your annual salary raises, supercharging your final wealth accumulation by 80% to 150%.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. The Mathematical Comparison: Fixed SIP vs. Step-Up SIP
          </h2>
          <p>
            When your annual income grows by 8-12% every year, keeping your SIP contribution constant creates lifestyle inflation leakage. By stepping up your SIP annually, you harness exponential wealth compounding.
          </p>

          <div className="overflow-x-auto my-6">
            <table className="w-full text-left border-collapse bg-white rounded-xl overflow-hidden shadow-sm border border-slate-200">
              <thead>
                <tr className="bg-navy text-white text-[14px] font-serif">
                  <th className="p-4">Investment Strategy (15 Yrs @ 12% CAGR)</th>
                  <th className="p-4">Total Amount Invested</th>
                  <th className="p-4 text-emerald-400">Final Wealth Corpus</th>
                  <th className="p-4">Wealth Growth Gain</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-[14px]">
                <tr>
                  <td className="p-4 font-semibold text-navy">Regular Fixed SIP (₹10,000/month)</td>
                  <td className="p-4">₹18,00,000</td>
                  <td className="p-4 font-bold text-slate-800">₹50,45,760</td>
                  <td className="p-4 text-slate-500">Baseline</td>
                </tr>
                <tr className="bg-amber-50">
                  <td className="p-4 font-semibold text-navy">5% Annual Step-Up SIP</td>
                  <td className="p-4">₹25,89,500</td>
                  <td className="p-4 font-bold text-navy">₹68,92,300</td>
                  <td className="p-4 font-semibold text-amber-700">+₹18.4 Lakhs (+36.5%)</td>
                </tr>
                <tr className="bg-emerald-50 border-l-4 border-emerald-500">
                  <td className="p-4 font-bold text-navy">10% Annual Step-Up SIP</td>
                  <td className="p-4 font-bold">₹38,12,700</td>
                  <td className="p-4 font-bold text-emerald-700 text-[18px]">₹95,28,400</td>
                  <td className="p-4 font-bold text-emerald-700 text-[16px]">+₹44.8 Lakhs (+88.8%)!</td>
                </tr>
                <tr className="bg-blue-50">
                  <td className="p-4 font-bold text-navy">15% Annual Step-Up SIP</td>
                  <td className="p-4 font-bold">₹57,12,400</td>
                  <td className="p-4 font-bold text-blue-700 text-[18px]">₹1,34,50,000</td>
                  <td className="p-4 font-bold text-blue-700 text-[16px]">+₹84.0 Lakhs (+166%)!</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. How to Setup an Auto Step-Up Mandate
          </h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Automated Step-Up:</strong> Enable the "Auto Top-Up" checkbox while registering your SIP via One-Time Mandate (OTM) or e-NACH.</li>
            <li><strong>Percentage or Fixed Cap:</strong> Choose between a percentage increase (e.g., 10% per year) or a fixed rupee bump (e.g., +₹1,000/month every year).</li>
            <li><strong>Ceiling Limit Option:</strong> Set a maximum capping limit (e.g. step up until monthly SIP reaches ₹50,000) for comfortable long-term budgeting.</li>
          </ul>
        </div>
      );

    case 'asset-allocation-market-volatility':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Asset allocation is the strategic distribution of your capital across diverse asset classes (Equity, Fixed Income Debt, Sovereign Gold, and Cash) to maximize long-term risk-adjusted returns and cushion against market corrections.
            </p>
          </div>

          {/* Quadrant Blueprint Diagram */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">PORTFOLIO QUADRANT BLUEPRINT</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-4">The Strategic Multi-Asset Mix</h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className="bg-white/10 p-4 rounded-xl border border-emerald-400/40">
                <div className="text-emerald-300 font-bold text-[16px]">1. Equity Mutual Funds (60%) — Wealth Engine</div>
                <div className="text-slate-300 text-[13px] mt-1">Drives aggressive long-term capital expansion beating 6% inflation.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-blue-400/40">
                <div className="text-blue-300 font-bold text-[16px]">2. Debt Funds & Fixed Income (25%) — Shock Absorber</div>
                <div className="text-slate-300 text-[13px] mt-1">Provides capital preservation and stable yields during market corrections.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-gold/40">
                <div className="text-gold font-bold text-[16px]">3. Sovereign Gold / Gold ETFs (10%) — Geopolitical Hedge</div>
                <div className="text-slate-300 text-[13px] mt-1">Hedges against currency devaluation, global recessions, and inflation spikes.</div>
              </div>
              <div className="bg-white/10 p-4 rounded-xl border border-purple-400/40">
                <div className="text-purple-300 font-bold text-[16px]">4. Liquid Funds & Cash (5%) — Tactical Dry Powder</div>
                <div className="text-slate-300 text-[13px] mt-1">Provides instant liquidity to buy cheap equity units during market dips.</div>
              </div>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            Rebalancing Strategies: Calendar vs. Drift Threshold
          </h2>
          <p>
            Portfolio rebalancing is the practice of resetting your asset allocation back to its target weights. 
            <br /><br />
            • <strong>Calendar Rebalancing:</strong> Rebalance once every 12 months (e.g. every April) by booking profits from outperforming assets and buying underperforming ones.
            <br />
            • <strong>Drift Threshold Rebalancing:</strong> Rebalance whenever an asset class drifts more than 5% away from its target weight (e.g. Equity rises from 60% to 67%).
          </p>
        </div>
      );

    case 'term-insurance-complete-guide':
      return (
        <div className="space-y-8 text-[#5c6478] leading-relaxed text-[16px]">
          <div className="bg-navy/5 border-l-4 border-gold p-6 rounded-r-xl">
            <h3 className="font-serif text-navy font-bold text-[18px] mb-2">Executive Summary</h3>
            <p className="text-[15px]">
              Pure Term Life Insurance is the single most essential foundation of personal financial planning. It provides a massive financial safety net to your dependents at an extremely affordable premium, guaranteeing that your family’s dreams, home loans, and living expenses remain 100% secure.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            1. Why Pure Term Insurance is Superior to Investment-Cum-Insurance Plans
          </h2>
          <p>
            The fundamental rule of personal finance is: <strong>Never mix insurance with investment.</strong> Traditional endowment and money-back plans consume heavy premiums for tiny life covers. Term insurance, by contrast, focuses strictly on risk protection—offering ₹1 Crore to ₹2 Crore life cover for just ₹1,000 - ₹1,500 per month.
          </p>

          {/* HLV Calculation Box */}
          <div className="my-8 p-6 bg-slate-900 text-white rounded-2xl shadow-xl border border-gold/30">
            <div className="text-gold text-[12px] font-mono uppercase tracking-widest mb-1">HUMAN LIFE VALUE (HLV) FORMULA</div>
            <h4 className="font-serif text-[20px] text-white font-bold mb-3">How Much Term Cover Do You Actually Need?</h4>
            <div className="font-mono text-emerald-400 font-bold text-[15px] p-3 bg-white/10 rounded-lg mb-4">
              Required Term Cover = (Annual Income × 15 to 20) + Outstanding Debts & Loans - Liquid Savings
            </div>
            <p className="text-[14px] text-slate-300 leading-relaxed">
              <strong>Numerical Worked Example:</strong>
              <br />
              • Age 32, Earning ₹12 Lakhs/year with a ₹40 Lakh Home Loan and ₹10 Lakh Liquid Savings.
              <br />
              • Calculation: (₹12L × 15) + ₹40L - ₹10L = <strong>₹2.1 Crores Ideal Term Coverage</strong>.
            </p>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            2. Essential Riders to Enhance Your Term Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-navy text-[16px] mb-2">Accidental Death Benefit Rider</h4>
              <p className="text-[13px] text-slate-600">Pays an additional sum assured if death occurs due to an accident.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-navy text-[16px] mb-2">Critical Illness Rider</h4>
              <p className="text-[13px] text-slate-600">Provides immediate lump-sum cash upon diagnosis of 30+ major conditions.</p>
            </div>
            <div className="p-4 bg-white border border-slate-200 rounded-xl shadow-sm">
              <h4 className="font-bold text-navy text-[16px] mb-2">Waiver of Premium (WOP) Rider</h4>
              <p className="text-[13px] text-slate-600">Waives off all future policy premiums if you suffer total disability.</p>
            </div>
          </div>

          <h2 className="font-serif text-navy text-[24px] font-bold border-b border-slate-200 pb-3 mt-8">
            3. Critical Claim Protection: The MWP Act & Section 45
          </h2>
          <div className="my-6 p-6 bg-amber-500/10 border border-amber-500/30 rounded-2xl space-y-3">
            <h4 className="font-serif font-bold text-navy text-[18px]">2 Safeguards Every Policyholder Must Know:</h4>
            <p className="text-[14px]">
              1. <strong>Married Women's Property (MWP) Act 1874:</strong> Purchasing your policy under MWP Act ensures the insurance payout goes exclusively to your wife and children. Creditors, bank loans, or business liabilities cannot seize a single rupee of this money!
            </p>
            <p className="text-[14px]">
              2. <strong>Section 45 (3-Year Claim Incontestability):</strong> Under Indian Insurance Law, no insurance company can reject or challenge a life insurance claim after 3 consecutive policy years, offering complete peace of mind.
            </p>
          </div>
        </div>
      );

    default:
      return null;
  }
};

export default BlogArticleContent;
