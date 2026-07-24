/**
 * Analytics Engine for Drishti Wealth
 * Supports Google Analytics 4 (GA4) and custom SPA event tracking.
 */

const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID || 'G-DRISHTIWEALTH';

// Initialize Google Analytics script dynamically if Measurement ID is present
export function initAnalytics() {
  if (typeof window === 'undefined') return;

  // Ensure dataLayer exists
  window.dataLayer = window.dataLayer || [];
  window.gtag = window.gtag || function() {
    window.dataLayer.push(arguments);
  };

  window.gtag('js', new Date());
  window.gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: false // We trigger page views manually for SPA routing
  });

  // Track event queue for debug inspection
  window._analytics_events = window._analytics_events || [];

  console.log(`[Analytics] Initialized GA4 (${GA_MEASUREMENT_ID})`);
}

/**
 * Track SPA Page View
 * @param {string} path - Page URL path (e.g. '/services/mutual-funds')
 * @param {string} title - Page title
 */
export function trackPageView(path, title = document.title) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: 'page_view',
    page_path: path,
    page_title: title,
    timestamp: new Date().toISOString()
  };

  // Push to GA4
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title
    });
  }

  // Record to local queue for verification & debug
  if (window._analytics_events) {
    window._analytics_events.push(eventPayload);
  }

  console.log(`[Analytics] Page View: ${path}`, eventPayload);
}

/**
 * Track Custom Event (e.g., lead_submission, calculator_use, login)
 * @param {string} eventName - Name of the event
 * @param {Object} eventParams - Additional metadata
 */
export function trackEvent(eventName, eventParams = {}) {
  if (typeof window === 'undefined') return;

  const eventPayload = {
    event: eventName,
    params: eventParams,
    timestamp: new Date().toISOString()
  };

  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }

  if (window._analytics_events) {
    window._analytics_events.push(eventPayload);
  }

  console.log(`[Analytics] Event Recorded: ${eventName}`, eventParams);
}
