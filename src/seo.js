// SEO brain. Structured data is derived from the same content the page renders,
// so adding a service, FAQ, or review updates the schema with no second edit.
// All business facts live in src/data/business.json so the schema stays editable
// and platform-portable. Everything here is SSR/prerender-safe: pure functions,
// static imports, no window/document.
import home from "./data/home.json";
import business from "./data/business.json";
// Real reviews, inlined at build time so they appear in the prerendered HTML.
// The client still fetches /reviews/reviews.json at runtime (src/reviews/api.js);
// this is the SSR copy of that same file, so schema and on-page list agree.
import reviews from "../public/reviews/reviews.json";
import { SITE_NAME, TAGLINE, CONTACT, NAV } from "./site.js";

export const SITE = "https://tntelitebuilders.com";
export const OG_IMAGE = SITE + "/images/social-preview.png";

// Every route the prerenderer should emit as static HTML.
export const PRERENDER_ROUTES = ["/"];

// Stable @id anchors so every node can cross-reference the others.
const ORG_ID = SITE + "/#org";
const WEBSITE_ID = SITE + "/#website";
const WEBPAGE_ID = SITE + "/#webpage";
const LOGO_ID = SITE + "/#logo";
const BREADCRUMB_ID = SITE + "/#breadcrumb";
const FAQ_ID = SITE + "/#faqpage";

// Single source of truth for the phone number is site.js (tel: href -> E.164).
const TELEPHONE = CONTACT.phoneHref.replace(/^tel:/, "");

const slug = (s) =>
  String(s).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
const serviceId = (name) => SITE + "/#service-" + slug(name);

const DESCRIPTION =
  "TNT Elite Builders offers custom homes, remodeling, and construction services across Texas. " +
  TAGLINE;

const ORG_DESCRIPTION =
  `TNT Elite Builders is a general contractor with more than ${business.yearsExperience} years of experience providing ` +
  home.services.items.map((s) => s.name.toLowerCase()).join(", ") +
  ". Insurance claim coordination is handled from start to finish.";

// ---- reusable node fragments ------------------------------------------

function areaServedNodes() {
  const a = business.areaServed || {};
  const nodes = [];
  if (a.state) nodes.push({ "@type": "State", name: a.state });
  (a.counties || []).forEach((name) =>
    nodes.push({ "@type": "AdministrativeArea", name })
  );
  (a.cities || []).forEach((name) =>
    nodes.push({
      "@type": "City",
      name,
      containedInPlace: { "@type": "State", name: a.state || "Texas" }
    })
  );
  return nodes.length ? nodes : [{ "@type": "State", name: "Texas" }];
}

function addressNode() {
  const a = business.address || {};
  const out = { "@type": "PostalAddress", addressCountry: a.addressCountry || "US" };
  if (a.addressRegion) out.addressRegion = a.addressRegion;
  // Service-area business: locality only once the owner confirms it. Never a street.
  if (a.addressLocality) out.addressLocality = a.addressLocality;
  if (a.postalCode) out.postalCode = a.postalCode;
  return out;
}

// Exported so it is unit-testable; coerces the string rating in reviews.json.
export function aggregateRatingFrom(list) {
  const nums = (list || [])
    .map((r) => Number(r.rating))
    .filter((n) => Number.isFinite(n) && n > 0);
  if (!nums.length) return null;
  const avg = nums.reduce((a, b) => a + b, 0) / nums.length;
  return {
    "@type": "AggregateRating",
    ratingValue: Math.round(avg * 10) / 10,
    reviewCount: nums.length,
    bestRating: 5,
    worstRating: 1
  };
}

function reviewNodes(list) {
  return (list || []).map((r) => ({
    "@type": "Review",
    "@id": SITE + "/#review-" + r.id,
    itemReviewed: { "@id": ORG_ID },
    author: { "@type": "Person", name: r.name },
    reviewRating: {
      "@type": "Rating",
      ratingValue: Number(r.rating),
      bestRating: 5,
      worstRating: 1
    },
    reviewBody: r.comment,
    datePublished: r.created_at
  }));
}

