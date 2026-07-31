# BinkoO Digital Lab

Application Web responsive et optimisée pour l'Agence Digitale et d'Intelligence Artificielle **BinkoO Digital Lab** (Burkina Faso).

## 🚀 Architecture & Technologies

- **Frontend :** React (SPA) + TypeScript + Tailwind CSS + Framer Motion.
- **Routage client :** React Router DOM v6.
- **Optimisation SEO :**
  - **Prerendering :** Géré via l'extension native **Netlify Prerender** pour servir le HTML pré-rendu (avec exécution JS) aux robots de recherche (Googlebot, Bingbot) et aux réseaux sociaux.
  - **Gestion dynamique des métadonnées :** Composant [`SEO.tsx`](file:///src/components/SEO.tsx) encapsulant `react-helmet-async` pour configurer le titre, la description, l'url canonique, les tags OpenGraph/Twitter et les schémas de données structurées (JSON-LD Organization, ProfessionalService, BreadcrumbList, FAQ, Article) à la volée.
  - **Sitemap dynamique :** Déployé sous forme de fonction serverless Netlify [`sitemap.js`](file:///netlify/functions/sitemap.js) disponible sur `/sitemap.xml`. Cette fonction effectue un fetch en temps réel des articles de blog depuis l'API WordPress (`https://blog.binkoo.digital/wp-json/wp/v2/posts`) et génère les balises `<lastmod>` à partir des dates réelles de modification de chaque article.

## 🛠️ Scripts disponibles

Dans le répertoire du projet, vous pouvez exécuter :

### `npm run dev`
Lance le serveur de développement en local (accessible sur http://localhost:3000).

### `npm run build`
Compile l'application pour la production dans le dossier `dist/`. Optimise les images, minifie le code, et génère le fichier HTML d'entrée propre.

### `./verify-seo.sh`
Script Shell local de vérification post-déploiement qui teste la validité des redirections, de la balise noscript, des en-têtes et du sitemap.

## 📈 Guide SEO & Workflow n8n

Pour éviter les problèmes de cannibalisation et de CTR bas identifiés sur la Search Console, suivez ces directives stratégiques :

1. **Règle anti-cannibalisation (dans n8n) :** Ne publiez pas plusieurs articles sur le même sous-sujet précis (ex: "Formation IA au Burkina Faso") dans un intervalle inférieur à 30 jours pour éviter de diviser le PageRank.
2. **Titres SEO courts (dans n8n) :** Générez des balises de titre optimisées limitées à **60 caractères** maximum pour éviter qu'elles ne soient tronquées par Google dans les SERPs.
3. **Maillage interne :** Les articles automatisés doivent comporter 1 à 2 liens internes pointant vers les pages de services clés du site comme `/services/ia-automatisation`.

## 🧪 Tests unitaires

Les tests unitaires du composant SEO sont situés dans [`src/components/__tests__/SEO.test.tsx`](file:///src/components/__tests__/SEO.test.tsx) et utilisent **Vitest** et **React Testing Library**.
