import { Instagram, Facebook, Mail, MapPin, Phone } from 'lucide-react';

const footerLinks = {
  shop: [
    { name: 'All Collections', href: '#collections' },
    { name: 'Nature & Tropical', href: '#products' },
    { name: 'Kids & Nursery', href: '#products' },
    { name: 'Coastal Living', href: '#products' },
    { name: 'Sports Fan', href: '#products' },
  ],
  company: [
    { name: 'About Us', href: '#hero' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'FAQs', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ],
  services: [
    { name: 'Custom Printed Blinds', href: '#products' },
    { name: 'FREE Measure & Quote', href: '#contact' },
    { name: 'Blind Installation', href: '#how-it-works' },
    { name: 'Blind Repairs', href: '#contact' },
    { name: 'Commercial Blinds', href: '#products' },
  ],
  locations: [
    { name: 'Alstonville', href: '#contact' },
    { name: 'Ballina', href: '#contact' },
    { name: 'Lismore', href: '#contact' },
    { name: 'Byron Bay', href: '#contact' },
    { name: 'Northern Rivers', href: '#contact' },
  ],
};

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <footer className="bg-slate-900 text-white pt-16 lg:pt-20 pb-8" itemScope itemType="https://schema.org/LocalBusiness">
      <meta itemProp="name" content="BlinkBlinds" />
      <meta itemProp="telephone" content="1800 676 583" />
      <meta itemProp="priceRange" content="$$" />
      
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 lg:gap-6 pb-12 border-b border-slate-800">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-2">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center">
                <span className="text-slate-900 font-bold">BB</span>
              </div>
              <span className="font-semibold text-white text-xl">
                BlinkBlinds
              </span>
            </a>
            <p className="text-slate-400 text-sm mb-6 max-w-xs">
              Custom printed roller blinds that transform your space. Australian 
              made with love since 2019. Serving Alstonville, Ballina, Lismore & 
              Northern Rivers.
            </p>
            <div className="flex gap-3">
              <a
                href="https://facebook.com/blinkblinds"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-blue-600 transition-all"
                aria-label="Follow us on Facebook"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com/blinkblinds"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-pink-600 transition-all"
                aria-label="Follow us on Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="mailto:hello@blinkblinds.com.au"
                className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center hover:bg-slate-700 transition-all"
                aria-label="Email us"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
            
            {/* Google Reviews Badge */}
            <div className="mt-6 flex items-center gap-2 bg-slate-800 rounded-lg p-3 inline-flex">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <div>
                <div className="flex items-center gap-1">
                  <span className="font-semibold text-sm">4.9</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(i => (
                      <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                </div>
                <span className="text-xs text-slate-400">500+ Google Reviews</span>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Services</h4>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Service Areas */}
          <div>
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Service Areas</h4>
            <ul className="space-y-3">
              {footerLinks.locations.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-400 hover:text-white text-sm transition-colors"
                  >
                    Blinds {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-1">
            <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-400 text-sm">
                  <span itemProp="streetAddress">5B Lismore Road</span><br />
                  <span itemProp="addressLocality">Alstonville</span>,{' '}
                  <span itemProp="addressRegion">NSW</span>{' '}
                  <span itemProp="postalCode">2477</span>
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a
                  href="tel:1800676583"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                  itemProp="telephone"
                >
                  1800 676 583
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:hello@blinkblinds.com.au"
                  className="text-slate-400 hover:text-white text-sm transition-colors"
                  itemProp="email"
                >
                  hello@blinkblinds.com.au
                </a>
              </li>
            </ul>
            
            {/* Opening Hours */}
            <div className="mt-6" itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
              <h5 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Opening Hours</h5>
              <div className="text-slate-400 text-sm space-y-1">
                <p>
                  <span itemProp="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday">Mon - Fri</span>:{' '}
                  <time itemProp="opens" content="08:00">8am</time> - <time itemProp="closes" content="17:00">5pm</time>
                </p>
                <p>
                  <span itemProp="dayOfWeek" content="Saturday">Sat</span>:{' '}
                  <time itemProp="opens" content="09:00">9am</time> - <time itemProp="closes" content="14:00">2pm</time>
                </p>
                <p>Sun: Closed</p>
              </div>
            </div>
          </div>
        </div>

        {/* Trust Signals Bar */}
        <div className="py-6 border-b border-slate-800">
          <div className="flex flex-wrap items-center justify-center gap-8 text-sm text-slate-400">
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Australian Made
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              5 Year Warranty
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FREE Measure & Quote
            </span>
            <span className="flex items-center gap-2">
              <svg className="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Local Family Business
            </span>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BlinkBlinds. All rights reserved. 
            <span className="hidden sm:inline"> | </span>
            <span className="block sm:inline mt-1 sm:mt-0">
              5B Lismore Road, Alstonville NSW 2477 | 1800 676 583
            </span>
          </p>
          <div className="flex gap-6">
            <button className="text-slate-500 hover:text-white text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-slate-500 hover:text-white text-sm transition-colors">
              Terms of Service
            </button>
            <button className="text-slate-500 hover:text-white text-sm transition-colors">
              Sitemap
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
