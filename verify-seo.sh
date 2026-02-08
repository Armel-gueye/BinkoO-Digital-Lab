#!/bin/bash
# Script de vérification SEO post-déploiement
# Usage: ./verify-seo.sh

echo "=== Vérification SEO BinkoO Digital Lab ==="
echo ""

# Couleurs pour l'affichage
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# URL du site
SITE_URL="https://binkoo.digital"

echo "1. Test du contenu statique (noscript)..."
if curl -s "$SITE_URL/services" | grep -q "IA & Automatisation"; then
    echo -e "${GREEN}✓ Contenu statique détecté${NC}"
else
    echo -e "${RED}✗ Contenu statique non détecté${NC}"
fi
echo ""

echo "2. Test des headers X-Robots-Tag..."
if curl -I "$SITE_URL/services" 2>/dev/null | grep -q "X-Robots-Tag"; then
    echo -e "${GREEN}✓ Headers X-Robots-Tag présents${NC}"
    curl -I "$SITE_URL/services" 2>/dev/null | grep "X-Robots-Tag"
else
    echo -e "${RED}✗ Headers X-Robots-Tag absents${NC}"
fi
echo ""

echo "3. Test du sitemap..."
if curl -s "$SITE_URL/sitemap.xml" | grep -q "2026-02-07"; then
    echo -e "${GREEN}✓ Sitemap mis à jour${NC}"
else
    echo -e "${RED}✗ Sitemap non mis à jour${NC}"
fi
echo ""

echo "4. Test des données structurées..."
if curl -s "$SITE_URL" | grep -q "application/ld+json"; then
    echo -e "${GREEN}✓ Données structurées JSON-LD présentes${NC}"
else
    echo -e "${RED}✗ Données structurées absentes${NC}"
fi
echo ""

echo "5. Vérification des URLs dans le sitemap..."
echo "   - Services: $(curl -s "$SITE_URL/sitemap.xml" | grep -c "/services")"
echo "   - À Propos: $(curl -s "$SITE_URL/sitemap.xml" | grep -c "/a-propos")"
echo ""

echo "=== Tests terminés ==="
echo ""
echo "Pour tester les rich snippets:"
echo "https://search.google.com/test/rich-results?url=$SITE_URL"
echo ""
echo "Pour soumettre à Google Search Console:"
echo "1. Aller sur https://search.google.com/search-console"
echo "2. Sitemaps > Resoumettre sitemap.xml"
echo "3. Inspection de l'URL > Tester /services et /a-propos"
echo "4. Demander une indexation pour chaque page"
