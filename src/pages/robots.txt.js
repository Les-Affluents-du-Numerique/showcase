export async function GET(context) {
  // Fallback to localhost if site is not configured
  const siteUrl = context.site 
    ? context.site.href.replace(/\/$/, '') // Remove trailing slash if present
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
