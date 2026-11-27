import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import HomePage from './pages/Home';
import MediaPage from './pages/Media';
import BrandPage from './pages/Brand';
import V2Page from './pages/V2';

const SITE_URL = 'https://cultivator.vercel.app';

const routeSeo = {
  '/': {
    title: 'Cultivator | Cultivator Smart Aquaculture IoT',
    description:
      'Cultivator builds Cultivator, an IoT monitoring platform for shrimp farm aerators with pilot traction, partner momentum, and a clear smart aquaculture investment opportunity.',
    keywords: 'Cultivator, Cultivator, aquaculture IoT, shrimp farming, aerator monitoring, smart aquaculture, Taiwan startup, agritech investment',
    image: `${SITE_URL}/cultivator-og.png`,
    twitterCard: 'summary_large_image',
    schemaType: 'organization',
  },
  '/media': {
    title: 'Cultivator Media | Field Work, Prototypes, and Startup Moments',
    description:
      'Browse Cultivator media from farm discovery, Cultivator prototype work, team sessions, and smart aquaculture field validation.',
    keywords: 'Cultivator media, Cultivator gallery, aquaculture startup photos, shrimp farm IoT, Taiwan startup gallery',
    image: `${SITE_URL}/cultivator-og.png`,
    twitterCard: 'summary_large_image',
    schemaType: 'organization',
  },
};

// JSON-LD Structured Data
const structuredData = {
  organization: {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Cultivator',
    url: SITE_URL,
    logo: `${SITE_URL}/cultivator-og.png`,
    description: 'Cultivator builds Cultivator, an IoT monitoring platform for shrimp farm aerators and smart aquaculture operations.',
    foundingLocation: {
      '@type': 'Place',
      name: 'Taiwan'
    },
    foundingDate: '2025',
    areaServed: ['Taiwan', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines'],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+886-953-809-08',
      contactType: 'investor relations',
      email: 'ddieong04@gmail.com',
      availableLanguage: ['English', 'Chinese', 'Indonesian']
    },
    sameAs: [
      'https://www.linkedin.com/company/cultivatortech/',
      'https://www.instagram.com/cultivatorteam/'
    ]
  },
  product: {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'Cultivator',
    description: 'Smart aeration for shrimp farms. A clip-on current sensor on each aerator\'s cable, in the farm\'s existing electrical box, tells the farmer on LINE or WhatsApp the moment an aerator stops. Dissolved oxygen and pH probes read the water.',
    brand: {
      '@type': 'Organization',
      name: 'Cultivator'
    },
    category: 'Agriculture Technology',
    applicationCategory: 'IoT Monitoring System',
    offers: {
      '@type': 'Offer',
      description: 'Contact for pricing information',
      availability: 'https://schema.org/InStock',
      priceCurrency: 'USD',
      seller: {
        '@type': 'Organization',
        name: 'Cultivator'
      }
    },
    additionalProperty: [
      {
        '@type': 'PropertyValue',
        name: 'Monitoring Type',
        value: 'Aerator current (clamp in the electrical box), dissolved oxygen and pH'
      },
      {
        '@type': 'PropertyValue',
        name: 'Installation',
        value: 'Clamps onto existing cables; no cable cut, nothing in the pond replaced'
      },
      {
        '@type': 'PropertyValue',
        name: 'Alerts',
        value: 'LINE or WhatsApp alerts; daily, weekly, monthly and per-harvest reports'
      }
    ]
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is Cultivator?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Cultivator watches the aerators that keep shrimp alive and tells the farmer on LINE or WhatsApp the moment one stops. A clip-on current sensor clamps onto each aerator\'s cable inside the farm\'s existing electrical box.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the installation work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The current sensor clamps onto the aerator\'s cable inside the existing electrical box. No cable is cut and nothing in the pond is replaced. In our tests it took under 10 minutes per aerator. A sealed field box holds the electronics, and a dissolved oxygen probe and pH sensor sit in the pond.'
        }
      },
      {
        '@type': 'Question',
        name: 'Where are your pilots?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We have 15+ signed pilots, 5 of them paid, in 4 countries: Indonesia, Taiwan, Malaysia and China.'
        }
      }
    ]
  }
};

const setMeta = (selector, attribute, value) => {
  const element = document.head.querySelector(selector);
  if (element) {
    element.setAttribute(attribute, value);
  }
};

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const lastPath = useRef(pathname);
  useEffect(() => {
    // Only when moving between pages, never on first load/reload (pages may restore their own position).
    // Comparing paths keeps this correct even when effects run twice in development.
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const injectStructuredData = (schemas) => {
  // Remove existing JSON-LD scripts
  const existingScripts = document.head.querySelectorAll('script[type="application/ld+json"]');
  existingScripts.forEach(script => script.remove());

  // Inject all schemas as separate script tags
  schemas.forEach(schema => {
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schema);
    document.head.appendChild(script);
  });
};

const SEOManager = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    const hasRouteSeo = Boolean(routeSeo[pathname]);
    const seo = hasRouteSeo ? routeSeo[pathname] : routeSeo['/'];
    const canonicalUrl = hasRouteSeo ? `${SITE_URL}${pathname === '/' ? '/' : pathname}` : `${SITE_URL}/`;

    document.title = seo.title;
    setMeta('meta[name="description"]', 'content', seo.description);
    setMeta('meta[name="keywords"]', 'content', seo.keywords);
    setMeta('link[rel="canonical"]', 'href', canonicalUrl);

    setMeta('meta[property="og:title"]', 'content', seo.title);
    setMeta('meta[property="og:description"]', 'content', seo.description);
    setMeta('meta[property="og:url"]', 'content', canonicalUrl);
    setMeta('meta[property="og:image"]', 'content', seo.image);

    setMeta('meta[name="twitter:title"]', 'content', seo.title);
    setMeta('meta[name="twitter:description"]', 'content', seo.description);
    setMeta('meta[name="twitter:image"]', 'content', seo.image);
    setMeta('meta[name="twitter:card"]', 'content', seo.twitterCard || 'summary_large_image');

    // Inject structured data based on page
    const schemas = [];
    if (seo.schemaType === 'product') {
      schemas.push(structuredData.product);
    } else if (seo.schemaType === 'organization') {
      schemas.push(structuredData.organization);
    }

    // Always inject FAQ on homepage
    if (pathname === '/') {
      schemas.push(structuredData.faq);
    }

    injectStructuredData(schemas);
  }, [pathname]);

  return null;
};

export default function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <SEOManager />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/media" element={<MediaPage />} />
        <Route path="/brand" element={<BrandPage />} />
        <Route path="/v2" element={<V2Page />} />
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
