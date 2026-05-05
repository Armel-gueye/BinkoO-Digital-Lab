import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Lock, Eye, FileText, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { AnimatedSection, AnimatedParagraph } from '@/components/AnimatedSection';
import SEO from '@/components/SEO';

const PrivacyPolicy: React.FC = () => {
  const lastUpdated = "05 Mai 2026";

  return (
    <>
      <SEO 
        title="Politique de Confidentialité - BinkoO Digital Lab"
        description="Consultez la politique de confidentialité de BinkoO Digital Lab. Nous nous engageons à protéger vos données personnelles et à être transparents sur l'usage de nos cookies."
        canonical="https://binkoo.digital/politique-confidentialite"
      />
      <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <AnimatedSection animation="fade-up">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-primary hover:gap-3 transition-all duration-300 font-semibold mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour à l'accueil
            </Link>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-foreground">
              Politique de Confidentialité
            </h1>
            <p className="text-muted-foreground mb-12">
              Dernière mise à jour : {lastUpdated}
            </p>
          </AnimatedSection>

          <div className="space-y-12">
            {/* Introduction */}
            <AnimatedSection animation="fade-up" delay={0.1}>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-primary/10 text-primary shrink-0">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Engagement de Confidentialité</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Chez BinkoO Digital Lab, nous accordons une importance capitale à la protection de votre vie privée. Cette politique détaille comment nous collectons, utilisons et protégeons vos informations lorsque vous utilisez notre site web. Nous nous engageons à respecter le Règlement Général sur la Protection des Données (RGPD).
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Cookies Section */}
            <AnimatedSection animation="fade-up" delay={0.2}>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-black/5 text-foreground shrink-0">
                  <FileText className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Utilisation des Cookies</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Notre site utilise des cookies pour améliorer votre expérience utilisateur et analyser notre trafic. Un "cookie" est un petit fichier texte stocké sur votre appareil.
                  </p>
                  <ul className="space-y-4">
                    <li className="bg-muted/30 p-4 rounded-xl border border-border">
                      <strong className="text-foreground block mb-1">Cookies Essentiels :</strong>
                      <span className="text-sm text-muted-foreground">Ces cookies sont nécessaires au fonctionnement technique du site et ne peuvent pas être désactivés. Ils ne stockent aucune donnée personnelle.</span>
                    </li>
                    <li className="bg-muted/30 p-4 rounded-xl border border-border">
                      <strong className="text-foreground block mb-1">Cookies Analytiques (Google Analytics) :</strong>
                      <span className="text-sm text-muted-foreground">Nous utilisons Google Analytics pour comprendre comment nos visiteurs interagissent avec le site (pages les plus vues, temps passé, origine du trafic). Ces données nous aident à améliorer nos services. Ces cookies ne sont activés qu'avec votre consentement explicite via notre bandeau de cookies.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </AnimatedSection>

            {/* Data Collection */}
            <AnimatedSection animation="fade-up" delay={0.3}>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-black/5 text-foreground shrink-0">
                  <Lock className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Collecte des Données via Formulaires</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    Lorsque vous remplissez notre formulaire de contact, nous collectons les informations suivantes : nom, prénom, email professionnel, et le contenu de votre message. Ces informations sont exclusivement utilisées pour répondre à votre demande et ne sont jamais vendues à des tiers.
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* User Rights */}
            <AnimatedSection animation="fade-up" delay={0.4}>
              <div className="flex gap-4 items-start">
                <div className="p-3 rounded-xl bg-black/5 text-foreground shrink-0">
                  <Eye className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-4">Vos Droits</h2>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    Conformément au RGPD, vous disposez des droits suivants concernant vos données personnelles :
                  </p>
                  <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                    <li>Droit d'accès à vos données</li>
                    <li>Droit de rectification de vos données</li>
                    <li>Droit à l'effacement ("droit à l'oubli")</li>
                    <li>Droit de retirer votre consentement aux cookies à tout moment</li>
                  </ul>
                  <p className="mt-6 text-muted-foreground">
                    Pour exercer ces droits, vous pouvez nous contacter à l'adresse email suivante : <a href="mailto:contact@binkoo.digital" className="text-primary font-bold hover:underline">contact@binkoo.digital</a>
                  </p>
                </div>
              </div>
            </AnimatedSection>

            {/* Final Note */}
            <AnimatedSection animation="fade-up" delay={0.5}>
              <div className="bg-gray-50 border border-border p-8 rounded-2xl text-center">
                <h3 className="text-xl font-bold mb-4">Des questions ?</h3>
                <p className="text-muted-foreground mb-6">
                  Si vous avez des préoccupations concernant notre politique de confidentialité, n'hésitez pas à nous contacter directement.
                </p>
                <Link 
                  to="/contact" 
                  className="inline-flex items-center justify-center bg-black text-white px-8 py-3 rounded-full font-bold hover:bg-black/80 transition-all shadow-lg"
                >
                  Nous contacter
                </Link>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </>
  );
};

export default PrivacyPolicy;
