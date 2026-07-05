import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  keywords?: string;
  ogImage?: string;
  ogType?: string;
  robots?: string;
  localCity?: string;
  faq?: { q: string; a: string; }[];
}

/**
 * Composant SEO Intelligent pour BinkoO Digital Lab
 * Gère toutes les métadonnées essentielles pour le référencement
 */
export default function SEO({
  title,
  description = description || '',
  canonical,
  keywords = "BinkoO, BinkoO Digital Lab, agence digitale Burkina Faso, automatisation de processus, d'Intelligence Artificielle, développement web, Burkina Faso",
  ogImage = "https://slelguoygbfzlpylpxfs.supabase.co/storage/v1/object/public/document-uploads/BinkoO-Digital-Lab-PNG-1760749121547.png",
  ogType = "website",
  robots = "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
  localCity,
  faq
}: SEOProps) {
  // Truncate description for SEO meta tags (max 155 characters)
  const truncatedDescription = description.length > 155 ? description.slice(0, 152) + "..." : description;
  // Compute canonical URL: use provided prop or current location without query params or hash
  const computeCanonical = () => {
    if (canonical) return canonical;
    if (typeof window !== 'undefined' && window.location) {
      const { origin, pathname } = window.location;
      return `${origin}${pathname}`;
    }
    return siteUrl;
  };
  const siteUrl = "https://binkoo.digital";
  const fullTitle = `${title} | BinkoO Digital Lab`;
  const canonicalUrl = computeCanonical();


  // Données structurées JSON-LD pour Google
  const graph: any[] = [
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
        "areaServed": localCity ? { "@type": "City", "name": localCity } : "BF",
        "availableLanguage": ["fr", "en"]
      },
      "sameAs": [
        "https://www.facebook.com/share/1JPaSH1STA/",
        "https://www.linkedin.com/company/binkoo-digital-lab",
        "https://www.instagram.com/binkoo_digital_lab",
        "https://www.tiktok.com/@binkoo.digital.lab"
      ],
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Bobo-Dioulasso",
        "addressRegion": "Hauts-Bassins",
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
      "areaServed": localCity ? {
        "@type": "City",
        "name": localCity
      } : {
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
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-ia`,
      "name": "IA & Automatisation",
      "description": "Intégration d'intelligence artificielle, chatbots WhatsApp/Facebook, agents IA de prospection, scraping de données et automatisation de workflows.",
      "provider": {
        "@id": `${siteUrl}/#organization`
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Burkina Faso"
        },
        {
          "@type": "Country",
          "name": "Côte d'Ivoire"
        },
        {
          "@type": "Country",
          "name": "Sénégal"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-web`,
      "name": "Création Web & Applications",
      "description": "Développement de sites vitrines professionnels, e-commerce connectés à WhatsApp, applications web (SaaS) et landing pages rapides.",
      "provider": {
        "@id": `${siteUrl}/#organization`
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Burkina Faso"
        },
        {
          "@type": "Country",
          "name": "Côte d'Ivoire"
        },
        {
          "@type": "Country",
          "name": "Sénégal"
        }
      ]
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-branding`,
      "name": "Design & Branding",
      "description": "Création d'identité visuelle de marque, logos professionnels, chartes graphiques et visuels pour réseaux sociaux.",
      "provider": {
        "@id": `${siteUrl}/#organization`
      },
      "areaServed": [
        {
          "@type": "Country",
          "name": "Burkina Faso"
        },
        {
          "@type": "Country",
          "name": "Côte d'Ivoire"
        },
        {
          "@type": "Country",
          "name": "Sénégal"
        }
      ]
    }
  ];

  if (faq && faq.length > 0) {
    graph.push({
      "@type": "FAQPage",
      "@id": `${canonicalUrl}/#faq`,
      "mainEntity": faq.map(item => ({
        "@type": "Question",
        "name": item.q,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": item.a
        }
      }))
    });
  }

  // Add Article schema when on a blog article page
  if (canonicalUrl.includes('/blog/') && title && description) {
    graph.unshift({
      "@type": "Article",
      "@id": `${canonicalUrl}#article`,
      "headline": title,
      "description": description,
      "image": [{ "@type": "ImageObject", "url": ogImage }],
      "author": { "@type": "Organization", "name": "BinkoO Digital Lab" },
      "publisher": { "@type": "Organization", "name": "BinkoO Digital Lab", "logo": { "@type": "ImageObject", "url": ogImage } },
      "url": canonicalUrl,
      "datePublished": new Date().toISOString()
    });
  }
  // BreadcrumbList JSON-LD (only on pages with a path)
  if (typeof window !== 'undefined') {
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0) {
      const items = pathSegments.map((seg, idx) => ({
        "@type": "ListItem",
        position: idx + 1,
        name: seg.replace(/-/g, ' '),
        item: `${siteUrl}/${pathSegments.slice(0, idx + 1).join('/')}`
      }));
      graph.unshift({
        "@type": "BreadcrumbList",
        "@id": `${canonicalUrl}#breadcrumb`,
        itemListElement: items
      });
    }
  }

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": graph
  };

  return (
    <Helmet>
      <html lang="fr" />
      <title>{fullTitle}</title>
      <meta name="description" content={truncatedDescription} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:site_name" content="BinkoO Digital Lab" />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={truncatedDescription} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="fr_FR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={truncatedDescription} />
      <meta name="twitter:image" content={ogImage} />

      <meta name="robots" content={robots} />
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
