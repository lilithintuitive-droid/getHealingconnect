// Dancing Butterfly SEO Configuration
export const DANCING_BUTTERFLY_SEO_CONFIG = {
  siteName: "Dancing Butterfly Web Development",
  siteUrl: "https://dancingbutterfly.dev",
  defaultTitle: "Freelance Web Developer for Small Businesses | Dancing Butterfly",
  defaultDescription: "Custom websites and web apps that convert. 13+ years experience, fast delivery, packages from $25–$3,500. Get a free consultation today.",
  defaultImage: "https://dancingbutterfly.dev/og-image.jpg",
  twitterHandle: "@dancingbutterfly",
  linkedInProfile: "https://linkedin.com/in/dancingbutterfly-dev",
  githubProfile: "https://github.com/dancingbutterfly-dev"
};

// Dancing Butterfly Meta Tags Interface
export interface DancingButterflyMetaTags {
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

// Generate meta tags for the home page
export function generateHomePageMetaTags(): DancingButterflyMetaTags {
  const title = "Freelance Web Developer for Small Businesses | Dancing Butterfly";
  const description = "Custom websites and web apps that convert. 13+ years experience, fast delivery, packages from $25–$3,500. Get a free consultation today.";
  const keywords = [
    "freelance web developer",
    "custom web development",
    "small business websites",
    "web applications",
    "react developer",
    "full stack developer",
    "web development services",
    "custom software development",
    "business web solutions",
    "professional web developer"
  ].join(", ");

  return {
    title,
    description,
    keywords,
    canonical: DANCING_BUTTERFLY_SEO_CONFIG.siteUrl,
    ogTitle: title,
    ogDescription: description,
    ogImage: DANCING_BUTTERFLY_SEO_CONFIG.defaultImage,
    ogUrl: DANCING_BUTTERFLY_SEO_CONFIG.siteUrl,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DANCING_BUTTERFLY_SEO_CONFIG.defaultImage
  };
}

// Generate meta tags for the contact page
export function generateContactPageMetaTags(): DancingButterflyMetaTags {
  const title = "Contact Dancing Butterfly | Free Web Development Consultation";
  const description = "Ready to transform your business? Get a free consultation for your custom web development project. Fast response within 24 hours.";
  const keywords = [
    "web development consultation",
    "freelance web developer contact",
    "custom web development quote",
    "business web solutions",
    "web development services",
    "project consultation"
  ].join(", ");

  return {
    title,
    description,
    keywords,
    canonical: `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}/contact`,
    ogTitle: title,
    ogDescription: description,
    ogImage: DANCING_BUTTERFLY_SEO_CONFIG.defaultImage,
    ogUrl: `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}/contact`,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: DANCING_BUTTERFLY_SEO_CONFIG.defaultImage
  };
}

// Generate Organization structured data
export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`,
    "name": DANCING_BUTTERFLY_SEO_CONFIG.siteName,
    "alternateName": "Dancing Butterfly",
    "url": DANCING_BUTTERFLY_SEO_CONFIG.siteUrl,
    "logo": {
      "@type": "ImageObject",
      "url": DANCING_BUTTERFLY_SEO_CONFIG.defaultImage,
      "width": 1200,
      "height": 630
    },
    "description": "Professional freelance web development services specializing in custom websites and web applications for small businesses. 13+ years of experience delivering high-quality web solutions.",
    "foundingDate": "2011",
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "hello@dancingbutterfly.dev",
      "availableLanguage": "English"
    },
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "sameAs": [
      DANCING_BUTTERFLY_SEO_CONFIG.linkedInProfile,
      DANCING_BUTTERFLY_SEO_CONFIG.githubProfile
    ],
    "knowsAbout": [
      "Web Development",
      "React Development",
      "Node.js Development",
      "Full Stack Development",
      "Custom Web Applications",
      "E-commerce Development",
      "Database Design",
      "API Development",
      "Responsive Web Design",
      "TypeScript Development"
    ]
  };
}

// Generate WebSite structured data
export function generateWebSiteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#website`,
    "url": DANCING_BUTTERFLY_SEO_CONFIG.siteUrl,
    "name": DANCING_BUTTERFLY_SEO_CONFIG.siteName,
    "description": DANCING_BUTTERFLY_SEO_CONFIG.defaultDescription,
    "publisher": {
      "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
    },
    "inLanguage": "en-US",
    "copyrightYear": new Date().getFullYear(),
    "copyrightHolder": {
      "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
    }
  };
}

