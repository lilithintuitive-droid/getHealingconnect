import type { PractitionerWithSpecialties, Specialty } from "@shared/schema";

// SEO Configuration
export const SEO_CONFIG = {
  siteName: "HealingConnect",
  siteUrl: "https://healingconnect.com",
  defaultTitle: "HealingConnect - Find Certified Holistic Practitioners & Book Appointments Online",
  defaultDescription: "Connect with verified holistic practitioners in your area. Book appointments for acupuncture, massage therapy, reiki, aromatherapy, and energy healing. Find trusted wellness experts near you.",
  defaultImage: "https://healingconnect.com/og-image.jpg",
  twitterHandle: "@healingconnect",
  facebookPage: "https://facebook.com/healingconnect",
  instagramProfile: "https://instagram.com/healingconnect"
};

// Meta Tags Interface
export interface MetaTags {
  title: string;
  description: string;
  keywords?: string;
  canonical?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
}

// Generate dynamic meta tags for practitioner profiles
export function generatePractitionerMetaTags(practitioner: {
  id: string;
  name: string;
  title: string;
  location: string;
  specialties: string[];
  bio: string | null;
  rating: number;
  reviewCount: number;
  imageUrl?: string;
}): MetaTags {
  const specialtiesStr = practitioner.specialties.slice(0, 3).join(", ");
  const locationShort = practitioner.location.split(",")[0]; // Get city only
  
  const title = `${practitioner.name} - ${practitioner.title} in ${locationShort} | HealingConnect`;
  
  const description = `Book an appointment with ${practitioner.name}, a certified ${practitioner.title} specializing in ${specialtiesStr} in ${practitioner.location}. Rated ${practitioner.rating}/5 stars with ${practitioner.reviewCount} reviews.`;
  
  const keywords = [
    practitioner.title.toLowerCase(),
    ...practitioner.specialties.map(s => s.toLowerCase()),
    locationShort.toLowerCase(),
    "holistic practitioner",
    "wellness therapy",
    "alternative medicine",
    "book appointment"
  ].join(", ");

  const canonical = `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}`;
  const ogImage = practitioner.imageUrl || SEO_CONFIG.defaultImage;

  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage,
    ogUrl: canonical,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: ogImage
  };
}

// Generate meta tags for specialty/service pages
export function generateSpecialtyMetaTags(specialty: {
  name: string;
  description?: string;
  location?: string;
}): MetaTags {
  const locationStr = specialty.location || "your area";
  const title = `${specialty.name} Practitioners in ${locationStr} | HealingConnect`;
  
  const description = specialty.description 
    ? `Find certified ${specialty.name.toLowerCase()} practitioners in ${locationStr}. ${specialty.description} Book appointments online with verified wellness professionals.`
    : `Find certified ${specialty.name.toLowerCase()} practitioners in ${locationStr}. Book appointments online with verified wellness professionals.`;

  const keywords = [
    specialty.name.toLowerCase(),
    `${specialty.name.toLowerCase()} near me`,
    `${specialty.name.toLowerCase()} practitioners`,
    "holistic healing",
    "wellness therapy",
    "alternative medicine",
    locationStr.toLowerCase()
  ].join(", ");

  const canonical = `${SEO_CONFIG.siteUrl}/specialties/${specialty.name.toLowerCase().replace(/\s+/g, '-')}`;

  return {
    title,
    description,
    keywords,
    canonical,
    ogTitle: title,
    ogDescription: description,
    ogImage: SEO_CONFIG.defaultImage,
    ogUrl: canonical,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: SEO_CONFIG.defaultImage
  };
}

