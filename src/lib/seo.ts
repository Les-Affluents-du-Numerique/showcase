import { SITE_LANG, SITE_TITLE } from "../consts";
import { resolveAuthors } from "./authors";

export type SeoPageType = "website" | "article" | "case-study";

interface StructuredDataOptions {
  pageType: SeoPageType;
  pathname: string;
  siteURL: URL;
  canonicalURL: URL;
  imageURL: URL;
  contentTitle: string;
  description: string;
  publishedDate?: Date;
  updatedDate?: Date;
  authors?: string[];
  author?: string;
  tags?: string[];
}

export function buildStructuredData({
  pageType,
  pathname,
  siteURL,
  canonicalURL,
  imageURL,
  contentTitle,
  description,
  publishedDate,
  updatedDate,
  authors,
  author,
  tags = [],
}: StructuredDataOptions): string | null {
  const organizationId = new URL("/#organization", siteURL).href;
  const websiteId = new URL("/#website", siteURL).href;
  const resolvedAuthors = resolveAuthors(authors, author);

  const organizationSchema = {
    "@type": "Organization",
    "@id": organizationId,
    name: SITE_TITLE,
    url: new URL("/", siteURL).href,
    logo: {
      "@type": "ImageObject",
      url: new URL("/favicon.svg", siteURL).href,
    },
    email: "contact@lesaffluentsdunumerique.fr",
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Île-de-France",
    },
  };

  const breadcrumbItems =
    pageType === "article"
      ? [
          ["Accueil", "/"],
          ["Blog", "/blog/"],
          [contentTitle, canonicalURL.href],
        ]
      : pageType === "case-study"
        ? [
            ["Accueil", "/"],
            ["Réalisations", "/realisations/"],
            [contentTitle, canonicalURL.href],
          ]
        : [];

  const graph: Record<string, unknown>[] = [];

  if (pathname === "/") {
    graph.push(organizationSchema, {
      "@type": "WebSite",
      "@id": websiteId,
      url: new URL("/", siteURL).href,
      name: SITE_TITLE,
      inLanguage: SITE_LANG,
      publisher: { "@id": organizationId },
    });
  }

  if (pageType === "article" && publishedDate) {
    graph.push(organizationSchema, {
      "@type": "BlogPosting",
      "@id": `${canonicalURL.href}#article`,
      url: canonicalURL.href,
      mainEntityOfPage: { "@id": canonicalURL.href },
      headline: contentTitle,
      description,
      image: [imageURL.href],
      datePublished: publishedDate.toISOString(),
      dateModified: (updatedDate ?? publishedDate).toISOString(),
      inLanguage: SITE_LANG,
      author: resolvedAuthors.map(({ name }) => ({
        "@type": "Person",
        name,
      })),
      publisher: { "@id": organizationId },
      keywords: tags,
    });
  }

  if (pageType === "case-study") {
    graph.push(organizationSchema, {
      "@type": "CreativeWork",
      "@id": `${canonicalURL.href}#case-study`,
      url: canonicalURL.href,
      mainEntityOfPage: { "@id": canonicalURL.href },
      name: contentTitle,
      description,
      image: imageURL.href,
      ...(publishedDate ? { dateCreated: publishedDate.toISOString() } : {}),
      inLanguage: SITE_LANG,
      creator: resolvedAuthors.map(({ name }) => ({
        "@type": "Person",
        name,
      })),
      provider: { "@id": organizationId },
    });
  }

  if (breadcrumbItems.length > 0) {
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${canonicalURL.href}#breadcrumb`,
      itemListElement: breadcrumbItems.map(([name, href], index) => ({
        "@type": "ListItem",
        position: index + 1,
        name,
        item: href.startsWith("http") ? href : new URL(href, siteURL).href,
      })),
    });
  }

  if (graph.length === 0) return null;

  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": graph,
  }).replace(/</g, "\\u003c");
}
