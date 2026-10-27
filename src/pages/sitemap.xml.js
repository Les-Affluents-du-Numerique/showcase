// GitHub Pages ne gère pas les redirections : /sitemap.xml (ancienne URL
// redirigée par Vercel) expose directement l'index généré par @astrojs/sitemap.
export function GET(context) {
  const sitemapUrl = new URL("sitemap-0.xml", context.site);

  const sitemapIndex = `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"><sitemap><loc>${sitemapUrl}</loc></sitemap></sitemapindex>`;

  return new Response(sitemapIndex, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
