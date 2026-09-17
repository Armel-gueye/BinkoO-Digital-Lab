/**
 * middleware.ts — Passthrough intentionnel.
 *
 * La logique de détection des bots et d'injection des métadonnées SEO
 * est gérée dans api/middleware.ts, appelée via les rewrites de vercel.json.
 *
 * Ce fichier doit rester vide (matcher vide = ne s'exécute jamais)
 * pour éviter les boucles infinies causées par les fetch internes.
 */
export const config = {
  matcher: [], // Ne s'exécute sur aucune route
};

export default function middleware(_request: Request): undefined {
  return undefined;
}
