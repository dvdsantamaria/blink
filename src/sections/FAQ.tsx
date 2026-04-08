import { useState } from 'react';
import { ChevronDown, Plus, Minus } from 'lucide-react';

const faqs = [
  {
    question: 'Do you offer custom printed blinds in Alstonville?',
    answer: `Yes! BlinkBlinds specializes in custom printed roller blinds in Alstonville and throughout the Northern Rivers region. Our showroom is located at 5B Lismore Road, Alstonville. We offer FREE in-home measure and quote services, and all our blinds are Australian made with a comprehensive 5-year warranty. Whether you're in Ballina, Lismore, Byron Bay, or surrounding areas, we can help transform your windows with personalized designs.`,
    category: 'Location',
  },
  {
    question: 'How much do custom blinds cost in Alstonville and Northern Rivers?',
    answer: `Our custom printed roller blinds are competitively priced for the Alstonville and Northern Rivers market. Prices vary based on size, fabric choice, and design complexity. We offer FREE measure and quote services with no obligation. Contact us at 1800 676 583 for a personalized quote. We also offer payment plans and can work with most budgets. All quotes include professional measurement, manufacturing, and installation.`,
    category: 'Pricing',
  },
  {
    question: 'What areas do you service in the Northern Rivers?',
    answer: `We service the entire Northern Rivers region including: Alstonville, Ballina, Lismore, Byron Bay, Lennox Head, Wollongbar, Evans Head, Bangalow, Mullumbimby, Ocean Shores, Brunswick Heads, and all surrounding suburbs. Our showroom is conveniently located at 5B Lismore Road, Alstonville, and we offer FREE measure and quote services across all these areas.`,
    category: 'Service Area',
  },
  {
    question: 'How long does it take to get custom blinds made and installed?',
    answer: `From your initial consultation to installation, custom printed blinds typically take 2-3 weeks. This includes: 1) FREE measure and quote (can be same day), 2) Design approval (1-2 days), 3) Manufacturing (10-14 days for Australian-made blinds), and 4) Professional installation (scheduled at your convenience). Rush orders may be available - please ask us about expedited service if you have a tight deadline.`,
    category: 'Process',
  },
  {
    question: 'What types of blind designs do you offer?',
    answer: `We offer an extensive range of custom printed blind designs including: Nature & Tropical (floral, jungle, botanical), Coastal Living (ocean, beach, nautical themes), Kids & Nursery (dinosaurs, space, animals, fairy tales), Sports Fan (NRL, AFL, soccer, cricket), Wildlife (native Australian animals, birds), and Pets (cats, dogs, custom pet portraits). Can't find what you're looking for? We can print ANY design - just provide your image!`,
    category: 'Products',
  },
  {
    question: 'Do you provide a warranty on your blinds?',
    answer: `Absolutely! All our blinds come with a comprehensive 5-year warranty covering manufacturing defects, mechanism failures, and fabric issues. As an Australian-made product, we stand behind our quality. Our warranty includes: free repairs for defects, replacement of faulty components, and fabric replacement if there are print quality issues. We also offer after-warranty repair services at competitive rates.`,
    category: 'Warranty',
  },
  {
    question: 'Are your blinds Australian made?',
    answer: `Yes! All our custom printed blinds are proudly Australian made. We manufacture locally, which means: faster turnaround times, support for Australian jobs, strict quality control, reduced environmental impact from shipping, and compliance with Australian standards. Our materials are sourced from Australian suppliers where possible, and our printing process uses eco-friendly, UV-resistant inks.`,
    category: 'Quality',
  },
  {
    question: 'Can I see samples before ordering?',
    answer: `Definitely! We encourage customers to visit our showroom at 5B Lismore Road, Alstonville to see physical samples of our blinds and fabrics. You can feel the quality, see print colors in person, and discuss design options with our team. We also bring samples during our FREE in-home consultations, so you can see how different options look in your actual space with your lighting conditions.`,
    category: 'Samples',
  },
  {
    question: 'Do you offer blind repairs in Alstonville?',
    answer: `Yes, we offer comprehensive blind repair services throughout Alstonville and the Northern Rivers. Our repair services include: mechanism repairs and replacements, cord and chain replacements, fabric repairs, re-rolling issues, and motor repairs for motorized blinds. We service all major blind brands, not just our own products. Contact us for a repair quote - in many cases, repairs are more cost-effective than replacement.`,
    category: 'Repairs',
  },
  {
    question: 'What makes BlinkBlinds different from other blind companies?',
    answer: `BlinkBlinds stands out because: 1) We specialize in CUSTOM PRINTED designs - unlimited options, 2) We're LOCAL to Alstonville with a physical showroom you can visit, 3) Australian made with 5-year warranty, 4) FREE measure and quote with no pressure sales, 5) Personal service from a family-owned business, 6) Fast turnaround times (2-3 weeks), 7) Full service from design to installation, 8) We service the entire Northern Rivers region. Read our 500+ 5-star reviews to see why customers love us!`,
    category: 'About Us',
  },
];

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50">
      <div className="w-full px-4 sm:px-6 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-12">
          <span className="text-sm font-medium text-blue-600 tracking-wider uppercase">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mt-2 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 text-lg">
            Everything you need to know about our custom printed blinds in Alstonville 
            and the Northern Rivers region.
          </p>
        </div>

        {/* FAQ List - Structured for SGE/AI optimization */}
        <div className="max-w-3xl mx-auto space-y-4" itemScope itemType="https://schema.org/FAQPage">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-xl border border-slate-200 overflow-hidden"
              itemScope
              itemProp="mainEntity"
              itemType="https://schema.org/Question"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 transition-colors"
                aria-expanded={openIndex === index}
                aria-controls={`faq-answer-${index}`}
              >
                <div className="flex items-start gap-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 flex-shrink-0 mt-0.5">
                    {faq.category}
                  </span>
                  <h3 
                    className="font-semibold text-slate-900 text-lg"
                    itemProp="name"
                  >
                    {faq.question}
                  </h3>
                </div>
                <div className="ml-4 flex-shrink-0">
                  {openIndex === index ? (
                    <Minus className="w-5 h-5 text-slate-400" />
                  ) : (
                    <Plus className="w-5 h-5 text-slate-400" />
                  )}
                </div>
              </button>
              
              {openIndex === index && (
                <div
                  id={`faq-answer-${index}`}
                  className="px-6 pb-6 pt-0"
                  itemScope
                  itemProp="acceptedAnswer"
                  itemType="https://schema.org/Answer"
                >
                  <div className="pl-16">
                    <p 
                      className="text-slate-600 leading-relaxed"
                      itemProp="text"
                    >
                      {faq.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Still have questions CTA */}
        <div className="max-w-3xl mx-auto mt-12 text-center">
          <p className="text-slate-600 mb-4">
            Still have questions? We're here to help!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="tel:1800676583"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-slate-900 text-white rounded-lg font-medium hover:bg-slate-800 transition-colors"
            >
              Call 1800 676 583
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 border border-slate-300 text-slate-700 rounded-lg font-medium hover:bg-slate-50 transition-colors"
            >
              Visit Our Showroom
              <ChevronDown className="w-4 h-4 rotate-[-90deg]" />
            </a>
          </div>
        </div>

        {/* Local SEO Content Block */}
        <div className="max-w-4xl mx-auto mt-16 pt-16 border-t border-slate-200">
          <article className="prose prose-slate max-w-none">
            <h3 className="text-2xl font-bold text-slate-900 mb-4">
              Custom Printed Blinds in Alstonville & Northern Rivers
            </h3>
            <p className="text-slate-600 leading-relaxed mb-4">
              BlinkBlinds is your local expert for <strong>custom printed roller blinds in Alstonville</strong>, 
              Ballina, Lismore, and throughout the Northern Rivers region. Our family-owned business 
              has been transforming homes across NSW since 2019 with unique, personalized window coverings 
              that reflect your style and personality.
            </p>
            <p className="text-slate-600 leading-relaxed mb-4">
              Located at <strong>5B Lismore Road, Alstonville</strong>, our showroom showcases the latest 
              in printed blind technology. From nature-inspired designs perfect for Northern Rivers homes 
              to playful kids' room themes and sophisticated coastal patterns, we offer unlimited 
              customization options. All our blinds are <strong>Australian made</strong> and backed by 
              our industry-leading <strong>5-year warranty</strong>.
            </p>
            <p className="text-slate-600 leading-relaxed">
              We pride ourselves on exceptional customer service, with over <strong>500 five-star reviews</strong> 
              from satisfied customers across Alstonville, Ballina, Byron Bay, and beyond. Our FREE measure 
              and quote service means you can explore options risk-free, and our professional installation 
              ensures perfect results every time. Call <a href="tel:1800676583" className="text-blue-600 hover:underline">1800 676 583</a> today 
              to discover how custom printed blinds can transform your space.
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
