// Local SEO utilities for location-specific optimization

import type { PractitionerWithSpecialties } from "@shared/schema";
import { SEO_CONFIG } from "./seo-utils";

// Location data for major California cities
export const CALIFORNIA_LOCATIONS = [
  {
    city: "San Francisco",
    state: "CA",
    fullName: "San Francisco, California",
    slug: "san-francisco-ca",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    population: 873965,
    zipCodes: ["94102", "94103", "94104", "94105", "94107", "94108", "94109", "94110", "94111", "94112"],
    neighborhoods: ["Mission", "Castro", "SOMA", "Chinatown", "North Beach", "Pacific Heights"],
    description: "Find certified holistic practitioners in San Francisco, California. Our wellness professionals offer acupuncture, massage therapy, reiki, and other alternative healing services throughout the SF Bay Area."
  },
  {
    city: "Oakland",
    state: "CA",
    fullName: "Oakland, California", 
    slug: "oakland-ca",
    coordinates: { lat: 37.8044, lng: -122.2712 },
    population: 433031,
    zipCodes: ["94601", "94602", "94603", "94605", "94606", "94607", "94608", "94609", "94610"],
    neighborhoods: ["Lake Merritt", "Temescal", "Rockridge", "Grand Lake", "Fruitvale"],
    description: "Discover trusted holistic practitioners in Oakland, California. Connect with licensed acupuncturists, massage therapists, and energy healers serving the East Bay community."
  },
  {
    city: "Berkeley",
    state: "CA",
    fullName: "Berkeley, California",
    slug: "berkeley-ca", 
    coordinates: { lat: 37.8715, lng: -122.2730 },
    population: 124321,
    zipCodes: ["94701", "94702", "94703", "94704", "94705", "94707", "94708", "94709", "94710"],
    neighborhoods: ["Downtown Berkeley", "North Berkeley", "South Berkeley", "West Berkeley"],
    description: "Find experienced holistic practitioners in Berkeley, California. Our certified wellness professionals offer natural healing services near UC Berkeley and throughout the East Bay."
  },
  {
    city: "San Jose",
    state: "CA", 
    fullName: "San Jose, California",
    slug: "san-jose-ca",
    coordinates: { lat: 37.3382, lng: -121.8863 },
    population: 1035317,
    zipCodes: ["95110", "95111", "95112", "95113", "95116", "95117", "95118", "95119", "95120", "95121"],
    neighborhoods: ["Willow Glen", "Almaden Valley", "Evergreen", "Downtown San Jose"],
    description: "Connect with certified holistic practitioners in San Jose, California. Find licensed acupuncturists, massage therapists, and wellness coaches in Silicon Valley."
  },
  {
    city: "Palo Alto",
    state: "CA",
    fullName: "Palo Alto, California",
    slug: "palo-alto-ca",
    coordinates: { lat: 37.4419, lng: -122.1430 },
    population: 68572,
    zipCodes: ["94301", "94302", "94303", "94304", "94305", "94306"],
    neighborhoods: ["Downtown Palo Alto", "Stanford", "Midtown", "Professorville"],
    description: "Discover holistic practitioners in Palo Alto, California. Our wellness professionals serve the Peninsula with acupuncture, reiki, massage therapy, and alternative healing services."
  }
];

