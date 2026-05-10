export function GET(context) {
  // Fallback to localhost if site is not configured
  // Astro's URL object includes trailing slash, remove it for consistency
  const siteUrl = context.site 
    ? context.site.href.replace(/\/$/, '')
    : 'http://localhost:4321';
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
