import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, BarChart3, X } from 'lucide-react';
import {
  type CookieConsent as CookieConsentType,
  getStoredConsent,
  saveConsent,
  initializeGA4,
} from '@/utils/analytics';

/**
 * CookieConsent - Bandeau de consentement RGPD
 * 
 * Affiche un bandeau élégant en bas de l'écran pour recueillir
 * le consentement de l'utilisateur pour les cookies analytics.
 * 
 * - Apparaît uniquement si aucun consentement n'a été donné
 * - Offre 3 options : Tout accepter, Personnaliser, Refuser
 * - Sauvegarde le choix en localStorage
 * - Initialise GA4 si le consentement analytics est accordé
 */

const CONSENT_VERSION = '1.0';

const CookieConsent: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [analyticsEnabled, setAnalyticsEnabled] = useState(true);

  useEffect(() => {
    // Vérifier si un consentement existe déjà
    const existingConsent = getStoredConsent();
    if (existingConsent) {
      // Le consentement existe déjà, initialiser GA4 si accepté
      if (existingConsent.analytics) {
        initializeGA4();
      }
      return;
    }

    // Afficher le bandeau après un court délai pour ne pas bloquer le rendu
    const timer = setTimeout(() => setIsVisible(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleAcceptAll = () => {
    const consent: CookieConsentType = {
      analytics: true,
      marketing: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(consent);
    initializeGA4();
    setIsVisible(false);
  };

  const handleSavePreferences = () => {
    const consent: CookieConsentType = {
      analytics: analyticsEnabled,
      marketing: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(consent);
    if (analyticsEnabled) {
      initializeGA4();
    }
    setIsVisible(false);
  };

  const handleRejectAll = () => {
    const consent: CookieConsentType = {
      analytics: false,
      marketing: false,
      timestamp: Date.now(),
      version: CONSENT_VERSION,
    };
    saveConsent(consent);
    setIsVisible(false);
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          id="cookie-consent-banner"
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-3 sm:p-4"
        >
          <div className="mx-auto max-w-3xl">
            <div
              className="relative overflow-hidden rounded-2xl border border-border/50 shadow-2xl"
              style={{
                background: 'rgba(255, 255, 255, 0.95)',
                backdropFilter: 'blur(20px)',
                WebkitBackdropFilter: 'blur(20px)',
              }}
            >
              {/* Gradient accent line */}
              <div
                className="absolute top-0 left-0 right-0 h-1"
                style={{
                  background: 'linear-gradient(90deg, #FF2B00 0%, #000000 50%, #FF2B00 100%)',
                }}
              />

              <div className="p-4 sm:p-6">
                {/* Header row */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-black">
                      <Shield className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-foreground leading-tight">
                        Votre vie privée compte
                      </h3>
                      <p className="text-[11px] text-muted-foreground leading-tight mt-0.5">
                        Conforme au RGPD
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleRejectAll}
                    className="flex h-7 w-7 items-center justify-center rounded-lg hover:bg-gray-100 transition-colors flex-shrink-0"
                    aria-label="Fermer et refuser les cookies"
                  >
                    <X className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                </div>

                {/* Description */}
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4">
                  Nous utilisons des cookies pour analyser le trafic et améliorer votre expérience.
                  Aucune donnée personnelle n'est vendue ou partagée à des fins publicitaires.
                </p>

                {/* Details panel */}
                <AnimatePresence>
                  {showDetails && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mb-4 space-y-3 rounded-xl bg-gray-50 p-3 sm:p-4">
                        {/* Cookies essentiels */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-black/10">
                              <Shield className="h-3.5 w-3.5 text-foreground" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground">
                                Cookies essentiels
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Navigation et fonctionnalités de base
                              </p>
                            </div>
                          </div>
                          <span className="rounded-full bg-black px-2.5 py-0.5 text-[10px] font-medium text-white">
                            Requis
                          </span>
                        </div>

                        {/* Cookies analytics */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10">
                              <BarChart3 className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-foreground">
                                Cookies analytiques
                              </p>
                              <p className="text-[10px] text-muted-foreground">
                                Google Analytics — mesure d'audience anonyme
                              </p>
                            </div>
                          </div>
                          <button
                            onClick={() => setAnalyticsEnabled(!analyticsEnabled)}
                            className={`relative h-5 w-9 rounded-full transition-colors duration-300 ${
                              analyticsEnabled ? 'bg-primary' : 'bg-gray-300'
                            }`}
                            aria-label={
                              analyticsEnabled
                                ? 'Désactiver les cookies analytiques'
                                : 'Activer les cookies analytiques'
                            }
                          >
                            <span
                              className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${
                                analyticsEnabled ? 'translate-x-4' : 'translate-x-0.5'
                              }`}
                            />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                  <button
                    onClick={handleAcceptAll}
                    id="cookie-accept-all"
                    className="flex-1 rounded-xl bg-black px-4 py-2.5 text-xs font-semibold text-white transition-all hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-black/10"
                  >
                    Tout accepter
                  </button>

                  {showDetails ? (
                    <button
                      onClick={handleSavePreferences}
                      id="cookie-save-preferences"
                      className="flex-1 rounded-xl border-2 border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Sauvegarder
                    </button>
                  ) : (
                    <button
                      onClick={() => setShowDetails(true)}
                      id="cookie-customize"
                      className="flex-1 rounded-xl border-2 border-border bg-white px-4 py-2.5 text-xs font-semibold text-foreground transition-all hover:bg-gray-50 hover:scale-[1.02] active:scale-[0.98]"
                    >
                      Personnaliser
                    </button>
                  )}

                  <button
                    onClick={handleRejectAll}
                    id="cookie-reject-all"
                    className="flex-1 rounded-xl px-4 py-2.5 text-xs font-medium text-muted-foreground transition-all hover:bg-gray-100 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Refuser
                  </button>
                </div>

                <p className="mt-3 text-center text-[10px] text-muted-foreground">
                  En savoir plus sur notre{' '}
                  <Link
                    to="/politique-confidentialite"
                    className="underline underline-offset-2 hover:text-foreground transition-colors"
                  >
                    politique de confidentialité
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
