import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
}

/**
 * Composant SEO Intelligent pour BinkoO Digital Lab
 * Gère toutes les métadonnées essentielles pour le référencement
 */
export default function SEO({
  title,
  description,
  canonical,
  keywords = "BinkoO, BinkoO Digital Lab, agence digitale Burkina Faso, automatisation IA, développement web, chatbot IA, Bobo-Dioulasso",
  ogImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png",
  ogType = "website"
}: SEOProps) {
  const siteUrl = "https://binkoo.digital";
  const fullTitle = `${title} | BinkoO Digital Lab`;
  const canonicalUrl = canonical || siteUrl;

  // Données structurées JSON-LD pour Google
  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${siteUrl}/#organization`,
        "name": "BinkoO Digital Lab",
        "alternateName": ["BinkoO", "Agence BinkoO"],
        "url": siteUrl,
        "logo": {
          "@type": "ImageObject",
          "url": ogImage,
          "width": "600",
          "height": "600"
        },
        "contactPoint": {
          "@type": "ContactPoint",
          "telephone": "+226-44-32-38-41",
          "contactType": "customer service",
          "areaServed": "BF",
          "availableLanguage": ["fr", "en"]
        },
        "sameAs": [
          "https://www.facebook.com/share/1JPaSH1STA/",
          "https://www.linkedin.com/in/binkoo-digital-lab-5a012b385",
          "https://www.instagram.com/binkoo_digital_lab",
          "https://www.tiktok.com/@binkoo.digital.lab"
        ],
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lafiabougou, Secteur 20",
          "addressLocality": "Bobo-Dioulasso",
          "addressRegion": "Hauts-Bassins",
          "postalCode": "",
          "addressCountry": "BF"
        }
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        "name": "BinkoO Digital Lab",
        "image": ogImage,
        "description": description,
        "priceRange": "$$",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Lafiabougou, Secteur 20",
          "addressLocality": "Bobo-Dioulasso",
          "addressRegion": "Hauts-Bassins",
          "addressCountry": "BF"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": "11.1775",
          "longitude": "-4.2979"
        },
        "url": siteUrl,
        "telephone": "+226-44-32-38-41",
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": [
              "Monday",
              "Tuesday",
              "Wednesday",
              "Thursday",
              "Friday"
            ],
            "opens": "08:00",
            "closes": "18:00"
          }
        ],
        "areaServed": {
          "@type": "Country",
          "name": "Burkina Faso"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Services BinkoO Digital Lab",
          "itemListElement": [
            {
              "@type": "OfferCatalog",
              "name": "IA & Automatisation",
              "description": "Intégration d'intelligence artificielle, chatbots (WhatsApp/Facebook), agents IA de prospection, scraping de données et automatisation de workflows.",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Chatbots intelligents"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Agents IA sur mesure"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Scraping de données"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Automatisation CRM"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Réceptionniste vocal IA"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Création Web & Apps",
              "description": "Développement de sites vitrines, applications web SAAS, landing pages haute conversion et boutiques reliées à WhatsApp.",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Sites vitrines"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Applications Web / SAAS"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Boutiques WhatsApp"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Landing Pages"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "SEO"
                  }
                }
              ]
            },
            {
              "@type": "OfferCatalog",
              "name": "Design & Branding",
              "description": "Création d'identité visuelle, logos, design pour réseaux sociaux, affiches.",
              "itemListElement": [
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Logos & Branding"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Flyers & Affiches"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Bannières"
                  }
                },
                {
                  "@type": "Offer",
                  "itemOffered": {
                    "@type": "Service",
                    "name": "Visuels Réseaux Sociaux"
                  }
                }
              ]
            }
          ]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${siteUrl}/#website`,
        "url": siteUrl,
        "name": "BinkoO Digital Lab",
        "description": "Agence digitale spécialisée en IA, automatisation et développement web au Burkina Faso",
        "publisher": {
          "@id": `${siteUrl}/#organization`
        },
        "potentialAction": {
          "@type": "SearchAction",
          "target": {
            "@type": "EntryPoint",
            "urlTemplate": `${siteUrl}/blog?q={search_term_string}`
          },
          "query-input": "required name=search_term_string"
        },
        "inLanguage": "fr-FR"
      }
    ]
  };

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      <meta property="og:site_name" content="BinkoO Digital Lab" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />
      
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="author" content="BinkoO Digital Lab" />
      <meta name="geo.region" content="BF-HOU" />
      <meta name="geo.placename" content="Bobo-Dioulasso" />
      <meta name="geo.position" content="11.1775;-4.2979" />
      <meta name="ICBM" content="11.1775, -4.2979" />
      
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
}