// Generate location-specific structured data
export function generateLocationBusinessStructuredData(location: typeof CALIFORNIA_LOCATIONS[0], practitioners: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SEO_CONFIG.siteUrl}/locations/${location.slug}#local-business`,
    "name": `HealingConnect - ${location.fullName}`,
    "description": location.description,
    "url": `${SEO_CONFIG.siteUrl}/locations/${location.slug}`,
    "telephone": "+1-800-HEALING",
    "email": "info@healingconnect.com",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": location.city,
      "addressRegion": location.state,
      "addressCountry": "US"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.coordinates.lat.toString(),
      "longitude": location.coordinates.lng.toString()
    },
    "areaServed": [
      {
        "@type": "City",
        "name": location.city,
        "containedInPlace": {
          "@type": "State",
          "name": "California"
        }
      },
      ...location.neighborhoods.map(neighborhood => ({
        "@type": "Neighborhood",
        "name": neighborhood,
        "containedInPlace": {
          "@type": "City",
          "name": location.city
        }
      }))
    ],
    "serviceArea": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": location.coordinates.lat.toString(),
        "longitude": location.coordinates.lng.toString()
      },
      "geoRadius": "25000"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Holistic Wellness Services in ${location.city}`,
      "itemListElement": [
        {
          "@type": "OfferCatalog",
          "name": `Acupuncture in ${location.city}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Acupuncture Treatment in ${location.city}`,
                "description": `Professional acupuncture services in ${location.city}, ${location.state}`
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": `Massage Therapy in ${location.city}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Massage Therapy in ${location.city}`,
                "description": `Therapeutic massage services in ${location.city}, ${location.state}`
              }
            }
          ]
        },
        {
          "@type": "OfferCatalog",
          "name": `Energy Healing in ${location.city}`,
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": `Reiki and Energy Healing in ${location.city}`,
                "description": `Energy healing and Reiki services in ${location.city}, ${location.state}`
              }
            }
          ]
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": practitioners.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    }
  };
}

// Generate location-specific meta tags
export function generateLocationMetaTags(location: typeof CALIFORNIA_LOCATIONS[0], specialty?: string) {
  const baseTitle = specialty 
    ? `${specialty} Practitioners in ${location.city}, ${location.state}` 
    : `Holistic Practitioners in ${location.city}, ${location.state}`;
    
  const title = `${baseTitle} | HealingConnect`;
  
  const description = specialty
    ? `Find certified ${specialty.toLowerCase()} practitioners in ${location.city}, ${location.state}. Book appointments with licensed wellness professionals serving ${location.neighborhoods.slice(0, 3).join(", ")} and surrounding areas.`
    : location.description + ` Serving ${location.neighborhoods.slice(0, 3).join(", ")} and surrounding neighborhoods.`;

  const keywords = [
    specialty ? specialty.toLowerCase() : "holistic practitioners",
    `${location.city.toLowerCase()} wellness`,
    `${location.state.toLowerCase()} alternative medicine`,
    ...location.neighborhoods.map(n => n.toLowerCase()),
    "licensed practitioners",
    "book appointment",
    "natural healing",
    "acupuncture",
    "massage therapy",
    "reiki"
  ].join(", ");

  return {
    title,
    description,
    keywords,
    canonical: `${SEO_CONFIG.siteUrl}/locations/${location.slug}${specialty ? `/${specialty.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: `${SEO_CONFIG.siteUrl}/locations/${location.slug}${specialty ? `/${specialty.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    twitterTitle: title,
    twitterDescription: description
  };
}

// Generate local content for SEO
export function generateLocalContent(location: typeof CALIFORNIA_LOCATIONS[0], practitioners: any[], specialties: string[]) {
  return {
    heroTitle: `Find Holistic Practitioners in ${location.city}, ${location.state}`,
    heroSubtitle: `Connect with ${practitioners.length}+ certified wellness professionals serving ${location.neighborhoods.slice(0, 2).join(" and ")}`,
    
    aboutLocation: `${location.city} is home to a thriving wellness community with experienced holistic practitioners specializing in ${specialties.slice(0, 3).join(", ")} and more. Our platform connects you with licensed professionals throughout ${location.neighborhoods.join(", ")} and the greater ${location.city} area.`,
    
    servicesOffered: `Popular holistic services in ${location.city} include traditional acupuncture, therapeutic massage, Reiki energy healing, aromatherapy, meditation coaching, and wellness counseling. Our practitioners serve clients in ${location.zipCodes.slice(0, 5).join(", ")} and surrounding zip codes.`,
    
    whyChooseUs: `With over ${practitioners.length} verified practitioners in the ${location.city} area, HealingConnect makes it easy to find and book appointments with trusted wellness professionals. All our practitioners are licensed and committed to providing personalized, holistic care.`,
    
    neighborhoods: location.neighborhoods.map(neighborhood => ({
      name: neighborhood,
      description: `Find certified holistic practitioners serving ${neighborhood} in ${location.city}. Our wellness professionals provide convenient access to natural healing services throughout this vibrant neighborhood.`,
      practitionerCount: Math.floor(practitioners.length / location.neighborhoods.length)
    })),
    
    faqs: [
      {
        question: `How do I find the best holistic practitioner in ${location.city}?`,
        answer: `Use our search filters to find practitioners by specialty, availability, and location within ${location.city}. Read reviews, check credentials, and book consultations with practitioners who match your wellness goals.`
      },
      {
        question: `What types of holistic services are available in ${location.city}?`,
        answer: `${location.city} practitioners offer acupuncture, massage therapy, Reiki, aromatherapy, meditation coaching, nutritional counseling, and energy healing. Many practitioners offer both in-person and virtual sessions.`
      },
      {
        question: `Are the practitioners in ${location.city} licensed and certified?`,
        answer: `Yes, all practitioners on HealingConnect are required to maintain current licenses and certifications. We verify credentials and regularly update practitioner profiles to ensure you connect with qualified professionals.`
      },
      {
        question: `How much do holistic treatments cost in ${location.city}?`,
        answer: `Treatment costs vary by practitioner and service type. Most sessions range from $75-$200, with many practitioners offering sliding scale fees or package discounts. View individual practitioner profiles for specific pricing.`
      }
    ]
  };
}

// Generate neighborhood-specific structured data
export function generateNeighborhoodStructuredData(location: typeof CALIFORNIA_LOCATIONS[0], neighborhood: string, practitioners: any[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    "@id": `${SEO_CONFIG.siteUrl}/locations/${location.slug}/${neighborhood.toLowerCase().replace(/\s+/g, '-')}#place`,
    "name": neighborhood,
    "description": `Find certified holistic practitioners serving ${neighborhood} in ${location.city}, ${location.state}`,
    "containedInPlace": {
      "@type": "City",
      "name": location.city,
      "containedInPlace": {
        "@type": "State", 
        "name": "California"
      }
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `Holistic Services in ${neighborhood}`,
      "itemListElement": practitioners.slice(0, 5).map(practitioner => ({
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": practitioner.title,
          "provider": {
            "@type": "Person",
            "name": practitioner.name
          }
        }
      }))
    }
  };
}