// Generate structured data for practitioner profiles
export function generatePractitionerStructuredData(practitioner: {
  id: string;
  name: string;
  title: string;
  location: string;
  specialties: string[];
  bio: string | null;
  experience: string | null;
  education: string[];
  certifications: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  imageUrl?: string;
  languages: string[];
}) {
  const locationParts = practitioner.location.split(", ");
  const city = locationParts[0];
  const state = locationParts[1] || "CA";

  return {
    "@context": "https://schema.org",
    "@type": ["Person", "HealthcareProvider"],
    "@id": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}#person`,
    "name": practitioner.name,
    "jobTitle": practitioner.title,
    "description": practitioner.bio || `Certified ${practitioner.title} specializing in ${practitioner.specialties.join(", ")}`,
    "image": practitioner.imageUrl || `${SEO_CONFIG.siteUrl}/default-practitioner.jpg`,
    "url": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": city,
      "addressRegion": state,
      "addressCountry": "US"
    },
    "medicalSpecialty": practitioner.specialties,
    "knowsLanguage": practitioner.languages.map(lang => ({
      "@type": "Language",
      "name": lang
    })),
    "hasCredential": [
      ...practitioner.education.map(edu => ({
        "@type": "EducationalOccupationalCredential",
        "name": edu,
        "credentialCategory": "degree"
      })),
      ...practitioner.certifications.map(cert => ({
        "@type": "EducationalOccupationalCredential", 
        "name": cert,
        "credentialCategory": "certification"
      }))
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": practitioner.rating.toString(),
      "reviewCount": practitioner.reviewCount.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "priceRange": `$${practitioner.hourlyRate}-${practitioner.hourlyRate + 50}`,
    "offers": {
      "@type": "Offer",
      "name": `${practitioner.title} Services`,
      "description": `Professional ${practitioner.title.toLowerCase()} services`,
      "price": practitioner.hourlyRate.toString(),
      "priceCurrency": "USD",
      "availability": "InStock",
      "validFrom": new Date().toISOString(),
      "seller": {
        "@id": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}#person`
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}`
    },
    "sameAs": [
      // Could add social media profiles if available
    ]
  };
}

// Generate structured data for service listings
export function generateServiceListingStructuredData(practitioners: {
  id: string;
  name: string;
  title: string;
  location: string;
  specialties: string[];
  rating: number;
  reviewCount: number;
  hourlyRate: number;
  imageUrl?: string;
}[], specialty?: string, location?: string) {
  
  const itemListElements = practitioners.map((practitioner, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "item": {
      "@type": ["Person", "HealthcareProvider"],
      "@id": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}#person`,
      "name": practitioner.name,
      "jobTitle": practitioner.title,
      "image": practitioner.imageUrl || `${SEO_CONFIG.siteUrl}/default-practitioner.jpg`,
      "url": `${SEO_CONFIG.siteUrl}/practitioners/${practitioner.id}`,
      "medicalSpecialty": practitioner.specialties,
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": practitioner.rating.toString(),
        "reviewCount": practitioner.reviewCount.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "priceRange": `$${practitioner.hourlyRate}+`,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": practitioner.location.split(",")[0],
        "addressRegion": practitioner.location.split(",")[1]?.trim() || "CA",
        "addressCountry": "US"
      }
    }
  }));

  let name = "Holistic Practitioners";
  let description = "Find certified holistic practitioners for wellness and healing services";
  
  if (specialty && location) {
    name = `${specialty} Practitioners in ${location}`;
    description = `Find certified ${specialty.toLowerCase()} practitioners in ${location}`;
  } else if (specialty) {
    name = `${specialty} Practitioners`;
    description = `Find certified ${specialty.toLowerCase()} practitioners`;
  } else if (location) {
    name = `Holistic Practitioners in ${location}`;
    description = `Find certified holistic practitioners in ${location}`;
  }

  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SEO_CONFIG.siteUrl}#practitioners-list`,
    "name": name,
    "description": description,
    "numberOfItems": practitioners.length,
    "itemListElement": itemListElements,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": SEO_CONFIG.siteUrl
    }
  };
}

// Generate breadcrumb structured data
export function generateBreadcrumbStructuredData(breadcrumbs: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": crumb.name,
      "item": crumb.url
    }))
  };
}

// Generate FAQ structured data (useful for service pages)
export function generateFAQStructuredData(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };
}

// Utility to inject structured data into the page head
export function injectStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    // Remove any existing structured data script tags
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dynamic="true"]');
    existingScripts.forEach(script => script.remove());

    // Create new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dynamic', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

// Utility to update meta tags dynamically
export function updateMetaTags(metaTags: MetaTags) {
  if (typeof document !== 'undefined') {
    // Update title
    document.title = metaTags.title;

    // Update or create meta tags
    const metaTagsToUpdate = [
      { name: 'description', content: metaTags.description },
      { name: 'keywords', content: metaTags.keywords },
      { property: 'og:title', content: metaTags.ogTitle },
      { property: 'og:description', content: metaTags.ogDescription },
      { property: 'og:image', content: metaTags.ogImage },
      { property: 'og:url', content: metaTags.ogUrl },
      { name: 'twitter:title', content: metaTags.twitterTitle },
      { name: 'twitter:description', content: metaTags.twitterDescription },
      { name: 'twitter:image', content: metaTags.twitterImage }
    ];

    metaTagsToUpdate.forEach(({ name, property, content }) => {
      if (!content) return;

      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`;
      let metaTag = document.querySelector(selector) as HTMLMetaElement;
      
      if (!metaTag) {
        metaTag = document.createElement('meta');
        if (name) metaTag.setAttribute('name', name);
        if (property) metaTag.setAttribute('property', property);
        document.head.appendChild(metaTag);
      }
      
      metaTag.setAttribute('content', content);
    });

    // Update canonical URL
    if (metaTags.canonical) {
      let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
      if (!canonicalTag) {
        canonicalTag = document.createElement('link');
        canonicalTag.setAttribute('rel', 'canonical');
        document.head.appendChild(canonicalTag);
      }
      canonicalTag.setAttribute('href', metaTags.canonical);
    }
  }
}

// Generate location-specific SEO content
export function generateLocationSEOContent(location: string, specialties: string[]) {
  const city = location.split(",")[0];
  const state = location.split(",")[1]?.trim() || "CA";
  
  return {
    title: `Holistic Practitioners in ${city}, ${state} | HealingConnect`,
    description: `Find certified holistic practitioners in ${city}, ${state}. Book appointments for ${specialties.slice(0, 3).join(", ")} and more wellness services. Trusted local practitioners near you.`,
    h1: `Holistic Practitioners in ${city}, ${state}`,
    h2: `Top-Rated Wellness Services in ${city}`,
    locationContent: `Discover certified holistic practitioners in ${city}, ${state} who specialize in ${specialties.join(", ")} and other wellness services. Our platform connects you with trusted local practitioners who are committed to your holistic health journey.`,
    specialtiesContent: specialties.map(specialty => 
      `Find experienced ${specialty.toLowerCase()} practitioners in ${city} who can help you achieve optimal wellness through natural healing methods.`
    )
  };
}

// SEO-friendly URL slug generator
export function generateSEOSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}