function orgNode() {
  const org = {
    "@type": "GeneralContractor",
    "@id": ORG_ID,
    name: SITE_NAME,
    legalName: business.legalName,
    description: ORG_DESCRIPTION,
    url: SITE,
    mainEntityOfPage: { "@id": WEBPAGE_ID },
    logo: {
      "@type": "ImageObject",
      "@id": LOGO_ID,
      url: business.logo.url,
      contentUrl: business.logo.url,
      caption: business.logo.caption,
      width: business.logo.width,
      height: business.logo.height
    },
    image: business.image || OG_IMAGE,
    telephone: TELEPHONE,
    email: CONTACT.email,
    priceRange: business.priceRange,
    slogan: TAGLINE,
    knowsAbout: home.services.items
      .map((s) => s.name)
      .concat(["Insurance claim coordination"]),
    address: addressNode(),
    areaServed: areaServedNodes(),
    contactPoint: {
      "@type": "ContactPoint",
      telephone: TELEPHONE,
      email: CONTACT.email,
      contactType: business.contactType || "customer service",
      areaServed: "US-TX",
      availableLanguage: business.availableLanguage || ["en-US"]
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Construction Services",
      itemListElement: home.services.items.map((s) => ({
        "@type": "Offer",
        itemOffered: { "@id": serviceId(s.name) }
      }))
    }
  };

  // Conditional facts: emitted ONLY when real data is present in business.json,
  // so the graph never carries a fabricated year, coordinate, hour, or social link.
  if (business.foundingYear) org.foundingDate = String(business.foundingYear);
  if (Array.isArray(business.sameAs) && business.sameAs.length)
    org.sameAs = business.sameAs;

  if (
    business.geo &&
    business.geo.latitude != null &&
    business.geo.longitude != null
  ) {
    org.serviceArea = {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: business.geo.latitude,
        longitude: business.geo.longitude
      }
    };
    if (business.serviceRadiusMiles)
      org.serviceArea.geoRadius = Math.round(business.serviceRadiusMiles * 1609.34);
  }

  if (Array.isArray(business.hours) && business.hours.length) {
    org.openingHoursSpecification = business.hours.map((h) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: h.days,
      opens: h.opens,
      closes: h.closes
    }));
  }

  const agg = aggregateRatingFrom(reviews);
  if (agg) {
    org.aggregateRating = agg;
    org.review = reviewNodes(reviews);
  }

  return org;
}

function serviceNodes() {
  const served = areaServedNodes();
  return home.services.items.map((s) => ({
    "@type": "Service",
    "@id": serviceId(s.name),
    serviceType: s.name,
    name: s.name,
    description: s.desc,
    provider: { "@id": ORG_ID },
    areaServed: served,
    category: "Construction",
    inLanguage: "en-US"
  }));
}

function faqNode() {
  return {
    "@type": "FAQPage",
    "@id": FAQ_ID,
    isPartOf: { "@id": WEBPAGE_ID },
    about: { "@id": ORG_ID },
    mainEntity: home.faq.items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a }
    }))
  };
}

function websiteNode() {
  const node = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: SITE,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en-US"
  };
  // SearchAction ONLY when a real on-site search exists (none today).
  if (business.hasSearch && business.searchUrlTemplate) {
    node.potentialAction = {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: business.searchUrlTemplate },
      "query-input": "required name=search_term_string"
    };
  }
  return node;
}

function breadcrumbNode() {
  // NAV hrefs are in-page anchors ("#services"); prefix the site root.
  const items = [{ name: "Home", url: SITE + "/" }].concat(
    NAV.map((n) => ({ name: n.name, url: SITE + "/" + n.href }))
  );
  return {
    "@type": "BreadcrumbList",
    "@id": BREADCRUMB_ID,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: it.url
    }))
  };
}

