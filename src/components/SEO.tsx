import { useEffect } from 'react';

// Company data from environment variables
const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || 'Blinds & Tales';
const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || '1800 676 583';
const APP_URL = import.meta.env.VITE_APP_URL || 'https://blinkblinds.com.au';

// Coordinates for 5B Lismore Road, Alstonville NSW 2477
const LATITUDE = -28.8419;
const LONGITUDE = 153.4408;

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  noindex?: boolean;
  article?: boolean;
}

export function SEO({
  title = `${COMPANY_NAME} | Custom Printed Blinds Alstonville & Northern Rivers`,
  description = `Custom printed roller blinds in Alstonville, Ballina & Lismore. Australian made, 5-year warranty. FREE measure & quote. Shop nature, coastal, kids & sports designs. 1800 676 583`,
  canonical = APP_URL,
  ogImage = `${APP_URL}/images/og-image.jpg`,
  noindex = false,
  article = false,
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title;

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'robots', content: noindex ? 'noindex,nofollow' : 'index,follow' },
      { name: 'googlebot', content: noindex ? 'noindex,nofollow' : 'index,follow' },
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:type', content: article ? 'article' : 'website' },
      { property: 'og:url', content: canonical },
      { property: 'og:image', content: ogImage },
      { property: 'og:site_name', content: COMPANY_NAME },
      { property: 'og:locale', content: 'en_AU' },
      // Twitter Cards
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: ogImage },
      // Mobile & PWA
      { name: 'theme-color', content: '#0f172a' },
      { name: 'msapplication-TileColor', content: '#0f172a' },
      { name: 'format-detection', content: 'telephone=no' },
      // Local SEO
      { name: 'geo.region', content: 'AU-NSW' },
      { name: 'geo.placename', content: 'Alstonville' },
      { name: 'geo.position', content: `${LATITUDE};${LONGITUDE}` },
      { name: 'ICBM', content: `${LATITUDE}, ${LONGITUDE}` },
      // Author & Copyright
      { name: 'author', content: COMPANY_NAME },
      { name: 'copyright', content: `© ${new Date().getFullYear()} ${COMPANY_NAME}` },
    ];

    metaTags.forEach(({ name, property, content }) => {
      let tag: HTMLMetaElement | null = null;
      if (property) {
        tag = document.querySelector(`meta[property="${property}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('property', property);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      } else if (name) {
        tag = document.querySelector(`meta[name="${name}"]`);
        if (!tag) {
          tag = document.createElement('meta');
          tag.setAttribute('name', name);
          document.head.appendChild(tag);
        }
        tag.setAttribute('content', content);
      }
    });

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', canonical);

    // Alternate languages
    const alternates = [
      { hrefLang: 'en-AU', href: canonical },
      { hrefLang: 'x-default', href: canonical },
    ];
    alternates.forEach(({ hrefLang, href }) => {
      let link = document.querySelector(`link[hreflang="${hrefLang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.setAttribute('rel', 'alternate');
        link.setAttribute('hreflang', hrefLang);
        document.head.appendChild(link);
      }
      link.setAttribute('href', href);
    });

    // Structured Data - LocalBusiness
    const localBusinessSchema = {
      '@context': 'https://schema.org',
      '@type': 'HomeAndConstructionBusiness',
      '@id': `${APP_URL}#business`,
      name: COMPANY_NAME,
      description: 'Custom printed roller blinds and window coverings in Alstonville, Ballina & Northern Rivers. Australian made with 5-year warranty.',
      url: APP_URL,
      telephone: COMPANY_PHONE,
      email: 'hello@blinkblinds.com.au',
      priceRange: '$$',
      image: `${APP_URL}/images/hero-bg.jpg`,
      logo: `${APP_URL}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '5B Lismore Road',
        addressLocality: 'Alstonville',
        addressRegion: 'NSW',
        postalCode: '2477',
        addressCountry: 'AU',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: LATITUDE,
        longitude: LONGITUDE,
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '09:00',
          closes: '14:00',
        },
      ],
      areaServed: [
        { '@type': 'City', name: 'Alstonville' },
        { '@type': 'City', name: 'Ballina' },
        { '@type': 'City', name: 'Lismore' },
        { '@type': 'City', name: 'Byron Bay' },
        { '@type': 'City', name: 'Lennox Head' },
        { '@type': 'City', name: 'Wollongbar' },
        { '@type': 'City', name: 'Evans Head' },
        { '@type': 'AdministrativeArea', name: 'Northern Rivers' },
      ],
      serviceType: [
        'Custom Printed Blinds',
        'Roller Blinds',
        'Window Coverings',
        'Blind Installation',
        'Blind Repairs',
      ],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Blind Services',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Custom Printed Roller Blinds',
              description: 'Personalized designs for your windows',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'FREE Measure & Quote',
              description: 'In-home consultation and measurement',
            },
          },
        ],
      },
      sameAs: [
        'https://www.facebook.com/blinkblinds',
        'https://www.instagram.com/blinkblinds',
        'https://g.co/kgs/blinkblinds-alstonville',
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
        bestRating: '5',
        worstRating: '1',
      },
      review: [
        {
          '@type': 'Review',
          author: { '@type': 'Person', name: 'Sarah M.' },
          datePublished: '2024-12-15',
          reviewRating: { '@type': 'Rating', ratingValue: '5' },
          reviewBody: 'Amazing quality and service! The custom printed blinds transformed our living room.',
        },
      ],
    };

    // WebSite Schema with Sitelinks Searchbox
    const websiteSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      '@id': `${APP_URL}#website`,
      name: COMPANY_NAME,
      url: APP_URL,
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${APP_URL}/search?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
      inLanguage: 'en-AU',
      publisher: { '@id': `${APP_URL}#business` },
    };

    // WebPage Schema
    const webpageSchema = {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      '@id': `${canonical}#webpage`,
      name: title,
      description: description,
      url: canonical,
      isPartOf: { '@id': `${APP_URL}#website` },
      about: { '@id': `${APP_URL}#business` },
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      inLanguage: 'en-AU',
    };

    // Organization Schema
    const organizationSchema = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      '@id': `${APP_URL}#organization`,
      name: COMPANY_NAME,
      url: APP_URL,
      logo: `${APP_URL}/logo.png`,
      sameAs: [
        'https://www.facebook.com/blinkblinds',
        'https://www.instagram.com/blinkblinds',
      ],
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: COMPANY_PHONE,
        contactType: 'customer service',
        areaServed: 'AU',
        availableLanguage: ['English'],
      },
    };

    // BreadcrumbList Schema
    const breadcrumbSchema = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: APP_URL,
        },
      ],
    };

    // FAQPage Schema for AI Overview optimization
    const faqSchema = {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do you offer custom printed blinds in Alstonville?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! BlinkBlinds specializes in custom printed roller blinds in Alstonville and surrounding areas. We offer FREE measure and quote services, and all our blinds are Australian made with a 5-year warranty.',
          },
        },
        {
          '@type': 'Question',
          name: 'What areas do you service in the Northern Rivers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We service Alstonville, Ballina, Lismore, Byron Bay, Lennox Head, Wollongbar, Evans Head, and the entire Northern Rivers region of NSW.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does it take to get custom blinds installed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From measurement to installation, custom printed blinds typically take 2-3 weeks. We handle everything from design consultation to professional installation.',
          },
        },
        {
          '@type': 'Question',
          name: 'What types of blind designs do you offer?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'We offer nature & tropical, coastal living, kids & nursery, sports fan, wildlife, and pet-themed designs. All designs can be customized to match your decor.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do you provide a warranty on your blinds?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes! All our blinds come with a comprehensive 5-year warranty. We stand behind the quality of our Australian-made products.',
          },
        },
      ],
    };

    // Product Schema for main offerings
    const productSchema = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: 'Custom Printed Roller Blinds',
      image: `${APP_URL}/images/hero-bg.jpg`,
      description: 'High-quality custom printed roller blinds for homes and businesses in Alstonville and Northern Rivers.',
      brand: { '@id': `${APP_URL}#organization` },
      offers: {
        '@type': 'AggregateOffer',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        seller: { '@id': `${APP_URL}#business` },
      },
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: '4.9',
        reviewCount: '127',
      },
    };

    // Inject all schemas
    const schemas = [
      { id: 'local-business-schema', data: localBusinessSchema },
      { id: 'website-schema', data: websiteSchema },
      { id: 'webpage-schema', data: webpageSchema },
      { id: 'organization-schema', data: organizationSchema },
      { id: 'breadcrumb-schema', data: breadcrumbSchema },
      { id: 'faq-schema', data: faqSchema },
      { id: 'product-schema', data: productSchema },
    ];

    schemas.forEach(({ id, data }) => {
      let script = document.getElementById(id) as HTMLScriptElement | null;
      if (!script) {
        script = document.createElement('script');
        script.id = id;
        script.type = 'application/ld+json';
        document.head.appendChild(script);
      }
      script.textContent = JSON.stringify(data);
    });

    // Cleanup function
    return () => {
      // No cleanup needed - we want to keep the meta tags
    };
  }, [title, description, canonical, ogImage, noindex, article]);

  return null;
}

export default SEO;