// Get location by slug
export function getLocationBySlug(slug: string) {
  return CALIFORNIA_LOCATIONS.find(loc => loc.slug === slug);
}

// Get locations by specialty
export function getLocationsBySpecialty(specialty: string) {
  // Return all locations for now - could be filtered based on practitioner availability
  return CALIFORNIA_LOCATIONS.map(location => ({
    ...location,
    specialtyUrl: `/locations/${location.slug}/${specialty.toLowerCase().replace(/\s+/g, '-')}`,
    specialtyTitle: `${specialty} Practitioners in ${location.city}, ${location.state}`
  }));
}

// Generate local sitemap URLs
export function generateLocalSitemapUrls(): Array<{
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}> {
  const today = new Date().toISOString().split('T')[0];
  const urls: Array<any> = [];
  
  // Add location pages
  CALIFORNIA_LOCATIONS.forEach(location => {
    urls.push({
      url: `${SEO_CONFIG.siteUrl}/locations/${location.slug}`,
      lastmod: today,
      changefreq: 'weekly' as const,
      priority: 0.8
    });
    
    // Add specialty + location combinations
    const specialties = ['acupuncture', 'massage-therapy', 'reiki', 'aromatherapy', 'energy-healing'];
    specialties.forEach(specialty => {
      urls.push({
        url: `${SEO_CONFIG.siteUrl}/locations/${location.slug}/${specialty}`,
        lastmod: today,
        changefreq: 'weekly' as const,
        priority: 0.7
      });
    });
  });
  
  return urls;
}