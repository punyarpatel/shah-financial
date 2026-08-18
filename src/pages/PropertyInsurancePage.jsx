import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import WhatsAppFloat from '../components/WhatsAppFloat';
import { submitLead } from '../lib/leads';
import FadeIn from '../components/animations/FadeIn';
import PhoneNumberField from '../components/PhoneNumberField';

const PROPERTY_INSURANCE_FEATURES = [
  {
    id: 'structure',
    icon: '🏠',
    title: 'Building & Structure Protection',
    description: 'Shield your home, office, or commercial building against fire, earthquake, flood, storm, and explosion hazards.',
    detailedDescription: 'Your property is often your largest financial asset. Structural coverage protects your building frame, roof, walls, and permanent fixtures against catastrophic natural disasters and fire.'
  },
  {
    id: 'contents',
    icon: '📺',
    title: 'Home Contents & Electronics',
    description: 'Protection for expensive appliances, smart electronics, furniture, and kitchen equipment against theft, burglary, and power surge damage.',
    detailedDescription: 'From 4K TVs and laptops to high-end modular kitchens, our contents insurance ensures every item inside your home is financially protected against burglary and electrical damage.'
  },
  {
    id: 'commercial',
    icon: '🏢',
    title: 'Commercial & Office Property',
    description: 'Tailored insurance policies for retail shops, corporate offices, warehouses, and industrial units in Ahmedabad & Gujarat.',
    detailedDescription: 'Protect your business premises, machinery, raw material stocks, and office infrastructure against fire, lightning, strikes, and malicious damage with minimal business disruption.'
  },
  {
    id: 'tenant-landlord',
    icon: '🔑',
    title: 'Landlord & Tenant Cover',
    description: 'Specialized policies for rental properties covering loss of rent, structural damages caused by tenants, and public liability.',
    detailedDescription: 'Whether you rent out property or live in a rented apartment, secure customized policies covering tenant liability, tenant contents, and rental income loss during repairs.'
  },
  {
    id: 'valuables',
    icon: '💎',
    title: 'Jewelry & Precious Belongings',
    description: 'All-risk worldwide coverage for gold jewelry, silverware, fine art, and rare collectibles kept at home or in bank lockers.',
    detailedDescription: 'Safeguard family heirlooms, gold ornaments, and luxury wristwatches against theft, burglary, or accidental loss with hassle-free agreed-value valuations.'
  },
  {
    id: 'third-party',
    icon: '⚖️',
    title: 'Public & Visitor Liability',
    description: 'Coverage against legal claims resulting from accidental bodily injury or property damage to third parties on your premises.',
    detailedDescription: 'If a visitor or delivery agent suffers an accidental injury on your property, public liability coverage shields you from expensive legal and medical compensation liabilities.'
  }
];

const PROPERTY_INSURANCE_FAQS = [
  {
    question: "What types of property can be insured with Drishti Wealth?",
    answer: "We offer comprehensive insurance for independent villas, apartments, residential flats, corporate offices, retail stores, warehouses, and industrial properties across Ahmedabad and Gujarat."
  },
  {
    question: "Does property insurance cover damage from earthquakes and floods?",
    answer: "Yes, standard property insurance policies include Fire & Special Perils cover which encompasses earthquakes, floods, inundations, storms, cyclones, and landslides."
  },
  {
    question: "Can tenants buy property insurance for their rented home?",
    answer: "Absolutely! Tenants can purchase 'Home Contents Insurance' which protects their personal furniture, electronics, jewelry, and appliances without needing to insure the building structure."
  },
  {
    question: "How is the sum insured calculated for a residential house?",
    answer: "Structural coverage is calculated based on the Reconstruction Cost (Built-up Area × Reconstruction Cost per sq. ft.), not the real estate market value of the land."
  },
  {
    question: "How fast are claims settled in case of fire or water damage?",
    answer: "With our dedicated claim assistance team at Drishti Wealth, we coordinate immediate surveyor visits, assist in documentation, and facilitate fast-track claim settlement with top IRDAI partners."
  }
];

