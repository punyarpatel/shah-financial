import React, { useState } from 'react';
import { submitLead } from '../lib/leads';
import { countriesList } from '../lib/countries';
import PhoneNumberField from './PhoneNumberField';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [city, setCity] = useState('');
  const [interest, setInterest] = useState('');
  const [isNri, setIsNri] = useState('No'); // 'No' or 'Yes'
  const [nriCountry, setNriCountry] = useState('');
  const [message, setMessage] = useState('');
  
  const [countrySearch, setCountrySearch] = useState('');
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const filteredCountries = countriesList.filter(country =>
    country.toLowerCase().includes(countrySearch.toLowerCase())
  );

  const handleCountryChange = (e) => {
    const val = e.target.value;
    setCountrySearch(val);
    setShowCountryDropdown(true);
    
    // Check if the typed value matches a country exactly
    const match = countriesList.find(c => c.toLowerCase() === val.trim().toLowerCase());
    if (match) {
      setNriCountry(match);
    } else {
      setNriCountry('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !phone || !interest || !isNri) {
      setError('Please fill out all required fields');
      return;
    }
    if (isNri === 'No' && !city) {
      setError('Please enter your city');
      return;
    }
    if (isNri === 'Yes' && !nriCountry) {
      setError('Please select your country of residence');
      return;
    }
    setError('');
    setLoading(true);

    const res = await submitLead({
      name,
      phone,
      interest,
      city: isNri === 'No' ? city : '',
      is_nri: isNri === 'Yes' ? 'Yes' : 'No',
      nri_country: isNri === 'Yes' ? nriCountry : '',
      message
    });

    if (!res.success) {
      setError(res.error);
      setLoading(false);
      return;
    }

    setSuccess(true);
    setLoading(false);
  };

  const handleReset = () => {
    setName('');
    setPhone('');
    setCity('');
    setInterest('');
    setIsNri('No');
    setNriCountry('');
    setCountrySearch('');
    setShowCountryDropdown(false);
    setMessage('');
    setError('');
    setSuccess(false);
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
            <div className="form-success-reveal flex flex-col items-center gap-[1rem] bg-green-500/15 border border-green-500/30 rounded-[10px] p-[1.5rem] text-center text-[#4ade80]">
              <div>Thank you! We will call you within 24 hours.</div>
              <button
                type="button"
                onClick={handleReset}
                className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/30 py-[8px] px-[16px] rounded-[6px] text-[13px] font-medium cursor-pointer transition-all"
              >
                Back to form
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[1rem]">
              <div>
                <label className={labelStyles}>Full Name *</label>
                <input 
                  type="text" 
                  placeholder="Your name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)}
                  className={inputStyles}
                  required
                />
              </div>

              <div>
                <label className={labelStyles}>Phone / WhatsApp *</label>
                <PhoneNumberField value={phone} onChange={setPhone} />
              </div>

              <div>
                <label className={labelStyles}>Are you an NRI? *</label>
                <select 
                  value={isNri} 
                  onChange={(e) => {
                    setIsNri(e.target.value);
                    if (e.target.value === 'Yes') {
                      setCity('');
                    } else {
                      setNriCountry('');
                    }
                  }}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                >
                  <option value="No" className="bg-navy text-white">No: Based in India</option>
                  <option value="Yes" className="bg-navy text-white">Yes</option>
                </select>
              </div>

              {isNri === 'No' ? (
                <div>
                  <label className={labelStyles}>City (only if you reside in India) *</label>
                  <input 
                    type="text" 
                    placeholder="Ahmedabad" 
                    value={city} 
                    onChange={(e) => setCity(e.target.value)}
                    className={inputStyles}
                  />
                </div>
              ) : (
                <div className="relative">
                  <label className={labelStyles}>Country of Residence *</label>
                  <input 
                    type="text" 
                    placeholder="Search and select country..." 
                    value={countrySearch}
                    onFocus={() => setShowCountryDropdown(true)}
                    onBlur={() => {
                      // Check if current search matches a country exactly; if not, clear it
                      const match = countriesList.find(c => c.toLowerCase() === countrySearch.trim().toLowerCase());
                      if (match) {
                        setNriCountry(match);
                        setCountrySearch(match);
                      } else if (!nriCountry) {
                        setCountrySearch('');
                      } else {
                        setCountrySearch(nriCountry);
                      }
                      setShowCountryDropdown(false);
                    }}
                    onChange={handleCountryChange}
                    className={inputStyles}
                  />
                  {showCountryDropdown && (
                    <div className="absolute z-20 left-0 right-0 mt-1 max-h-[180px] overflow-y-auto bg-[#0d2545] border border-white/15 rounded-[8px] shadow-2xl py-1 scrollbar-thin scrollbar-thumb-white/10">
                      {filteredCountries.length > 0 ? (
                        filteredCountries.map((country) => (
                          <div
                            key={country}
                            onMouseDown={() => {
                              setNriCountry(country);
                              setCountrySearch(country);
                              setShowCountryDropdown(false);
                            }}
                            className="px-3 py-2 text-[13.5px] text-white hover:bg-gold/25 cursor-pointer transition-colors"
                          >
                            {country}
                          </div>
                        ))
                      ) : (
                        <div className="px-3 py-2 text-[12.5px] text-white/50 italic text-center">
                          No countries found
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div>
                <label className={labelStyles}>I am interested in *</label>
                <select 
                  value={interest} 
                  onChange={(e) => setInterest(e.target.value)}
                  className={`${inputStyles} appearance-none cursor-pointer`}
                  required
                >
                  <option value="" className="bg-navy text-white">Select an option</option>
                  <option value="Mutual Fund SIP" className="bg-navy text-white">Mutual Fund SIP</option>
                  <option value="Insurance Planning" className="bg-navy text-white">Insurance Planning</option>
                  <option value="NRI Investment Services" className="bg-navy text-white">NRI Investment Services</option>
                  <option value="Portfolio Review" className="bg-navy text-white">Portfolio Review</option>
                  <option value="General Enquiry" className="bg-navy text-white">General Enquiry</option>
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
                className="w-full bg-navy text-white border-none py-[13px] rounded-[8px] text-[14px] font-medium cursor-pointer font-sans hover:bg-navy/80 transition-colors mt-[0.5rem] disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {loading ? 'Loading...' : 'Submit Enquiry'}
              </button>
            </form>
          )}

          {/* Contact Meta Below Form */}
          <div className="flex flex-row gap-[1.5rem] flex-wrap mt-[1.25rem] pt-[1.25rem] border-t border-white/10">
            <div>
              <strong className="block text-white/70 font-medium mb-[2px] text-[13px]">Email</strong>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=officeinsurance2017@gmail.com" target="_blank" rel="noopener noreferrer" className="text-white/45 text-[12px] hover:text-[#c9922a] transition-colors">officeinsurance2017@gmail.com</a>
            </div>
            <div>
              <strong className="block text-white/70 font-medium mb-[2px] text-[13px]">Phone</strong>
              <a href="tel:+919664977576" className="text-white/45 text-[12px] hover:text-[#c9922a] transition-colors">+91 96649 77576</a>
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
