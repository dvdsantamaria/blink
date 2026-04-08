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
    { name: 'About Us', href: '#' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Reviews', href: '#reviews' },
    { name: 'Blog', href: '#' },
    { name: 'Contact', href: '#' },
  ],
  support: [
    { name: 'FAQs', href: '#' },
    { name: 'Shipping', href: '#' },
    { name: 'Returns', href: '#' },
    { name: 'Warranty', href: '#' },
    { name: 'Measure Guide', href: '#' },
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
    <footer className="bg-slate-50 pt-16 lg:pt-24 pb-8">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Main Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 lg:gap-12 pb-12 border-b border-slate-200">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-slate-900 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">BB</span>
              </div>
              <span className="font-semibold text-slate-900 text-xl">
                BlinkBlinds
              </span>
            </a>
            <p className="text-slate-600 text-sm mb-6 max-w-xs">
              Custom printed roller blinds that transform your space. Australian 
              made with love since 2019.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-white border border-slate-200 rounded-full flex items-center justify-center hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Shop</h4>
            <ul className="space-y-3">
              {footerLinks.shop.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold text-slate-900 mb-4">Support</h4>
            <ul className="space-y-3">
              {footerLinks.support.map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-2 lg:col-span-1">
            <h4 className="font-semibold text-slate-900 mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="text-slate-600 text-sm">
                  5B Lismore Road<br />
                  Alstonville
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a
                  href="tel:1800676583"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  1800 676 583
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-slate-400 flex-shrink-0" />
                <a
                  href="mailto:hello@printedblinds.com.au"
                  className="text-slate-600 hover:text-slate-900 text-sm transition-colors"
                >
                  hello@printedblinds.com.au
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            © {new Date().getFullYear()} BlinkBlinds. All rights reserved.
          </p>
          <div className="flex gap-6">
            <button className="text-slate-500 hover:text-slate-900 text-sm transition-colors">
              Privacy Policy
            </button>
            <button className="text-slate-500 hover:text-slate-900 text-sm transition-colors">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
