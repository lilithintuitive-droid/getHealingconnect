// URL utilities for SEO-friendly routing and canonical URL management

export const URL_CONFIG = {
  baseUrl: 'https://healingconnect.com',
  routes: {
    home: '/',
    practitioners: '/practitioners',
    practitioner: '/practitioners/:id',
    specialties: '/specialties',
    specialty: '/specialties/:specialty',
    locations: '/locations',
    location: '/locations/:location',
    search: '/search',
    about: '/about',
    contact: '/contact'
  }
};

// Generate SEO-friendly URLs
export function generatePractitionerUrl(practitionerId: string, practitionerName: string): string {
  const slug = generateSlug(practitionerName);
  return `/practitioners/${practitionerId}/${slug}`;
}

export function generateSpecialtyUrl(specialtyName: string): string {
  const slug = generateSlug(specialtyName);
  return `/specialties/${slug}`;
}

export function generateLocationUrl(location: string): string {
  const slug = generateSlug(location);
  return `/locations/${slug}`;
}

export function generateSearchUrl(query: string, location?: string): string {
  const params = new URLSearchParams();
  if (query) params.set('q', query);
  if (location) params.set('location', location);
  return `/search?${params.toString()}`;
}

// Generate canonical URL for current page
export function generateCanonicalUrl(pathname: string): string {
  // Remove any query parameters for canonical URLs
  const cleanPath = pathname.split('?')[0];
  return `${URL_CONFIG.baseUrl}${cleanPath}`;
}

// Generate slug from text (SEO-friendly URL segment)
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '') // Remove special characters
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/--+/g, '-') // Replace multiple hyphens with single
    .trim()
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Extract location info for SEO
export function parseLocation(location: string): { city: string; state: string; full: string } {
  const parts = location.split(',').map(part => part.trim());
  return {
    city: parts[0] || '',
    state: parts[1] || 'CA',
    full: location
  };
}

// Generate breadcrumb data for SEO
export function generateBreadcrumbs(pathname: string): Array<{ name: string; url: string }> {
  const breadcrumbs = [{ name: 'Home', url: '/' }];
  
  const segments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  for (let i = 0; i < segments.length; i++) {
    currentPath += `/${segments[i]}`;
    let name = segments[i];

    // Convert URL segments to readable names
    switch (segments[i]) {
      case 'practitioners':
        name = 'Practitioners';
        break;
      case 'specialties':
        name = 'Specialties';
        break;
      case 'locations':
        name = 'Locations';
        break;
      case 'search':
        name = 'Search Results';
        break;
      case 'about':
        name = 'About';
        break;
      case 'contact':
        name = 'Contact';
        break;
      default:
        // For dynamic segments like practitioner names or specialty names
        name = segments[i].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    breadcrumbs.push({ name, url: currentPath });
  }

  return breadcrumbs;
}

// Generate sitemap data
export function generateSitemapUrls(): Array<{
  url: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}> {
  const today = new Date().toISOString().split('T')[0];
  
  return [
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.home,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.practitioners,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.9
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.specialties,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.locations,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.search,
      lastmod: today,
      changefreq: 'daily',
      priority: 0.7
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.about,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    },
    {
      url: URL_CONFIG.baseUrl + URL_CONFIG.routes.contact,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5
    }
  ];
}

// Update page canonical URL dynamically
export function updateCanonicalUrl(pathname: string) {
  if (typeof document !== 'undefined') {
    const canonicalUrl = generateCanonicalUrl(pathname);
    
    let canonicalTag = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalTag) {
      canonicalTag = document.createElement('link');
      canonicalTag.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalTag);
    }
    
    canonicalTag.setAttribute('href', canonicalUrl);
  }
}

// Generate structured URLs for better internal linking
export function generateInternalLinks() {
  return {
    findPractitioners: {
      acupuncture: {
        url: generateSpecialtyUrl('acupuncture'),
        title: 'Find Acupuncture Practitioners',
        description: 'Licensed acupuncturists specializing in traditional Chinese medicine'
      },
      massage: {
        url: generateSpecialtyUrl('massage-therapy'),
        title: 'Find Massage Therapists',
        description: 'Certified massage therapists for therapeutic and relaxation treatments'
      },
      reiki: {
        url: generateSpecialtyUrl('reiki'),
        title: 'Find Reiki Practitioners',
        description: 'Certified Reiki masters for energy healing and spiritual wellness'
      },
      aromatherapy: {
        url: generateSpecialtyUrl('aromatherapy'),
        title: 'Find Aromatherapy Specialists',
        description: 'Essential oil experts for natural healing and wellness'
      }
    },
    locations: {
      sanFrancisco: {
        url: generateLocationUrl('san-francisco-ca'),
        title: 'Holistic Practitioners in San Francisco',
        description: 'Find certified wellness practitioners in San Francisco, CA'
      },
      oakland: {
        url: generateLocationUrl('oakland-ca'),
        title: 'Holistic Practitioners in Oakland',
        description: 'Find certified wellness practitioners in Oakland, CA'
      },
      berkeley: {
        url: generateLocationUrl('berkeley-ca'),
        title: 'Holistic Practitioners in Berkeley',
        description: 'Find certified wellness practitioners in Berkeley, CA'
      }
    }
  };
}