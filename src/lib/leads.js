import supabase from './supabase';

/**
 * Validates and submits a new lead to Supabase
 * @param {Object} leadData
 * @param {string} leadData.name - Full name of the contact
 * @param {string} leadData.phone - Phone or WhatsApp number
 * @param {string} leadData.interest - What they are interested in
 * @param {string} [leadData.city] - City
 * @param {string} [leadData.is_nri] - NRI status
 * @param {string} [leadData.nri_country] - NRI country if applicable
 * @param {string} [leadData.message] - Optional message or context
 * @returns {Promise<{success: boolean, error?: string}>}
 */
export async function submitLead(leadData) {
  const { name, phone, interest, city = '', is_nri = '', nri_country = '', message = '' } = leadData;

  // Basic validation
  if (!name || !phone || !interest) {
    return { success: false, error: 'Please fill out all required fields' };
  }

  // Phone validation (remove non-digits, must have at least 10 digits)
  const cleanPhone = phone.replace(/\D/g, '');
  if (cleanPhone.length < 10) {
    return { success: false, error: 'Phone number must have at least 10 digits' };
  }

  try {
    const { error } = await supabase
      .from('leads')
      .insert([{
        name,
        phone,
        interest,
        city,
        is_nri,
        nri_country,
        message,
        status: 'new',
        created_at: new Date().toISOString()
      }]);

    if (error) {
      console.error('Supabase submission error:', error);
      return { 
        success: false, 
        error: 'We encountered an issue submitting your request. Please try again or reach out directly via WhatsApp.' 
      };
    }

    return { success: true };
  } catch (err) {
    console.error('Submission exception:', err);
    return { 
      success: false, 
      error: 'A connection error occurred. Please verify your internet connection and try again.' 
    };
  }
}
