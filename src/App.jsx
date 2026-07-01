import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import HomePage from './pages/Home';

const SITE_URL = 'https://cultivator.vercel.app';

const routeSeo = {
  '/': {
    title: 'Cultivator | AeroTrust Smart Aquaculture IoT',
    description:
      'Cultivator builds AeroTrust, an IoT monitoring platform for shrimp farm aerators with pilot traction, partner momentum, and a clear smart aquaculture investment opportunity.',
    keywords: 'Cultivator, AeroTrust, aquaculture IoT, shrimp farming, aerator monitoring, smart aquaculture, Taiwan startup, agritech investment',
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
    description: 'Cultivator builds AeroTrust, an IoT monitoring platform for shrimp farm aerators and smart aquaculture operations.',
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
    name: 'AeroTrust',
    description: 'Real-time IoT monitoring system for shrimp farm aerators. Detects electrical current anomalies and mechanical vibrations to prevent equipment failure and protect harvest value.',
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
        value: 'Electrical Current & Mechanical Vibration'
      },
      {
        '@type': 'PropertyValue',
        name: 'Installation',
        value: 'Plug-and-Play Retrofit'
      },
      {
        '@type': 'PropertyValue',
        name: 'Alerts',
        value: 'Real-time SMS & Push Notifications'
      }
    ]
  },
  faq: {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is AeroTrust?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AeroTrust is an IoT monitoring device that attaches to paddlewheel aerators on shrimp farms. It tracks electrical current and mechanical vibration to detect failures early, preventing crop loss.'
        }
      },
      {
        '@type': 'Question',
        name: 'How does the installation work?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AeroTrust is plug-and-play. Our team installs the sensor directly onto your existing aerator equipment. No modification to your farm infrastructure is required.'
        }
      },
      {
        '@type': 'Question',
        name: 'What is the market opportunity?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'The global aquaculture hardware market is ~$800M. Asia represents ~$300M of this market. We are initially targeting Taiwan ($50M) with expansion plans across Southeast Asia targeting 5,000 farms by 2030.'
        }
      },
      {
        '@type': 'Question',
        name: 'What regions do you serve?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'We are currently piloting in Taiwan with plans to expand across Southeast Asia including Indonesia, Thailand, Vietnam, and the Philippines.'
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
  useEffect(() => {
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
        <Route path="*" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}