const PropertyInsurancePage = () => {
  const [activeTab, setActiveTab] = useState('structure');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    propertyType: 'Residential Home',
    estimatedValue: '50 Lakhs - 1 Crore',
    city: 'Ahmedabad',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const activeFeature = PROPERTY_INSURANCE_FEATURES.find(f => f.id === activeTab);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    try {
      await submitLead({
        type: 'Property Insurance Inquiry',
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        details: {
          propertyType: formData.propertyType,
          estimatedValue: formData.estimatedValue,
          city: formData.city,
          message: formData.message
        }
      });
      setSubmitted(true);
    } catch (err) {
      setError('Failed to submit request. Please try again or contact us via WhatsApp.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-cream flex flex-col relative">
      <Helmet>
        <title>Property &amp; Home Insurance Services Ahmedabad | Drishti Wealth</title>
        <meta name="description" content="Protect your home, office, contents, and commercial property with trusted property insurance policies in Ahmedabad. IRDAI licensed specialist since 2001." />
        <link rel="canonical" href="https://drishtiwealth.com/services/property-insurance" />
        <meta property="og:title" content="Property & Home Insurance Protection | Drishti Wealth" />
        <meta property="og:description" content="Protect your home, office, contents, and commercial property with trusted property insurance policies in Ahmedabad. IRDAI licensed specialist since 2001." />
      </Helmet>

      <Navbar />

      {/* Hero Section */}
      <section className="bg-navy py-16 md:py-24 text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#c9922a_1px,transparent_1px)] [background-size:16px_16px]" />
        
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 mb-6">
              <span className="text-goldLight text-xs uppercase tracking-widest font-medium">Property & Asset Protection</span>
            </div>
            
            <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight max-w-4xl">
              Protect Your Most Valuable Physical Assets & Property
            </h1>
            
            <p className="text-white/70 text-base md:text-xl max-w-2xl leading-relaxed mb-8">
              Comprehensive structural, contents, and commercial property insurance tailored for homes, apartments, offices, and shops across Ahmedabad & Gujarat.
            </p>

            <div className="flex flex-wrap gap-4">
              <a 
                href="#quote-form"
                className="bg-gold hover:bg-goldLight text-navy font-semibold px-6 py-3.5 rounded-xl shadow-lg transition-all duration-300 transform hover:-translate-y-0.5"
              >
                Get Property Insurance Quote
              </a>
              <a 
                href="https://wa.me/919825027550?text=Hi%20Drishti%20Wealth,%20I%20am%20interested%20in%20Property%20Insurance%20guidance."
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/10 hover:bg-white/20 text-white font-medium px-6 py-3.5 rounded-xl border border-white/20 transition-all duration-300"
              >
                Talk on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Features Grid & Interactive Details */}
      <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 w-full">
        <FadeIn>
          <div className="text-center mb-16">
            <span className="text-gold text-xs tracking-widest uppercase font-medium">Comprehensive Coverage</span>
            <h2 className="font-serif text-3xl md:text-4xl text-navy font-semibold mt-2">
              All-Inclusive Property Protection Features
            </h2>
            <p className="text-muted text-sm md:text-base max-w-2xl mx-auto mt-3">
              Whether it is natural disaster protection or burglary insurance, explore our specialized coverage options.
            </p>
          </div>

          {/* Interactive Feature Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 mb-8">
            {PROPERTY_INSURANCE_FEATURES.map((feature) => (
              <button
                key={feature.id}
                onClick={() => setActiveTab(feature.id)}
                className={`p-4 rounded-xl border text-left transition-all duration-300 flex flex-col items-center text-center ${
                  activeTab === feature.id
                    ? 'bg-navy text-white border-gold shadow-md scale-105'
                    : 'bg-white text-navy border-gray-200 hover:border-gold/50 hover:bg-cream/50'
                }`}
              >
                <span className="text-3xl mb-2">{feature.icon}</span>
                <span className="text-xs font-semibold leading-snug">{feature.title}</span>
              </button>
            ))}
          </div>

          {/* Active Tab Detail Display Card */}
          {activeFeature && (
            <motion.div 
              key={activeFeature.id}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white border border-gold/20 rounded-2xl p-6 md:p-10 shadow-xl relative overflow-hidden"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-4xl p-3 bg-gold/10 rounded-2xl">{activeFeature.icon}</span>
                <div>
                  <h3 className="font-serif text-2xl text-navy font-bold">{activeFeature.title}</h3>
                  <p className="text-gold font-medium text-sm mt-1">{activeFeature.description}</p>
                </div>
              </div>
              <p className="text-textDark text-base leading-relaxed bg-cream/60 p-5 rounded-xl border border-gray-100 mt-4">
                {activeFeature.detailedDescription}
              </p>
            </motion.div>
          )}
        </FadeIn>
      </section>

      {/* Quote Inquiry Form */}
      <section id="quote-form" className="py-16 bg-navy/5 border-y border-gold/10 w-full">
        <div className="max-w-4xl mx-auto px-4">
          <FadeIn>
            <div className="bg-navy/90 rounded-3xl p-8 md:p-12 shadow-2xl border border-white/10 text-white">
              <div className="text-center mb-8">
                <span className="text-goldLight text-xs uppercase tracking-widest font-semibold">Free Property Consultation</span>
                <h3 className="font-serif text-2xl md:text-3xl text-white font-bold mt-1">Get Customized Property Insurance Quote</h3>
                <p className="text-white/60 text-sm mt-2">Fill in your details and our IRDAI-licensed insurance specialist will contact you with optimal policy rates.</p>
              </div>

              {submitted ? (
                <div className="form-success-reveal text-center py-10 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400">
                  <span className="text-5xl mb-4 block">✅</span>
                  <h4 className="font-serif text-2xl text-white font-bold mb-2">Thank You!</h4>
                  <p className="text-white/80 text-sm max-w-md mx-auto">
                    Your property insurance inquiry has been received. Our team will contact you within 24 business hours.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  {error && (
                    <div className="bg-red-500/10 text-red-400 text-sm p-3 rounded-xl border border-red-500/30">
                      {error}
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Rajesh Shah"
                        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:outline-none focus:border-gold focus:bg-white/10 text-white placeholder-white/35 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Phone Number *</label>
                      <PhoneNumberField value={formData.phone} onChange={(phone) => setFormData({ ...formData, phone })} />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Email Address</label>
                      <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="rajesh@example.com"
                        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:outline-none focus:border-gold focus:bg-white/10 text-white placeholder-white/35 text-sm transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Property Type</label>
                      <select
                        value={formData.propertyType}
                        onChange={(e) => setFormData({ ...formData, propertyType: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:outline-none focus:border-gold focus:bg-white/10 text-white text-sm appearance-none cursor-pointer transition-colors"
                      >
                        <option value="Residential Home" className="bg-[#0d2545] text-white">Residential Home / Villa</option>
                        <option value="Apartment / Flat" className="bg-[#0d2545] text-white">Apartment / Flat</option>
                        <option value="Commercial Office" className="bg-[#0d2545] text-white">Commercial Office</option>
                        <option value="Retail Shop / Showroom" className="bg-[#0d2545] text-white">Retail Shop / Showroom</option>
                        <option value="Industrial / Warehouse" className="bg-[#0d2545] text-white">Industrial / Warehouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Property Est. Value</label>
                      <select
                        value={formData.estimatedValue}
                        onChange={(e) => setFormData({ ...formData, estimatedValue: e.target.value })}
                        className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:outline-none focus:border-gold focus:bg-white/10 text-white text-sm appearance-none cursor-pointer transition-colors"
                      >
                        <option value="Up to 50 Lakhs" className="bg-[#0d2545] text-white">Up to ₹50 Lakhs</option>
                        <option value="50 Lakhs - 1 Crore" className="bg-[#0d2545] text-white">₹50 Lakhs - ₹1 Crore</option>
                        <option value="1 Crore - 3 Crores" className="bg-[#0d2545] text-white">₹1 Crore - ₹3 Crores</option>
                        <option value="3 Crores - 5 Crores" className="bg-[#0d2545] text-white">₹3 Crores - ₹5 Crores</option>
                        <option value="Above 5 Crores" className="bg-[#0d2545] text-white">Above ₹5 Crores</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-white/60 uppercase tracking-wider mb-1.5">Additional Details or Specific Requirements</label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention structural details, furniture value, or specific coverage requirements..."
                      className="w-full px-4 py-3 rounded-xl border border-white/15 bg-white/5 focus:outline-none focus:border-gold focus:bg-white/10 text-white placeholder-white/35 text-sm resize-none transition-colors"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gold hover:bg-goldLight text-navy font-bold py-4 rounded-xl shadow-lg transition-all duration-300 disabled:opacity-50"
                  >
                    {isSubmitting ? 'Submitting Request...' : 'Get Custom Quote & Advice'}
                  </button>
                </form>
              )}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 md:py-24 max-w-5xl mx-auto px-4 w-full">
        <FadeIn>
          <div className="text-center mb-12">
            <span className="text-gold text-xs uppercase tracking-widest font-semibold">Common Questions</span>
            <h2 className="font-serif text-3xl text-navy font-bold mt-1">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4">
            {PROPERTY_INSURANCE_FAQS.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
                <h4 className="font-serif text-lg text-navy font-semibold mb-2">❓ {faq.question}</h4>
                <p className="text-muted text-sm leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </FadeIn>
      </section>

      <Footer />
      <WhatsAppFloat />
    </div>
  );
};

export default PropertyInsurancePage;
