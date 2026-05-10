export async function GET(context) {
  const siteUrl = context.site.href.replace(/\/$/, ''); // Remove trailing slash if present
  
  const robotsTxt = `User-agent: *
Allow: /

Sitemap: ${siteUrl}/sitemap-index.xml`;

  return new Response(robotsTxt, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
    },
  });
}
