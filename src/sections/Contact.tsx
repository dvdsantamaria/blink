import { MapPin, Phone, Mail, Clock, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

const COMPANY_NAME = import.meta.env.VITE_COMPANY_NAME || 'Blinds & Tales';
const COMPANY_ADDRESS = import.meta.env.VITE_COMPANY_ADDRESS || '5B Lismore Road, Alstonville';
const COMPANY_PHONE = import.meta.env.VITE_COMPANY_PHONE || '1800 676 583';

export function Contact() {
  return (
    <section 
      id="contact" 
      className="py-16 lg:py-24 bg-white"
      itemScope 
      itemType="https://schema.org/LocalBusiness"
    >
      <meta itemProp="name" content={COMPANY_NAME} />
      <meta itemProp="telephone" content={COMPANY_PHONE} />
      
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-medium text-blue-600 tracking-wider uppercase">
            Get In Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Contact Us
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Ready to transform your windows? Get in touch for a FREE measure and quote 
            or to discuss your custom blind project. We deliver Australia-wide.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Contact Info */}
          <div className="space-y-8">
            {/* Phone - Primary CTA */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Call Us</h3>
                <a
                  href={`tel:${COMPANY_PHONE.replace(/\s/g, '')}`}
                  className="text-slate-600 hover:text-blue-600 text-lg font-medium transition-colors"
                  itemProp="telephone"
                >
                  {COMPANY_PHONE}
                </a>
                <p className="text-slate-500 text-sm mt-1">
                  Free call Australia-wide. Mon-Fri 8am-5pm, Sat 9am-2pm AEST
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Email Us</h3>
                <a
                  href="mailto:hello@blindsandtales.com.au"
                  className="text-slate-600 hover:text-blue-600 transition-colors"
                  itemProp="email"
                >
                  hello@blindsandtales.com.au
                </a>
                <p className="text-slate-500 text-sm mt-1">
                  We reply within 24 hours
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-orange-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <Clock className="w-6 h-6 text-orange-600" />
              </div>
              <div itemProp="openingHoursSpecification" itemScope itemType="https://schema.org/OpeningHoursSpecification">
                <h3 className="font-semibold text-slate-900 mb-1">Opening Hours</h3>
                <div className="text-slate-600 space-y-1">
                  <p>
                    <span itemProp="dayOfWeek" content="Monday Tuesday Wednesday Thursday Friday">Mon - Fri</span>:{' '}
                    <time itemProp="opens" content="08:00">8:00 AM</time> -{' '}
                    <time itemProp="closes" content="17:00">5:00 PM</time>
                  </p>
                  <p>
                    <span itemProp="dayOfWeek" content="Saturday">Saturday</span>:{' '}
                    <time itemProp="opens" content="09:00">9:00 AM</time> -{' '}
                    <time itemProp="closes" content="14:00">2:00 PM</time>
                  </p>
                  <p className="text-slate-500">Sunday: Closed (AEST)</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-start gap-4" itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 mb-1">Our Location</h3>
                <p className="text-slate-600 text-sm" itemProp="streetAddress">
                  {COMPANY_ADDRESS}
                </p>
                <p className="text-slate-600 text-sm">
                  <span itemProp="addressLocality">Alstonville</span>,{' '}
                  <span itemProp="addressRegion">NSW</span>{' '}
                  <span itemProp="postalCode">2477</span>
                </p>
                <meta itemProp="addressCountry" content="AU" />
                <p className="text-slate-500 text-sm mt-1">
                  Showroom visits by appointment
                </p>
              </div>
            </div>

            {/* Service Areas - National */}
            <div className="bg-slate-50 rounded-xl p-6">
              <h3 className="font-semibold text-slate-900 mb-3">We Deliver Australia-Wide</h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                Sydney • Melbourne • Brisbane • Perth • Adelaide • Hobart • Darwin • Canberra • 
                Newcastle • Wollongong • Gold Coast • Sunshine Coast • Geelong • Townsville • 
                Cairns • Toowoomba • Ballarat • Bendigo • Albury • Launceston • Mackay • 
                Rockhampton • Bunbury • Bundaberg • Coffs Harbour • Wagga Wagga • Hervey Bay • 
                Mildura • Shepparton • Port Macquarie • Gladstone • Tamworth • Traralgon • 
                Orange • Bowral • Nowra • Bathurst • Dubbo • Warrnambool • Kalgoorlie • 
                Mount Gambier • Lismore • Grafton • Esperance • Port Lincoln • Broome
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button 
                size="lg" 
                className="bg-slate-900 hover:bg-slate-800"
                onClick={() => window.location.href = `tel:${COMPANY_PHONE.replace(/\s/g, '')}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                Call Now
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Browse Products
              </Button>
            </div>
          </div>

          {/* Google Maps Embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border border-slate-200 h-[400px] lg:h-full min-h-[400px]">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3486.893685073979!2d153.4408!3d-28.8419!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b90c24b1e3d9e8f%3A0x2f6c7c7e0e0e0e0e!2s5B%20Lismore%20Rd%2C%20Alstonville%20NSW%202477!5e0!3m2!1sen!2sau!4v1700000000000!5m2!1sen!2sau"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title={`${COMPANY_NAME} Location`}
              className="absolute inset-0"
              itemProp="hasMap"
            />
            {/* Map Overlay with CTA */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-xl p-4 shadow-lg">
              <p className="text-sm text-slate-600 mb-2">
                Our HQ is in regional NSW, but we deliver to every corner of Australia
              </p>
              <a
                href="https://www.google.com/maps/dir/?api=1&destination=5B+Lismore+Road,+Alstonville+NSW+2477"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                Open in Google Maps <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