function webPageNode(canonical, name) {
  return {
    "@type": "WebPage",
    "@id": WEBPAGE_ID,
    url: canonical,
    name,
    isPartOf: { "@id": WEBSITE_ID },
    about: { "@id": ORG_ID },
    primaryImageOfPage: { "@id": LOGO_ID },
    breadcrumb: { "@id": BREADCRUMB_ID },
    inLanguage: "en-US",
    // Voice-search hints. Selectors verified against Hero.jsx (.fv-hero > .fv-lead)
    // and Faq.jsx (section.fv-faq > details > summary/p).
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".fv-hero .fv-lead", ".fv-faq summary", ".fv-faq details p"]
    }
  };
}

// One connected @graph. @context lives once at the top; nodes carry no @context.
function buildGraph(canonical, name) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      orgNode(),
      websiteNode(),
      webPageNode(canonical, name),
      breadcrumbNode(),
      faqNode(),
      ...serviceNodes()
    ]
  };
}

export function headFor(path) {
  const canonical = SITE + (path === "/" ? "/" : path);
  const title = `${SITE_NAME} | Custom Homes, Remodeling & Construction`;
  return {
    title,
    description: DESCRIPTION,
    canonical,
    author: business.legalName || SITE_NAME,
    geoRegion: business.geoRegion,        // "US-TX" — grounded (Texas is stated)
    geoPlacename: business.geoPlacename,  // e.g. "Houston" — OWNER MUST CONFIRM; null omits
    geo: business.geo,                    // coords -> geo.position/ICBM; null omits
    twitterSite: business.social && business.social.twitter, // omitted until a real handle exists
    ogTitle: `${SITE_NAME} — ${TAGLINE}`,
    ogDescription: DESCRIPTION,
    ogImage: OG_IMAGE,
    // Single-element array -> headTags emits exactly ONE ld+json script.
    jsonld: [buildGraph(canonical, title)]
  };
}

const esc = (s) =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
const jsonSafe = (o) => JSON.stringify(o).replace(/</g, "\\u003c");

// The head block the prerenderer swaps into the template (replaces the <title>).
export function headTags(head) {
  const t = [];
  t.push(`<title>${esc(head.title)}</title>`);
  t.push(`<meta name="description" content="${esc(head.description)}" />`);
  t.push(`<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1" />`);
  t.push(`<link rel="canonical" href="${esc(head.canonical)}" />`);
  if (head.author) t.push(`<meta name="author" content="${esc(head.author)}" />`);
  if (head.geoRegion) t.push(`<meta name="geo.region" content="${esc(head.geoRegion)}" />`);
  if (head.geoPlacename) t.push(`<meta name="geo.placename" content="${esc(head.geoPlacename)}" />`);
  if (head.geo && head.geo.latitude != null && head.geo.longitude != null) {
    t.push(`<meta name="geo.position" content="${esc(head.geo.latitude)};${esc(head.geo.longitude)}" />`);
    t.push(`<meta name="ICBM" content="${esc(head.geo.latitude)}, ${esc(head.geo.longitude)}" />`);
  }
  t.push(`<meta property="og:type" content="website" />`);
  t.push(`<meta property="og:locale" content="en_US" />`);
  t.push(`<meta property="og:site_name" content="${esc(SITE_NAME)}" />`);
  t.push(`<meta property="og:title" content="${esc(head.ogTitle)}" />`);
  t.push(`<meta property="og:description" content="${esc(head.ogDescription)}" />`);
  t.push(`<meta property="og:url" content="${esc(head.canonical)}" />`);
  t.push(`<meta property="og:image" content="${esc(head.ogImage)}" />`);
  t.push(`<meta name="twitter:card" content="summary_large_image" />`);
  if (head.twitterSite) t.push(`<meta name="twitter:site" content="${esc(head.twitterSite)}" />`);
  t.push(`<meta name="twitter:title" content="${esc(head.ogTitle)}" />`);
  t.push(`<meta name="twitter:description" content="${esc(head.ogDescription)}" />`);
  t.push(`<meta name="twitter:image" content="${esc(head.ogImage)}" />`);
  for (const block of head.jsonld || []) {
    t.push(`<script type="application/ld+json">${jsonSafe(block)}</script>`);
  }
  return t.join("\n    ");
}
