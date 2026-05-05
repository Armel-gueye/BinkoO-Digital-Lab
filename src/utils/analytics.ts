/**
 * GA4 Analytics - Événements personnalisés pour BinkoO Digital Lab
 * 
 * Ce module centralise tous les événements GA4 custom pour le tracking
 * des interactions utilisateur sur le site.
 * 
 * Événements trackés :
 * - Clics CTA WhatsApp (par page)
 * - Soumission formulaire de contact
 * - Clics vers les réseaux sociaux
 * - Navigation vers les services
 * - Interaction avec le chatbot
 * - Scroll depth (25%, 50%, 75%, 100%)
 */

// Déclaration du type global pour gtag
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
    dataLayer?: any[];
    gtagLoaded?: boolean;
    cookieConsent?: {
      analytics: boolean;
      marketing: boolean;
    };
  }
}

// ============================================
// Consent Management
// ============================================

const CONSENT_KEY = 'bdl_cookie_consent';

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
  version: string;
}

/**
 * Récupère le consentement stocké en localStorage
 */
export const getStoredConsent = (): CookieConsent | null => {
  try {
    const stored = localStorage.getItem(CONSENT_KEY);
    if (!stored) return null;
    return JSON.parse(stored);
  } catch {
    return null;
  }
};

/**
 * Sauvegarde le consentement de l'utilisateur
 */
export const saveConsent = (consent: CookieConsent): void => {
  try {
    localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
    window.cookieConsent = {
      analytics: consent.analytics,
      marketing: consent.marketing,
    };
  } catch {
    // Silently fail if localStorage is not available
  }
};

/**
 * Vérifie si l'utilisateur a donné son consentement analytics
 */
export const hasAnalyticsConsent = (): boolean => {
  const consent = getStoredConsent();
  return consent?.analytics ?? false;
};

// ============================================
// GA4 Initialization (conditioned on consent)
// ============================================

const GA_MEASUREMENT_ID = 'G-WMSLH8VCNN';

/**
 * Charge le script GA4 uniquement si le consentement est accordé.
 * Remplace le chargement automatique dans index.html
 */
export const initializeGA4 = (): void => {
  if (!hasAnalyticsConsent()) return;
  if (window.gtagLoaded) return;

  window.gtagLoaded = true;

  // Charger le script gtag.js
  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`;
  document.head.appendChild(script);

  // Initialiser le dataLayer et gtag
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer!.push(arguments);
  }
  window.gtag = gtag;
  gtag('js', new Date());
  gtag('config', GA_MEASUREMENT_ID, {
    send_page_view: true,
    cookie_flags: 'SameSite=None;Secure',
  });
};

// ============================================
// Helper: envoyer un événement GA4
// ============================================

const sendEvent = (eventName: string, params: Record<string, any> = {}): void => {
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', eventName, params);
  }
};

// ============================================
// Événements CTA / Conversion
// ============================================

/**
 * Track un clic sur le CTA WhatsApp
 * @param location - La page/section d'où provient le clic
 */
export const trackWhatsAppClick = (location: string): void => {
  sendEvent('whatsapp_click', {
    event_category: 'CTA',
    event_label: location,
    link_url: 'https://api.whatsapp.com/send?phone=22644323841',
  });
};

/**
 * Track la soumission du formulaire de contact
 */
export const trackContactFormSubmit = (success: boolean): void => {
  sendEvent('contact_form_submit', {
    event_category: 'Conversion',
    event_label: success ? 'success' : 'error',
    value: success ? 1 : 0,
  });
};

/**
 * Track un clic sur le bouton "Devis Gratuit"
 */
export const trackDevisClick = (location: string): void => {
  sendEvent('devis_click', {
    event_category: 'CTA',
    event_label: location,
  });
};

// ============================================
// Événements Navigation
// ============================================

/**
 * Track un clic sur un lien de service
 */
export const trackServiceClick = (serviceName: string): void => {
  sendEvent('service_click', {
    event_category: 'Navigation',
    event_label: serviceName,
  });
};

/**
 * Track un clic "Voir le projet" dans le portfolio
 */
export const trackPortfolioClick = (projectName: string): void => {
  sendEvent('portfolio_click', {
    event_category: 'Navigation',
    event_label: projectName,
  });
};

/**
 * Track un clic vers un réseau social
 */
export const trackSocialClick = (platform: string): void => {
  sendEvent('social_click', {
    event_category: 'Social',
    event_label: platform,
    link_url: platform,
  });
};

// ============================================
// Événements Blog
// ============================================

/**
 * Track la lecture d'un article de blog
 */
export const trackBlogArticleView = (articleTitle: string, articleSlug: string): void => {
  sendEvent('blog_article_view', {
    event_category: 'Blog',
    event_label: articleTitle,
    article_slug: articleSlug,
  });
};

// ============================================
// Événements Chatbot
// ============================================

/**
 * Track l'ouverture du chatbot
 */
export const trackChatbotOpen = (): void => {
  sendEvent('chatbot_open', {
    event_category: 'Chatbot',
    event_label: 'open',
  });
};

/**
 * Track l'envoi d'un message dans le chatbot
 */
export const trackChatbotMessage = (): void => {
  sendEvent('chatbot_message', {
    event_category: 'Chatbot',
    event_label: 'message_sent',
  });
};

// ============================================
// Événements Engagement
// ============================================

/**
 * Track le scroll depth (appelé une seule fois par seuil)
 */
export const trackScrollDepth = (percentage: number): void => {
  sendEvent('scroll_depth', {
    event_category: 'Engagement',
    event_label: `${percentage}%`,
    value: percentage,
  });
};

/**
 * Track le temps passé sur une page (en secondes)
 */
export const trackTimeOnPage = (seconds: number, pagePath: string): void => {
  sendEvent('time_on_page', {
    event_category: 'Engagement',
    event_label: pagePath,
    value: seconds,
  });
};

// ============================================
// Événement Page View (SPA)
// ============================================

/**
 * Track un changement de page dans le SPA
 * À appeler à chaque navigation React Router
 */
export const trackPageView = (pagePath: string, pageTitle: string): void => {
  if (!hasAnalyticsConsent()) return;
  if (typeof window.gtag === 'function') {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_path: pagePath,
      page_title: pageTitle,
    });
  }
};

// ============================================
// Scroll Depth Observer (auto-setup)
// ============================================

/**
 * Initialise le tracking du scroll depth.
 * Émet un événement GA4 quand l'utilisateur atteint 25%, 50%, 75%, 100%
 */
export const initScrollDepthTracking = (): (() => void) => {
  const thresholds = [25, 50, 75, 100];
  const reached = new Set<number>();

  const handleScroll = () => {
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (scrollHeight <= 0) return;

    const scrollPercent = Math.round((window.scrollY / scrollHeight) * 100);

    for (const threshold of thresholds) {
      if (scrollPercent >= threshold && !reached.has(threshold)) {
        reached.add(threshold);
        trackScrollDepth(threshold);
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });

  return () => {
    window.removeEventListener('scroll', handleScroll);
  };
};
