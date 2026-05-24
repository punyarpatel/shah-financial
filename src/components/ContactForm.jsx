import React, { useState } from 'react';
import api from '../lib/api';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('');
  const [isNri, setIsNri] = useState('No — I am based in India');
  const [message, setMessage] = useState('');
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone) {
      setError('Please enter your name and phone number');
      return;
    }
    setError('');
    setLoading(true);

    try {
      await api.post('/api/leads', {
        name,
        phone,
        city,
        interest,
        isNri,
        message
      });
      setSuccess(true);
    } catch (err) {
      setError('Something went wrong. Please try again');
    } finally {
      setLoading(false);
    }
  };

  const inputStyles = "w-full px-[12px] py-[10px] border border-white/15 rounded-[8px] text-[14px] font-sans text-white bg-white/5 outline-none focus:border-gold focus:bg-white/10 placeholder-white/35 transition-colors";
  const labelStyles = "block text-[12px] text-white/60 uppercase tracking-[0.04em] font-medium mb-[4px]";

  return (
    <section id="contact" className="w-full bg-navy">
      <div className="max-w-7xl mx-auto py-[3.5rem] px-4">
        
        {/* Header */}
        <div className="text-goldLight text-[11px] tracking-[0.15em] uppercase font-medium mb-[0.6rem]">
          Get In Touch
        </div>
        <h2 className="font-serif text-[28px] text-white font-semibold mb-[0.75rem] leading-tight">
          Start Your Financial Journey.
        </h2>
        <p className="text-white/60 text-[15px] leading-[1.6] font-light mb-[2rem]">
          Fill in your details and we will get back to you within 24 hours.
        </p>

        {/* Card */}
        <div className="bg-white/5 border border-white/10 rounded-[14px] p-[1.5rem]">
          {success ? (
            <div className="bg-green-500/15 border border-green-500/30 rounded-[10px] p-[1rem] text-center text-[#4ade80]">
              Thank you! We will call you within 24 hours.
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
              <div>
                <label className={labelStyles}>Full Name</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>Phone / WhatsApp</label>
                <input 
                  type="tel" 
                  placeholder="+91 XXXXX XXXXX" 
                  value={phone} 
                  onChange={(e) => setPhone(e.target.value)}
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>City</label>
                <input 
                  type="text" 
                  placeholder="Ahmedabad" 
                  value={city} 
                  onChange={(e) => setCity(e.target.value)}
                  className={inputStyles}
                />
              </div>

              <div>
                <label className={labelStyles}>I am interested in</label>
                <select 
                  value={interest} 
                  onChange={(e) => setInterest(e.target.value)}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                >
                  <option value="" className="bg-navy text-white">Select an option</option>
                  <option value="Mutual Fund SIP" className="bg-navy text-white">Mutual Fund SIP</option>
                  <option value="Insurance Planning" className="bg-navy text-white">Insurance Planning</option>
                  <option value="NRI Investment Services" className="bg-navy text-white">NRI Investment Services</option>
                  <option value="Tax Saving ELSS" className="bg-navy text-white">Tax Saving ELSS</option>
                  <option value="Portfolio Review" className="bg-navy text-white">Portfolio Review</option>
                  <option value="General Enquiry" className="bg-navy text-white">General Enquiry</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Are you an NRI</label>
                <select 
                  value={isNri} 
                  onChange={(e) => setIsNri(e.target.value)}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                >
                  <option value="No — I am based in India" className="bg-navy text-white">No — I am based in India</option>
                  <option value="Yes — USA or Canada" className="bg-navy text-white">Yes — USA or Canada</option>
                  <option value="Yes — UAE or Middle East" className="bg-navy text-white">Yes — UAE or Middle East</option>
                  <option value="Yes — UK or Europe" className="bg-navy text-white">Yes — UK or Europe</option>
                  <option value="Yes — Australia or New Zealand" className="bg-navy text-white">Yes — Australia or New Zealand</option>
                  <option value="Yes — Singapore or SE Asia" className="bg-navy text-white">Yes — Singapore or SE Asia</option>
                </select>
              </div>

              <div>
                <label className={labelStyles}>Message (optional)</label>
                <textarea 
                  placeholder="Tell us a little about your goals" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)}
                  className={`${inputStyles} h-[80px] resize-none leading-[1.5]`}
                />
              </div>

              {error && (
                <div className="bg-red-500/10 border border-red-500/30 text-[#f87171] py-[0.5rem] px-[0.75rem] rounded-[6px] text-[13px] mt-[0.5rem]">
                  {error}
                </div>
              )}

              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-[#0d2545] text-white border-none py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer font-sans hover:bg-[#1a3a6e] transition-colors mt-[0.5rem] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Submit Enquiry'}
              </button>
            </form>
          )}

          {/* Contact Meta Below Form */}
          <div className="flex flex-row gap-[1.5rem] flex-wrap mt-[1.25rem] pt-[1.25rem] border-t border-white/10">
            <div>
              <strong className="block text-white/70 font-medium mb-[2px] text-[13px]">Email</strong>
              <span className="text-white/45 text-[12px]">contact@shahfinancial.in</span>
            </div>
            <div>
              <strong className="block text-white/70 font-medium mb-[2px] text-[13px]">Phone</strong>
              <span className="text-white/45 text-[12px]">+91 98XXX XXXXX</span>
            </div>
            <div>
              <strong className="block text-white/70 font-medium mb-[2px] text-[13px]">Office</strong>
              <span className="text-white/45 text-[12px]">Ahmedabad, Gujarat</span>
            </div>
          </div>
          
        </div>

      </div>
    </section>
  );
};

export default ContactForm;