// Generate Service structured data
export function generateServiceStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#service`,
    "name": "Custom Web Development Services",
    "description": "Professional web development services including custom websites, web applications, e-commerce solutions, and digital transformation for small businesses.",
    "provider": {
      "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
    },
    "serviceType": "Web Development",
    "areaServed": {
      "@type": "Place",
      "name": "Worldwide"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Web Development Packages",
      "itemListElement": [
        {
          "@type": "AggregateOffer",
          "name": "Quick Fixes Package",
          "description": "Perfect for small updates, bug fixes, and minor feature additions",
          "lowPrice": 25,
          "highPrice": 150,
          "priceCurrency": "USD",
          "availability": "InStock",
          "offeredBy": {
            "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
          }
        },
        {
          "@type": "AggregateOffer",
          "name": "Professional Sites Package", 
          "description": "Complete websites and web applications with custom design and development",
          "lowPrice": 800,
          "highPrice": 2000,
          "priceCurrency": "USD",
          "availability": "InStock",
          "offeredBy": {
            "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
          }
        },
        {
          "@type": "AggregateOffer",
          "name": "Complex Applications Package",
          "description": "Advanced applications and platforms with multi-user functionality",
          "lowPrice": 1500,
          "highPrice": 3500,
          "priceCurrency": "USD",
          "availability": "InStock",
          "offeredBy": {
            "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#organization`
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "award": [
      "13+ Years Experience",
      "100% Client Satisfaction",
      "50+ Successful Projects"
    ]
  };
}

// Generate Person structured data for the freelancer
export function generatePersonStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}#person`,
    "name": "Dancing Butterfly Developer",
    "jobTitle": "Senior Full Stack Web Developer",
    "description": "Experienced freelance web developer with 13+ years of experience specializing in custom web applications and business solutions. Community Development degree holder passionate about transforming businesses through technology.",
    "url": DANCING_BUTTERFLY_SEO_CONFIG.siteUrl,
    "image": DANCING_BUTTERFLY_SEO_CONFIG.defaultImage,
    "sameAs": [
      DANCING_BUTTERFLY_SEO_CONFIG.linkedInProfile,
      DANCING_BUTTERFLY_SEO_CONFIG.githubProfile
    ],
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Community Development Program"
    },
    "hasCredential": {
      "@type": "EducationalOccupationalCredential",
      "name": "Community Development Degree",
      "credentialCategory": "degree"
    },
    "knowsAbout": [
      "React",
      "TypeScript", 
      "Node.js",
      "PostgreSQL",
      "Full Stack Development",
      "Web Application Architecture",
      "Database Design",
      "API Development",
      "E-commerce Solutions",
      "Business Process Optimization"
    ],
    "workExample": [
      {
        "@type": "CreativeWork",
        "name": "HealingConnect Platform",
        "description": "Holistic practitioner marketplace with appointment booking and payment processing",
        "url": `${DANCING_BUTTERFLY_SEO_CONFIG.siteUrl}/case-studies/healingconnect`
      }
    ]
  };
}

// Utility to inject structured data into the page head
export function injectDancingButterflyStructuredData(data: any) {
  if (typeof document !== 'undefined') {
    // Remove any existing structured data script tags
    const existingScripts = document.querySelectorAll('script[type="application/ld+json"][data-dancing-butterfly="true"]');
    existingScripts.forEach(script => script.remove());

    // Create new script tag
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-dancing-butterfly', 'true');
    script.textContent = JSON.stringify(data);
    document.head.appendChild(script);
  }
}

// Utility to update meta tags dynamically
export function updateDancingButterflyMetaTags(metaTags: DancingButterflyMetaTags) {
  if (typeof document !== 'undefined') {
    // Update title
    document.title = metaTags.title;

    // Update or create meta tags
    const metaTagsToUpdate = [
      { name: 'description', content: metaTags.description },
      { name: 'keywords', content: metaTags.keywords },
      { property: 'og:type', content: 'website' },
      { property: 'og:site_name', content: DANCING_BUTTERFLY_SEO_CONFIG.siteName },
      { property: 'og:title', content: metaTags.ogTitle },
      { property: 'og:description', content: metaTags.ogDescription },
      { property: 'og:image', content: metaTags.ogImage },
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: 'Dancing Butterfly Web Development - Custom Web Solutions' },
      { property: 'og:url', content: metaTags.ogUrl },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: DANCING_BUTTERFLY_SEO_CONFIG.twitterHandle },
      { name: 'twitter:title', content: metaTags.twitterTitle },
      { name: 'twitter:description', content: metaTags.twitterDescription },
      { name: 'twitter:image', content: metaTags.twitterImage },
      { name: 'twitter:image:alt', content: 'Dancing Butterfly Web Development - Custom Web Solutions' },
      { name: 'author', content: 'Dancing Butterfly Developer' },
      { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1' },
      { name: 'googlebot', content: 'index, follow' },
      { name: 'language', content: 'en-US' }
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